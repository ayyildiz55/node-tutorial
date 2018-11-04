const mongoose = require('mongoose');
const schema = mongoose.Schema;

const directorSchema = new schema({
   director_id : schema.Types.ObjectId,
   name : String,
   surname : String,
   bio : String,
   createdAt :{
       type : Date,
       default : Date.now
   }

});

module.exports = mongoose.model('director',directorSchema)