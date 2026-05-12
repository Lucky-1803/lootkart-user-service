const mongoose = require('mongoose')

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("User database connected successfully.")        
    } catch (error) {
        console.log("Database failed to connect.", error)
        process.exit(1)
    }
}

module.exports = connectToDB