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
        return_url : "http://localhost:5000/api/payment/success",
        purchase_order_id : ticketNum,
        amount : amount,
        website_url : "http://localhost:5000/",
        purchase_order_name : "orderName_" + ticketNum 

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : 'key 1bede2f3815e47eb98a472675e017104' 
        }
    })
    console.log(response.data)
    let ticket = await Ticket.findById(ticketNum)
    //console.log("ticket",ticket)
    ticket.paymentDetails.pidx = response.data.pidx
    await ticket.save()
    res.redirect(response.data.payment_url)
    
}

