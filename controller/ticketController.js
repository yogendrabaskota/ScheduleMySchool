const Event = require("../model/eventModel")
const Ticket = require("../model/ticketModel")


exports.bookTicket = async(req,res)=>{
    const eventId = req.params.id
    const userId = req.user?.id 
    const { quantity } = req.body
    const userRole = req.user?.role

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

    const existingTicket = await Ticket.findOne({ eventId, userId });
    if (existingTicket) {
        return res.status(400).json({
            message:
                "You already have booked a ticket for this event. Users are not allowed to buy tickets more than once for the same event.",
        });
    }
    if(event.ticketsBooked + quantity >= event.totalTickets){
        return res.status(400).json({
            message : "Sorry!! Ticket is already sold out"
        })
    }

    if(userRole === 'guest'){
    const ticket = await Ticket.create({
        eventId,
        userId,
        ticketNumber: `TICKET-${Date.now()}${userId}`, 
       // ticketNumber: userId, 
        quantity,
        paymentDetails : {
            status : 'pending'
        }
      });

   return res.status(200).json({
        message : "Guest have to pay for ticket. Proceed to payment",
        data : ticket
  
    })
}else if(userRole === 'student' || userRole === 'teacher'){
    const ticket = await Ticket.create({
        eventId,
        userId,
        ticketNumber: `TICKET-${Date.now()}-${userId}`,
        quantity,
        paymentDetails: {
            status: "paid", // No need to pay
            method: "Free", 
        },
    });
    event.ticketsBooked += quantity
    await event.save() 
    return res.status(200).json({
        message : "Ticket booked successfully",
        data : ticket
    })
} else {
    return res.status(400).json({
        message : "Failure"
    })
}
}

exports.getMyTicket = async(req,res) =>{
    const userId = req.user.id
//    console.log("user ",userId)
    if(!userId){
        return res.status(400).json({
            message : "Please provide userId"
        })
    }
     const tickets = await Ticket.find({userId}, "-createdAt -updatedAt -__v").populate({
        path:"eventId",
        model : "Event",
        select : "-createdAt -updatedAt -__v -ticketsBooked -description -totalTickets"
    }).populate({
        path:"userId",
        model : "User",
        select : "-createdAt -updatedAt -__v -email -isOtpVerified -password -phoneNumber -role -isUserVerified"
    }) 
   // console.log(tickets)
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