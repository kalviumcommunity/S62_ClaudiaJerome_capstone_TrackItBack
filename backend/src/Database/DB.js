const mongoose=require('mongoose')
require('dotenv').config({ path: './src/config/.env' })

const DBconnect=async()=>{
    try{
        mongoose.connect(process.env.DB_URL)
        console.log('connected to Database')

    }catch(err){
        console.log("Connection failed",err)
    }
}

module.exports={DBconnect}