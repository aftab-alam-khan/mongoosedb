// import the mongoose library
const mongoose = require('mongoose');

// Connecting a new connection with mongoose db 
mongoose.connect("mongodb://localhost:27017/mongtest")
    .then(() => console.log('connection successfull...'))
    .catch((err) => console.log(err));

// Schema
// A mongoose schema defines the structure of the document,
// default values, validators, etc.,

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctype: String,
    session: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document,
// default values, validators, etc., where as a Mongoose model provides an interface to the database for creatinng,
// querying, updating, deleting records, etc.

// collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

// // create a document
// const reactPlaylist = new Playlist({
//     name: 'React JS',
//     ctype: 'Front End',
//     session: 1,
//     author: 'Aftab',
//     active: true,
// })

// // Insert document to database
// reactPlaylist.save();

// write asycrones way like [asyn, await]
const createDocument = async () => {

    try {
        // create a document
        const javaScriptPlaylist = new Playlist({
            name: 'Javascript',
            ctype: 'Front End',
            session: 3,
            author: 'Aftab',
            active: true,
        })
        const mongoPlaylist = new Playlist({
            name: 'MongoDB',
            ctype: 'Back End',
            session: 4,
            author: 'Aftab',
            active: true,
        })
        const mongoosePlaylist = new Playlist({
            name: 'MongoseDB',
            ctype: 'Back End',
            session: 5,
            author: 'Aftab',
            active: true,
        })

        // Insert document to database
        const result = await Playlist.insertMany([javaScriptPlaylist, mongoPlaylist, mongoosePlaylist]);
        console.log(result);
    } catch (err) {
        console.trace('Error: ', err.message);
    }
    
}
// Function call to inster a document in the database
// createDocument();

// get data from the database
const getDocument = async () => {
    const result = await Playlist.find({});
    console.log(result);
}

//Function call to get data from mongo database
getDocument()

