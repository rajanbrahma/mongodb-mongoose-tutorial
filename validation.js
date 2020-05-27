const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then( result => console.log('Connection successful.'))
    .catch( err => console.log('Error while connecting.'));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    author: String,
    mentions: [ String ],
    tags: {
        type: Array,
        validate: {
            // Custom validator and asynchoronous validator
            // Whenever a field is declared as an Array
            // Mongoose always initialize it with an empty array - []
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    let result = v && v.length > 0;
                    callback(result);
                },5000);
            },
            message: 'A course should atleast have 1 tag'
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['web','mobile']
    },
    date: { type: Date, default: Date.now },
    isPublished: { type: String, required: true },
    price: {
        type: Number,
        // validation logic: if 'isPublished' property of current object
        // is 'true' then only 'price' field is required.
        required: function (){
            // Cannot use an ES6 arrow function here.
            // Because, arrow functions don't have their own 'this'.
            // They use 'this' value for the enclosing execution context.
            // In this case, 'this' doesn't refer to current object.
            return this.isPublished;
        },
        min: 10,
        max: 2000
    }
});

/*
    mongoose.model() this function accepts 2 arguments,
    'CollectionName' of string type and the schema object 
    which represents the document structure of CollectionName collection.
    Mongoose automatically adds an 's' at the end of CollectionName and lowers
    all the letters. For example, 'Course' will become 
    'courses' collection in MongoDB
*/
const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular JS',
        author: 'Rajan',
        tags: null,
        category: '-',
        isPublished: true,
        price: 10
    });
    try{
        // await course.validate(); 
        // This validate() method automatically kicks in
        // when mongoose is trying to save an object into the DB
        // We can manually kickin the validation() methond also
        const result = await course.save();
    }
    catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

createCourse();