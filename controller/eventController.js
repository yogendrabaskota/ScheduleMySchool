const Event = require("../model/eventModel")


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