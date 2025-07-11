const express = require('express')
const app = express()
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const cors = require('cors')
const db_connect = require('./utils/db')

dotenv.config()

app.use(body_parser.json())

if  (process.env.mode === 'production'){
    app.use(cors())
}else{
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true
    }))
}

// Routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/newsRoute'))
app.use('/', require('./routes/adsRoutes'))
app.use('/', require('./routes/userRoutes'))
app.use('/', require('./routes/historyRoute'))
app.use('/', require('./routes/interactionRoutes'))
app.use('/', require('./routes/recommendationRoutes'))

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.port || 5000;

db_connect()

app.listen(port, () => console.log(`Server is running on port ${port}!`))