const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title must be provided'],
    },
    description : {
        type : String,
    },
    date : {
        type : String,
   
    },
    time : {
        type : String,
    },
    location : {
        type : String,
    },
    
},{
    timestamps : true
}
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event