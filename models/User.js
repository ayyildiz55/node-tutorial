const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
   username : {
       type : String,
       required : true,
       unique : true
   },
   password : {
       type : String,
       required : true,
       minlength : 5,
   }
   
});

module.exports = mongoose.model('user',userSchema)