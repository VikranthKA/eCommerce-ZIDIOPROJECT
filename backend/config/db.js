require("dotenv").config()
const mongoose = require("mongoose")

 const db = () =>{
    mongoose.
        connect(process.env.DB_NAME)
        .then(()=>console.log("DB on!"))
        .catch((err)=>{
            console.log(err)
            setInterval(()=>{
                db()
            },5000)
        })
}

module.exports = db