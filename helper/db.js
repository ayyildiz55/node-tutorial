const mongose = require('mongoose')

module.exports = () => {
    mongose.connect('mongodb://movie_user:Deneme12.@ds247223.mlab.com:47223/mongo',{useMongoClient : true})

    mongose.connection.on('open',() => {
       console.log('MongoDb :connected ');
    })

    mongose.connection.on('error',(err) => {
       console.log(err);
    })

    mongose.Promise = global.Promise;

}