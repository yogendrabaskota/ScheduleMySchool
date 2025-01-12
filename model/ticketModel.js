const mongoose = require('mongoose');
const Schema = mongoose.Schema



const TicketSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  ticketNumber:{
    type: String,
    unique: true,
    required: true
},
quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 5
  },
  
  purchaseDate:{ 
    type: Date,
    default: Date.now
},
paymentDetails : {
  pidx : {
      type : String
  },
  method : {
      type : String,
      enum : ['Khalti','Free'],
      
  },
  status : {
      type : String,
      enum : ['paid','unpaid','pending'],
      default : 'pending'
  }
}

});

const Ticket = mongoose.model('Ticket', TicketSchema)
module.exports = Ticket
