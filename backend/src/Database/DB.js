const mongoose=require('mongoose')
require('dotenv').config({ path: './src/config/.env' })

const DBconnect=async()=>{
    try{
        mongoose.connect(process.env.DB_URL)
        console.log('connection to Database is successfull')

    }catch(err){
        console.log("Failed to connect to Database",err)
    }
}

module.exports={DBconnect}