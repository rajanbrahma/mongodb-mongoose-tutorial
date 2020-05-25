const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then( result => console.log('Connection successful.'))
    .catch( err => console.log('Error while connecting.'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

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

async function getCourses(){
    let pageNumber = 1;
    const pageSize = 10;
    const courses = await Course.find({
        author: /.*jan.*/i,
        isPublished: true
    }).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({
        name: 1
    }).select({
        name: 1,
        tags: 1,
        author: 1,
        _id: 0
    });

    console.log(courses);
    // [
    //     { 
    //         tags: [ 'Frontend', 'JavaScript' ],
    //         name: 'Angular JS',
    //         author: 'Rajan'
    //     },
    //     {
    //         tags: [ 'Node', 'Backend', 'JavaScript' ],
    //         name: 'Node JS',
    //         author: 'Rajan' 
    //     }
    // ]
}

async function deleteCourse(){
    const courses = await Course.deleteMany({
        date : { $gt: '2020-05-24T19:18:41.953+00:00'}
    });
}

getCourses();