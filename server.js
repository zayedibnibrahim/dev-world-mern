const express = require('express')
const connectDB = require('./config/db')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
