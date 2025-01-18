const Event = require("../model/eventModel")
const PDFDocument = require('pdfkit');

const fs = require('fs');
const path = require('path');



exports.getSingleEvent = async(req,res)=>{
    const eventId = req.params.id
    //console.log("eventid",eventId)
    const events = await Event.findById(eventId).populate({
        path:"createdby",
        model : "User",
        select : "-createdAt -updatedAt -__v -password -role -isOtpVerified"
    }) 
   // console.log("events",events)
    if(events.length == 0){
        return res.status(404).json({
            message : "No Event found",
            data : []
        })
    }
    res.status(200).json({
        message : "events fetched successfully",
        data : events

    })

}


// Controller function to generate event report
exports.getEventReport = async (req, res) => {
  try {
    const eventId = req.params.id;  // Get event ID from the URL parameter
    console.log(`Generating report for event ID: ${eventId}`);

    // Fetch the event data from the database using the event ID
    const event = await Event.findById(eventId);

    if (!event) {
      console.log('Event not found');
      return res.status(404).json({ message: 'Event not found' });
    }

    // Ensure revenue is a number, fallback to 0 if not defined
    const revenue = event.revenue || 0;

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Define the file path where the PDF will be saved
    const filePath = path.resolve(__dirname, '../uploads', `event-report-${eventId}.pdf`);

    // Ensure the uploads directory exists
    const uploadDir = path.resolve(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      console.log('Creating uploads directory...');
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log('Writing the PDF file to:', filePath);
    // Pipe the PDF into a writable file stream
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add event information to the PDF
    doc.fontSize(18).text(`Event Report: ${event.title}`, { align: 'center' });
    doc.moveDown();

    // Event details
    doc.fontSize(12).text(`Location: ${event.location}`);
    doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`);
    doc.text(`Time: ${event.time}`);
    doc.moveDown();

    // Event statistics
    doc.text(`Total Participants: ${event.ticketsBooked}`);
    doc.text(`Tickets Sold: ${event.ticketsSold}`);
    doc.text(`Revenue Collected: $${revenue.toFixed(2)}`);
    doc.moveDown();

    // Finalize the document and save it
    doc.end();

    // Wait until PDF file is written before sending the response
    writeStream.on('finish', () => {
      console.log('PDF generated successfully');
      res.download(filePath, `event-report-${eventId}.pdf`, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          return res.status(500).json({ message: 'Error downloading the report' });
        }

        // Optionally, remove the file after it's downloaded
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting the file:', err);
        });
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing PDF to file:', err);
      res.status(500).json({ message: 'Error generating report' });
    });

  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ message: 'Error generating report' });
  }
};


