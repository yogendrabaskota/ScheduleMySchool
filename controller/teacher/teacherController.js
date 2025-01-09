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

exports.deleteUser = async(req,res) =>{
  const userId = req.params.id
  const id = req.user.id
  if(!userId){
      res.status(400).json({
          message : "Please provide userid"
      })

  }
    //check that userId exist or not

  const user = await User.findById(userId)
  console.log("this is user.id ",user?.id)
  console.log("this is userid",id)
  console.log("this is userid ",userId)
  if(!user){
      return res.status(400).json({
          message : "User not found with that userId"
      })

     }
    
      if(id !== userId){
        return res.status(400).json({
            message : "You don't have permission to update"
        })

  }else{
      await User.findByIdAndDelete(userId)
      res.status(200).json({
          message : "User Deleted Successfully"
      })
  }
}  

exports.createEvent = async(req,res)=>{
  const userId = req.user.id
  const {title, description,date,time,location,totalTickets} = req.body

    if(!title ||  !description || !date || !time || !location || !totalTickets) {
      return res.status(400).json({
        message : "Please provide title, description,date,time,location"
      })
    }

    const output = await Event.create ({
      title,
      description,
      date,
      time,
      location,
      totalTickets,
      ticketsBooked,
      createdby : userId
    })
    return res.status(200).json({
      message : "Event created successfully",
      data : output
    })
}

exports.getAllEvent = async(req,res)=>{
    const events = await Event.find({}, "-createdAt -updatedAt -__v").populate({
      path:"createdby",
      model : "User",
      select : "-createdAt -updatedAt -__v -password -role"
  }) 
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
exports.cancelEvent = async(req,res)=>{
  const userId = req.user.id
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
    if(oldData.createdby.toString() !== userId){
      return res.status(400).json({
          message : "You don't have permission to delete"
      })
  }
    await Event.findByIdAndDelete(id)
    res.status(200).json({
        message : "Event deleted successfully"
    })
}

exports.updateEvent = async(req,res)=>{
   
  const { id } = req.params
  const userId = req.user.id
  const {title, description, date, time, location } = req.body
  // if(!title || !description || !date || !time || !location){
  //     return res.status(400).json({
  //         message : "Please provide title, description, date, time, location "
  //     })
  // }

  const existingEvent = await Event.findById(id)
  // console.log("this ",existingEvent)
  // console.log("this ",existingEvent.createdby)
  //console.log("this ",existingEvent.createdby.toString())
  //console.log("id ",userId)
  if(!existingEvent){
      return res.status(400).json({
          message : "No Event with that id"
      })
  }

  // check the user who is trying to update is the user who created the event or not

  if(existingEvent.createdby.toString() !== userId){
      return res.status(400).json({
          message : "You don't have permission to update"
      })
  }


 // const updatedEvent = await Event.findByIdAndUpdate(id,{title, description, date, time, location},{new:true}) 
 const updatedData = {};
        if (title) updatedData.title = title
        if (description) updatedData.description = description
        if (date) updatedData.date= date
        if (time) updatedData.totalTickets= totalTickets
        if (time) updatedData.ticketsBooked= ticketsBooked
        if (time) updatedData.time= time
        if (location) updatedData.location= location
        const updatedEvent = await Event.findByIdAndUpdate(id,
            {
               $set: updatedData
              },
            {
               new: true 
              }); 
 
 res.status(200).json({
      message : "Event updated successfully",
      data : updatedEvent

  })
}