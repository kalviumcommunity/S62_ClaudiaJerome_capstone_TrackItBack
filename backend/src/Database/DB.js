const mongoose=require('mongoose')
require('dotenv').config({ path: './src/config/.env' })

const DBconnect=async()=>{
    try{
        mongoose.connect(process.env.DB_URL)
        console.log('connected to Database successfully')

    }catch(err){
        console.log("Failed to connect to Database",err)
    }
}

module.exports={DBconnect}