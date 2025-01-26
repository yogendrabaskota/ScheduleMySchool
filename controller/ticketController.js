const Event = require("../model/eventModel")
const Ticket = require("../model/ticketModel")
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");



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
   // console.log("ticket",ticket)
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
 // const { ticketId } = req.params;
  const { id } = req.params;
 // const ticketId = req.params.id
  //const { rq } = req.query; // Extract 'rq' from query parameters
//   if (!mongoose.Types.ObjectId.isValid(ticketId)) {
//     return res.status(400).json({ message: "Invalid ticket ID format" });
//   }

  try {
    // Fetch ticket details along with event data
    const ticket = await Ticket.findById(id).populate({
      path: "eventId",
      model: "Event",
      select: "-createdAt -updatedAt -__v", // Exclude unnecessary fields
    }).populate({
      path: "userId",
      model: "User",
      select: "-createdAt -updatedAt -__v -password -role -isOtpVerified",
    });

    //console.log(ticket)
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Ensure necessary fields are populated
    // if (!ticket.eventId || !ticket.userId) {
    //   return res.status(400).json({ message: "Invalid ticket data" });
    // }

    // Generate QR code with ticket details
    const qrData = {
      ticketNumber: ticket.ticketNumber,
      event: ticket.eventId.title || 'NA',
      date: ticket.eventId.date,
      purchaser: ticket.userId.name,
      email: ticket.userId.email,
    //  rq,
    };

    const qrCodeBase64 = await QRCode.toDataURL(JSON.stringify(qrData));


    // Create a new PDF document
    const doc = new PDFDocument({ margin: 30 });

    // Set response headers to display the PDF in the browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add company/event details header
    doc.fontSize(16).text("BHANU SECONDARY SCHOOL", { align: "center", underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).text("estd: 2024", { align: "center" });
    doc.text("Address: Jhiljhile Jhapa, Nepal", { align: "center" });
    doc.text("Contact: 123-456-7890 | bhanuschool@gmail.com", { align: "center" });
    doc.moveDown(1);

    // Ticket information
    doc.fontSize(14)
    .text('Ticket No: ', { align: "center" })
    .fillColor('blue')
    .text(ticket.ticketNumber, { align: "center" });
  

    doc.moveDown(1);
    // Add Purchase Date
    doc.fillColor('black').text(`Purchase Date: ${new Date(ticket.purchaseDate).toLocaleDateString()}`, { align: "left" });
    doc.moveDown(1);



    // Embed QR Code aaaaa
    const qrImage = qrCodeBase64.split(",")[1]; // Extract base64 data
    const qrX = 400; // Position on the right side
    const qrY = doc.y; // Just below Purchase Date
    doc.image(Buffer.from(qrImage, "base64"), qrX, qrY, { width: 100, height: 100 });


  

    // // Add caption below the QR code
    // const captionY = qrY + 110; // Adjust to place caption slightly below the QR code
    // doc.fontSize(10).text("Verification QR Code", qrX, captionY, { align: "center" });

    // Buyer and Event details (to the left of the QR code)
    doc.moveDown(1);
    doc.fillColor('black').fontSize(12).text(`Event: ${ticket.eventId.title}`);
    doc.text(`Date: ${new Date(ticket.eventId.date).toLocaleDateString()}`, { indent: 37 });
    doc.text(`Time: ${ticket.eventId.time}`,{ indent: 37 });
    doc.text(`Location: ${ticket.eventId.location}`, { indent: 37 });
    doc.moveDown(1);
    doc.text(`Purchased By: ${ticket.userId.name || "N/A"}`);
    doc.text(`Email: ${ticket.userId.email}`);
    doc.moveDown(1);

    // Add table-like structure for items
    doc.fontSize(12).text("Details:", { underline: true });
    doc.moveDown(0.5);
    doc.text(`Quantity: ${ticket.quantity}`, { indent: 20 });
    doc.text(`Payment Status: ${ticket.paymentDetails.status || "N/A"}`, { indent: 20 });
    doc.moveDown(1);

    // Footer with return policy
    doc.moveDown(2);
    doc.fontSize(10).text("The return period expires on the event date.", { align: "center", italic: true });

    // Finalize the PDF and end the response
    doc.end();
  } catch (err) {
    console.error("Error generating ticket PDF:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error here" });
    }
  }
};

  

exports.verifyTicket = async (req, res) => {
  const { ticketNumber } = req.params;

  if (!ticketNumber || typeof ticketNumber !== "string") {
    return res.status(400).json({ success: false, message: "Invalid ticket number" });
  }

  try {
    const ticket = await Ticket.findOne({ ticketNumber }).populate('eventId').populate('userId');
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Error verifying ticket:", error);
    res.status(500).json({ success: false, message: "Error verifying ticket" });
  }
};
