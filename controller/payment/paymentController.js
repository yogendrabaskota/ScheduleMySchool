const { default: axios } = require("axios")
const Ticket = require("../../model/ticketModel")

exports.initiateKhaltiPayment = async(req,res)=>{
    const { ticketNum, amount} = req.body
    if(!ticketNum || !amount){
        return res.status(400).json({
            message : "PLease provide ticketNum and Amount"
        })
    }
    const data = {
        return_url : "https://schedulemyschool.onrender.com/api/payment/success",
        purchase_order_id : ticketNum,
        amount : amount,
        website_url : "https://schedulemyschool.onrender.com/",
        purchase_order_name : "orderName_" + ticketNum 

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : `key ${process.env.AUTHORIZATION}`,
        }
    })
    //console.log(response.data)
    let ticket = await Ticket.findById(ticketNum)
    //console.log("ticket",ticket)
    ticket.paymentDetails.pidx = response.data.pidx
    await ticket.save()
    // res.redirect(response.data.payment_url)
    res.status(200).json({
        message: "Payment initiation successful",
        payment_url: response.data.payment_url
    });
    
}

exports.verifyPidx = async(req,res)=>{
    //const app = require("./../../../app")
    //const io = app.getSocketIo()

    const pidx = req.query.pidx
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers : {
            'Authorization' : `key ${process.env.AUTHORIZATION}`
        }

    })
    if(response.data.status == 'Completed'){
        //database modification

        let ticket = await Ticket.find({'paymentDetails.pidx' : pidx})
       // console.log(ticket)
        ticket[0].paymentDetails.method = 'Khalti'
        ticket[0].paymentDetails.status = 'paid'
        await ticket[0].save()



        //notify to success frontend
       // res.redirect("http://localhost:5000/successPage")
       const walletUrl = `https://test-pay.khalti.com/wallet?pidx=${pidx}`;
            return res.redirect(walletUrl);
       //alert("successful")
       // io.emit("payment",{message : "Payment Successfully"})

    }else{
        //notify error to frontend
        res.redirect("http://localhost:5000/errorPage")
        //io.emit("payment",{message : "Payment Failure"})

    }
}