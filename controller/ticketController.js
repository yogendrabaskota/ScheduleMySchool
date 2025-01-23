const Event = require("../model/eventModel")
const Ticket = require("../model/ticketModel")
const PDFDocument = require("pdfkit");



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


exports.generateTicketPDF = async (req, res) => {
  const { ticketId } = req.params;

  try {
    // Fetch ticket details along with event data
    const ticket = await Ticket.findById(ticketId).populate({
      path: "eventId",
      model: "Event",
      select: "-createdAt -updatedAt -__v", // Exclude unnecessary fields
    }).populate({
        path:"userId",
        model : "User",
        select : "-createdAt -updatedAt -__v -password -role -isOtpVerified"
    }) 

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Ensure necessary fields are populated
    if (!ticket.eventId || !ticket.userId) {
      return res.status(400).json({ message: "Invalid ticket data" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers to display the PDF in the browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline;`
    );

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(20).text("Event Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Event: ${ticket.eventId.title}`);
    doc.text(`Date: ${new Date(ticket.eventId.date).toLocaleDateString()}`);
    doc.text(`Time: ${ticket.eventId.time}`);
    doc.text(`Location: ${ticket.eventId.location}`);
    doc.text(`Ticket Number: ${ticket.ticketNumber}`);
    doc.text(`Quantity: ${ticket.quantity}`);
    doc.text(`Purchased By: ${ticket.userId.name || "N/A"}`);
    doc.text(`Purchase Date: ${new Date(ticket.purchaseDate).toLocaleDateString()}`);
    doc.text(`Payment Status: ${ticket.paymentDetails.status || "N/A"}`);
    doc.moveDown();

    doc.fontSize(12).text("Thank you for your purchase!", { align: "center" });

    // Finalize the PDF and end the response
    doc.end();
  } catch (err) {
    console.error("Error generating ticket PDF:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

  
