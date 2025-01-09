const Event = require("../model/eventModel")
const Ticket = require("../model/ticketModel")


exports.bookTicket = async(req,res)=>{
    const eventId = req.params.id
    const userId = req.user?.id 
    const { quantity } = req.body

   // console.log("eventid",eventId)
   // console.log("user id",userId)
    if(!eventId || !userId || !quantity){
        return res.status(400).json({
            message : "Please provide eventId and userId and quantity"
        })
    }


    const event = await Event.findById(eventId)
   // console.log("this is event ",event)
    if(!event){
        return res.status(404).json({
            message : "No event found with that event id"
        })
    }
    if(event.ticketsBooked + quantity >= event.totalTickets){
        return res.status(400).json({
            message : "Sorry!! Ticket is already sold out"
        })
    }
    const ticket = await Ticket.create({
        eventId,
        userId,
        ticketNumber: `TICKET-${Date.now()}-${userId}`, 
        quantity
      });
      event.ticketsBooked += quantity
      await event.save() 

   res.status(200).json({
        message : "ticket booked successfully",
        data : ticket
  
    })
}


exports.getMyTicket = async(req,res) =>{
    const userId = req.user.id
//    console.log("user ",userId)
    if(!userId){
        return res.status(400).json({
            message : "Please provide userId"
        })
    }
    const tickets = await Ticket.find({ userId }).populate('eventId', 'title date');

    if(tickets.length < 1){
        return res.status(404).json({
            message : "This user have no ticket"
        })
    }
    res.status(200).json({
        message : "Your tickets are",        
         data : tickets 
    });
}



exports.getAllTicket = async(req,res) =>{
    const eventId = req.params.id
//    console.log("user ",userId)
    if(!eventId){
        return res.status(400).json({
            message : "Please provide eventId"
        })
    }
    const tickets = await Ticket.find({ eventId })
    .populate({
        path:"userId",
        model : "User",
        select : "-__v -updatedAt -createdAt -role -password -phoneNumber"
    }) 
    .populate({
        path: "eventId",
        model: "Event",
        select: "-__v -updatedAt -createdAt -description -createdby",
      });

      if(tickets.length < 1){
        return res.status(404).json({
            message : "no ticket found for this event"
        })
      }
    res.status(200).json({
        message : "ticket details about this event are",        
         data : tickets 
    });
}