const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then( result => console.log('Connection successful.'))
    .catch( err => console.log('Error while connecting.'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
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
    const result = await course.save();
}

/*
    Get all the published courses that are $15 or more,
    or have the word 'by' in their title
    sort by their price in desc order
    pick only name, author and price
    display
*/
async function getCourses_query3(){
    let pageNumber = 1;
    const pageSize = 10;
    const courses = await Course.find({
        isPublished: true,
    }).or([ { price: { $gte : 15 } }, { name: /.*by.*/i } ]).sort({
        price: -1
    }).skip((pageNumber - 1) * pageSize).limit(pageSize).select({
        name: 1,
        author: 1,
        _id: 0,
        price: 1
    });

    console.log('Output of query3 : ');
    console.log(courses);
}

/*
    Get all the published frontend and backend courses
    sort by their price in desc order
    pick only name and author
    display
*/
async function getCourses_query2(){
    let pageNumber = 1;
    const pageSize = 10;
    const courses = await Course.find({
        isPublished: true,
        tags: { $in: [/.*backend.*/i,/.*frontend.*/i]}
    }).sort({
        price: -1
    }).skip((pageNumber - 1) * pageSize).limit(pageSize).select({
        name: 1,
        author: 1,
        _id: 0,
        price: 1
    });

    console.log('Output of query2 : ');
    console.log(courses);
}

/*
    Get all the published backend courses
    sort by their name
    pick only name and author
    display
*/
async function getCourses_query1(){
    let pageNumber = 1;
    const pageSize = 10;
    const courses = await Course.find({
        isPublished: true,
        tags: 'backend'
    }).sort({
        name: 1
    }).skip((pageNumber - 1) * pageSize).limit(pageSize).select({
        name: 1,
        author: 1,
        _id: 0,
    });

    console.log('Output of query1 : ');
    console.log(courses);
}

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

async function removeDocument(id){

    // Remove document by ID and return the removed document
    let result = await Course.findByIdAndRemove(id);
    console.log('Document removed.');
    console.log(result);
}

//// Remove document by ID and return the removed document
// removeDocument('5ecbd83361988d2964deb06e')

//// Update document - Query First approach
// updateDocument_QueryFirst('5ecbd83361988d2964deb06e');

//// Update document - Update First approach
// updateDocument_UpdateFirst_update('5ecbd83361988d2964deb06e');
// updateDocument_UpdateFirst_findByIdAndUpdate('5ecbd83361988d2964deb06e');

//// Queries
// getCourses_query1();
// getCourses_query2();
// getCourses_query3();
// createCourse();