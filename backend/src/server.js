const express=require('express')
const app=express()
const port=8080

const ItemRouter=require('./routes/ItemRoute.js')
const ClaimRouter=require('./routes/ClaimRoute.js')
const UserRouter=require('./routes/UserRoute.js')



app.use('/claim',ClaimRouter)
app.use('/user',UserRouter)
app.use('/item',ItemRouter)


app.listen(port,async()=>{
    console.log(`server running on http://localhost:${port}`)
})