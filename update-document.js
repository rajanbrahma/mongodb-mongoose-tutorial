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


async function updateDocument_QueryFirst(id){

    // Search by id, if not found then return
    let course = await Course.findById(id);
    if(!course) {
        console.log('Course not found.');
        return;
    }

    // Update the target object
    course.isPublished = true;
    course.author = 'Some Author';

    // Push it back to the DB
    let result = await course.save();
    
    console.log('Course Updated : ');
    console.log(result);
}

async function updateDocument_UpdateFirst(id){
    let result = await Course.update({
        _id: id
    },{
        $set: {
            author: 'Rockstar',
            isPublished: false
        }
    });
    console.log('Update document with update first approach.');
    console.log(result);
}

async function updateDocument_UpdateFirst_findByIdAndUpdate(id){
    let result = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Ranbir',
            isPublished: true
        }
    }, { new: true });
    console.log('Update document with update first approach.');
    console.log(result);
}

//// Update document - Query First approach
// updateDocument_QueryFirst('5ecbd83361988d2964deb06e');

//// Update document - Update First approach
// updateDocument_UpdateFirst_update('5ecbd83361988d2964deb06e');
// updateDocument_UpdateFirst_findByIdAndUpdate('5ecbd83361988d2964deb06e');