const Event = require("../model/eventModel");
const Ticket = require("../model/ticketModel");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const User = require("../model/userModel");
const moment = require("moment");

exports.bookTicket = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user?.id;
  const { quantity } = req.body;
  const userRole = req.user?.role;

  // console.log("eventid",eventId)
  // console.log("user id",userId)
  if (!eventId || !userId || !quantity) {
    return res.status(400).json({
      message: "Please provide eventId and userId and quantity",
    });
  }

  const event = await Event.findById(eventId);
  // console.log("this is event ",event)
  if (!event) {
    return res.status(404).json({
      message: "No event found with that event id",
    });
  }

  const existingTicket = await Ticket.findOne({ eventId, userId });
  if (existingTicket) {
    return res.status(400).json({
      message:
        "You already have booked a ticket for this event. Users are not allowed to buy tickets more than once for the same event.",
    });
  }
  if (event.ticketsBooked + quantity >= event.totalTickets) {
    return res.status(400).json({
      message: "Sorry!! Ticket is already sold out",
    });
  }

  if (userRole === "guest") {
    const ticket = await Ticket.create({
      eventId,
      userId,
      ticketNumber: `TICKET-${Date.now()}${userId}`,
      // ticketNumber: userId,
      quantity,
      paymentDetails: {
        status: "pending",
      },
    });

    return res.status(200).json({
      message: "Guest have to pay for ticket. Proceed to payment",
      data: ticket,
    });
  } else if (userRole === "student" || userRole === "teacher") {
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
    event.ticketsBooked += quantity;
    await event.save();
    // console.log("ticket",ticket)
    return res.status(200).json({
      message: "Ticket booked successfully",
      data: ticket,
    });
  } else {
    return res.status(400).json({
      message: "Failure",
    });
  }
};

exports.getMyTicket = async (req, res) => {
  const userId = req.user.id;
  //    console.log("user ",userId)
  if (!userId) {
    return res.status(400).json({
      message: "Please provide userId",
    });
  }
  const tickets = await Ticket.find({ userId }, "-createdAt -updatedAt -__v")
    .populate({
      path: "eventId",
      model: "Event",
      select:
        "-createdAt -updatedAt -__v -ticketsBooked -description -totalTickets",
    })
    .populate({
      path: "userId",
      model: "User",
      select:
        "-createdAt -updatedAt -__v -email -isOtpVerified -password -phoneNumber -role -isUserVerified",
    });
  // console.log(tickets)
  if (tickets.length < 1) {
    return res.status(404).json({
      message: "This user have no ticket",
    });
  }
  res.status(200).json({
    message: "Your tickets are",
    data: tickets,
  });
};

exports.getAllTicket = async (req, res) => {
  const eventId = req.params.id;
  //    console.log("user ",userId)
  if (!eventId) {
    return res.status(400).json({
      message: "Please provide eventId",
    });
  }
  const tickets = await Ticket.find({ eventId })
    .populate({
      path: "userId",
      model: "User",
      select: "-__v -updatedAt -createdAt -role -password -phoneNumber",
    })
    .populate({
      path: "eventId",
      model: "Event",
      select: "-__v -updatedAt -createdAt -description -createdby",
    });

  if (tickets.length < 1) {
    return res.status(404).json({
      message: "no ticket found for this event",
    });
  }
  res.status(200).json({
    message: "ticket details about this event are",
    data: tickets,
  });
};

exports.generateTicketPDF = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id)
      .populate({
        path: "eventId",
        model: "Event",
        select: "-createdAt -updatedAt -__v",
      })
      .populate({
        path: "userId",
        model: "User",
        select: "-createdAt -updatedAt -__v -password -role -isOtpVerified",
      });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Generate QR code
    const qrData = {
      ticketId: ticket._id,
      ticketNumber: ticket.ticketNumber,
      event: ticket.eventId.title,
      date: ticket.eventId.date,
    };
    const qrCodeBase64 = await QRCode.toDataURL(JSON.stringify(qrData));

    // Create PDF document with optimized dimensions
    const doc = new PDFDocument({
      size: [400, 600], // Maintain ticket-like dimensions
      margin: 15, // Reduce margin slightly
      layout: "portrait",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket_${ticket.ticketNumber}.pdf`
    );
    doc.pipe(res);

    // Add decorative border
    doc
      .rect(10, 10, doc.page.width - 20, doc.page.height - 20)
      .stroke("#3F51B5")
      .lineWidth(2);

    // Header with logo and school info - made more compact
    doc
      .fillColor("#3F51B5")
      .fontSize(16) // Reduced from 18
      .font("Helvetica-Bold")
      .text("BHANU SECONDARY SCHOOL", { align: "center" });

    doc.moveDown(0.2); // Reduced spacing
    doc
      .fillColor("#FF9800")
      .fontSize(9) // Reduced from 10
      .text("OFFICIAL EVENT TICKET", { align: "center" });

    doc.moveDown(0.5); // Reduced from 1
    doc
      .fillColor("#333")
      .fontSize(7) // Reduced from 8
      .text("Jhiljhile, Jhapa, Nepal | Contact: 123-456-7890", {
        align: "center",
      });

    // Ticket number with barcode area - made more compact
    doc.moveDown(1); // Reduced from 1.5
    doc
      .rect(50, doc.y, 300, 30) // Reduced height from 40
      .fill("#F5F5F5")
      .stroke("#E0E0E0");

    doc
      .fillColor("#3F51B5")
      .fontSize(10) // Reduced from 12
      .text("TICKET NUMBER", 60, doc.y + 5);

    doc
      .fillColor("#000")
      .fontSize(18) // Reduced from 20
      .font("Helvetica-Bold")
      .text(ticket.ticketNumber, 60, doc.y + 15); // Adjusted position

    // QR Code - position adjusted to save space
    const qrImage = qrCodeBase64.split(",")[1];
    doc.image(Buffer.from(qrImage, "base64"), doc.page.width - 90, doc.y - 5, {
      width: 70, // Reduced from 80
      height: 70, // Reduced from 80
      align: "right",
    });

    // Event details section - made more compact
    doc.moveDown(2); // Reduced from 3
    doc
      .fillColor("#3F51B5")
      .fontSize(12) // Reduced from 14
      .text("EVENT DETAILS", { underline: true });

    doc.moveDown(0.3); // Reduced from 0.5
    doc
      .fillColor("#000")
      .fontSize(10) // Reduced from 12
      .text(ticket.eventId.title, { indent: 15 }); // Reduced indent

    doc.moveDown(0.2); // Reduced from 0.3
    doc.text(`Date: ${moment(ticket.eventId.date).format("MMMM Do, YYYY")}`, {
      indent: 15,
    });
    doc.text(`Time: ${ticket.eventId.time}`, { indent: 15 });
    doc.text(`Location: ${ticket.eventId.location}`, { indent: 15 });

    // Attendee information - made more compact
    doc.moveDown(0.5); // Reduced from 1
    doc
      .fillColor("#3F51B5")
      .fontSize(12) // Reduced from 14
      .text("ATTENDEE INFORMATION", { underline: true });

    doc.moveDown(0.3); // Reduced from 0.5
    doc
      .fillColor("#000")
      .fontSize(10) // Reduced from 12
      .text(`Name: ${ticket.userId.name || "N/A"}`, { indent: 15 });
    doc.text(`Email: ${ticket.userId.email}`, { indent: 15 });
    doc.text(`Ticket Type: General Admission`, { indent: 15 });

    // Ticket details table - made more compact
    doc.moveDown(0.5); // Reduced from 1
    doc
      .fillColor("#3F51B5")
      .fontSize(12) // Reduced from 14
      .text("TICKET DETAILS", { underline: true });

    // Draw compact table
    const tableTop = doc.y + 5; // Reduced spacing
    doc
      .font("Helvetica-Bold")
      .fontSize(9) // Reduced from 10
      .text("ITEM", 50, tableTop)
      .text("DETAILS", 200, tableTop);

    doc
      .moveTo(50, tableTop + 12) // Reduced spacing
      .lineTo(350, tableTop + 12)
      .stroke("#E0E0E0");

    doc
      .font("Helvetica")
      .fontSize(9) // Reduced from 10
      .text("Quantity", 50, tableTop + 15) // Reduced spacing
      .text(ticket.quantity.toString(), 200, tableTop + 15);

    doc
      .text("Status", 50, tableTop + 27) // Reduced spacing
      .text(ticket.paymentDetails.status || "N/A", 200, tableTop + 27);

    doc
      .text("Purchase Date", 50, tableTop + 39) // Reduced spacing
      .text(
        moment(ticket.purchaseDate).format("MMM D, YYYY h:mm A"),
        200,
        tableTop + 39
      );

    // Footer with terms - made more compact
    doc.moveDown(1.5); // Reduced from 3
    doc
      .fillColor("#757575")
      .fontSize(7) // Reduced from 8
      .text("TERMS AND CONDITIONS:", { align: "center" });

    doc.text("• This ticket is non-transferable", { align: "center" });
    doc.text("• Please bring valid ID matching attendee information", {
      align: "center",
    });
    doc.text("• No refunds after event date", { align: "center" });

    // Final decorative elements
    doc.moveDown(0.5); // Reduced from 1
    doc
      .fillColor("#FF9800")
      .text("Thank you for your support!", { align: "center", fontSize: 9 }); // Reduced from 10

    doc.end();
  } catch (err) {
    console.error("Error generating ticket PDF:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating ticket" });
    }
  }
};

exports.verifyTicket = async (req, res) => {
  const { ticketNumber } = req.params;
  const userId = req.user.id;

  const userFound = await User.findById(userId);
  if (!userFound) {
    return res.status(400).json({
      message: "Ticket is not verified",
    });
  }

  if (!ticketNumber || typeof ticketNumber !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ticket number" });
  }

  try {
    const ticket = await Ticket.findOne({ ticketNumber })
      .populate("eventId")
      .populate("userId");
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Error verifying ticket:", error);
    res.status(500).json({ success: false, message: "Error verifying ticket" });
  }
};
