const Event = require("../../model/eventModel")
const User = require("../../model/userModel")
const sendEmail = require("../../services/sendEmail")


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

  exports.getSingleUser = async(req,res)=>{
    const id = req.params.id
    const userFound = await User.findById(id)
    console.log(userFound)
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
  //console.log("this is user.id ",user?.id)
  //console.log("this is userid",id)
  //console.log("this is userid ",userId)
  if(!user){
      return res.status(400).json({
          message : "User not found with that userId"
      })

     }
    
      if(id !== userId){
        return res.status(400).json({
            message : "You don't have permission to delete"
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
  //const { ticketBooked } = 0
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
      ticketsBooked : 0,
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
      select : "-createdAt -updatedAt -__v -password -role -isOtpVerified"
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

exports.getMyEvent = async(req,res)=>{
  const userId = req.user.id
  const events = await Event.find({createdby : userId}, "-createdAt -updatedAt -__v").populate({
    path:"createdby",
    model : "User",
    select : "-createdAt -updatedAt -__v -password -role -isOtpVerified"
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
  const {title, description, date, time, location, totalTickets, ticketsBooked } = req.body
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
        if (totalTickets) updatedData.totalTickets= totalTickets
        if (ticketsBooked) updatedData.ticketsBooked= ticketsBooked
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

exports.getVerifiedUser = async (req, res) => {
  try {
      const verifiedUsers = await User.find({ isUserVerified: true }); // Filter for verified users
      
      if (verifiedUsers.length === 0) {
          return res.status(404).json({
              message: "No verified users found",
          });
      }

      res.status(200).json({
          message: "Verified users fetched successfully",
          data: verifiedUsers,
      });
  } catch (error) {
      res.status(500).json({
          message: "An error occurred while fetching users",
          error: error.message,
      });
  }
};


exports.deleteUserByTeacher = async(req,res) =>{
    const userId = req.params.id
   // const userId = req.user.id
    if(!userId){
        res.status(400).json({
            message : "Please provide userid"
        })
  
    }

      //check that userId exist or not
  
    const user = await User.findById(userId)
    //console.log("this is user.id ",user?.id)
    //console.log("this is userid",id)
    //console.log("this is userid ",userId)

   // console.log("user",user)
   if(!user){
    return res.status(400).json({
        message : "User not found with that userId"
    })

   }
  
  
   if(user.role === 'teacher'){
    return res.status(400).json({
        message : "You don't have permission to delete teacher"
        })
    }

   

    //     if(id !== userId){
    //       return res.status(400).json({
    //           message : "You don't have permission to delete"
    //       })
  
    // }else{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            message : "User Deleted Successfully"
        })
    //}
}  


exports.sendData = async (req, res) => {
    const { name, email, tel } = req.body;
  
    console.log(req.body); // Debugging step: Log the received data
  
    if (!name || !email || !tel) {
      return res.status(400).json({
        message: 'Please provide name, email and telephone',
      });
    }
  
    await sendEmail({
      email: `sujanbaskota321@gmail.com`, // Admin email address
      subject: 'Contact Form Submission',
      message: `
        Contact Form Submission Data:
        Name: ${name}
        Email: ${email}
        Telephone: ${tel}
      `,
    });
  
    res.status(200).json({
      message: 'Contact form submitted successfully',
    });
  };
  
