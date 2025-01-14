import axios from "axios";

const API = axios.create ({
    baseURL : "https://schedulemyschool.onrender.com/",
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json', 
    }
})



const APIAuthenticated = axios.create({
    baseURL : "https://schedulemyschool.onrender.com/",
    headers : {
        'content-Type' : 'application/json',
        Accept : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`


    }
})




export {API, APIAuthenticated}