const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then( result => console.log('Connection successful.'))
    .catch( err => console.log('Error while connecting.'));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: { type: String, require: true}
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
        tags: ['Frontend','JavaScript'],
        isPublished: true
    });
    try{
        // await course.validate(); 
        // This validate() method automatically kicks in
        // when mongoose is trying to save an object into the DB
        // We can manually kickin the validation() methond also
        const result = await course.save();
    }
    catch(ex){
        console.log(ex);
    }
    
}

createCourse();