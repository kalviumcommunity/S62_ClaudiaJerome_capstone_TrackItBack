const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config({ path: './src/config/.env' })
const { DBconnect } = require('./Database/DB.js')
const cors = require('cors')

const ItemRouter = require('./routes/ItemRoute.js')
const ClaimRouter = require('./routes/ClaimRoute.js')
const UserRouter = require('./routes/UserRoute.js')


const allowedOrigins = [
    "http://localhost:5173",
    "https://trackitbackweb.netlify.app"   // ✅ your Netlify frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))
app.use('/claim', ClaimRouter)
app.use('/user', UserRouter)
app.use('/item', ItemRouter)


app.listen(process.env.PORT, async () => {
    DBconnect()
    console.log(`server running on http://localhost:${process.env.PORT}`)
})