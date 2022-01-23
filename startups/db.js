const mongoose = require('mongoose');
const db = 'mongodb+srv://blocko-labs:passwordpassword@chat-app.xbcra.mongodb.net/interview?retryWrites=true&w=majority';
module.exports = function() {
    mongoose.connect(db).then(()=>{
        console.log('database connected successfully')
    }).catch(()=>{
        console.log('Unable to connect database!!');
    });
}