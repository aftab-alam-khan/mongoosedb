// import the mongoose library
const mongoose = require('mongoose');

// Connecting a new connection with mongoose db 
mongoose.connect("mongodb://localhost:27017/mongtest", { useNewUrlParser: true, useUnifiedTopology: true })
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
    try {
        // normal find
        const result = await Playlist.find().select({ _id: 0, name: 1 }).limit(2);
        console.log('result ',result);

        //greater than
        const result1 = await Playlist.find({ session: { $gt: 2 } }).select({ _id: 0, name: 1 });
        console.log('result1 ',result1);

        // greater than equalto
        const result2 = await Playlist.find({ session: { $gte: 3 } }).select({ _id: 0, name: 1 });
        console.log('result2 ',result2);

        // less than equal to
        const result3 = await Playlist.find({ session: { $lte: 3 } }).select({ _id: 0, name: 1 });
        console.log('result3 ',result3);

        // find in
        const result4 = await Playlist.find({ ctype: {$in: ['Back End']} }).select({ _id: 0, name: 1 });
        console.log('result4 ', result4);
        
        // find not-in
        const result5 = await Playlist.find({ ctype: {$nin: ['Back End']} }).select({ _id: 0, name: 1 });
        console.log('result5 ', result5);
        
        // Logical oprator or
        const result6 = await Playlist.find({ $or: [{ ctype: 'Front End' }, { author: 'Aftab' }] }).select({ _id: 0, name: 1 });
        console.log('result6:', result6);

        // Logical oprator and with count
        const result7 = await Playlist.find({ $and: [{ ctype: 'Front End' }, { author: 'Aftab' }] }).countDocuments();
        console.log('result7:', result7);

        // sort the result output in Ascending order
        const result8 = await Playlist.find({ author: 'Aftab' }).select({ _id: 0, name: 1 }).sort({name: 1});
        console.log('result8:', result8);

        // sort the result output in Descending order
        const result9 = await Playlist.find({ author: 'Aftab' }).select({ _id: 0, name: 1 }).sort({name: -1});
        console.log('result9:', result9);
    } catch (error) {
        console.log(error)
    }
    
}

//Function call to get data from mongo database
// getDocument()

// update the collection document
const updateDocument = async (_id) => {
    try {
        // update by updateOne
        // const result = await Playlist.updateOne({ _id }, { name: 'Javascript' });

        // update by find
        const result = await Playlist.findByIdAndUpdate({ _id }, { $set: { name: 'Javascript' } }, { useFindAndModify: false, new: true });
        console.log('result:', result)
    } catch (error) {
        console.log(error);
    }
}

// Function call to update data from mongo database
// updateDocument('612a986afffbdbd4f32613a0')

// Delete the Document
const deleteDocument = async (_id) => {
    try {
        // delete by one method
        // const result = await Playlist.deleteOne({ _id });

        // delete by id method
        const result = await Playlist.findByIdAndDelete({ _id });
        console.log('result:', result);
    } catch (error) {
        console.log(error);
    }
}

// Function call to delete the Data from Mongo database
deleteDocument('6133a60f5d052ac8f2831de4');
