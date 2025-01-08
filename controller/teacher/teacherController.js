const Event = require("../../model/eventModel")
const User = require("../../model/userModel")


exports.getAllUser = async(req,res)=>{
    const userFound = await User.find()
    if(userFound.length < 0) {
     res.status(400).json({
         message : "No user found"
     })
    }else{
      res.status(200).json({
          message : "User fetched succesfully",
          data : userFound
      })
    }
     
  }

  exports.createEvent = async(req,res)=>{
    const {title, description,date,time,location} = req.body

    if(!title ||  !description || !date || !time || !location) {
      return res.status(400).json({
        message : "Please provide title, description,date,time,location"
      })
    }

    const output = await Event.create ({
      title,
      description,
      date,
      time,
      location
    })
    return res.status(200).json({
      message : "Event created successfully",
      data : output
    })
  }

  exports.getAllEvent = async(req,res)=>{
    const events = await Event.find({}, "-createdAt -updatedAt -__v")
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
  exports.deleteEvent = async(req,res)=>{
    const{id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide Id"
        })
    }

    const oldData = await Event.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No Event found with that id"
        })
    }
    await Event.findByIdAndDelete(id)
    res.status(200).json({
        message : "Event deleted successfully"
    })
}