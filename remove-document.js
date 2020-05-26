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

async function removeDocument(id){

    // Remove document by ID and return the removed document
    let result = await Course.findByIdAndRemove(id);
    console.log('Document removed.');
    console.log(result);
}

//// Remove document by ID and return the removed document
// removeDocument('5ecbd83361988d2964deb06e')