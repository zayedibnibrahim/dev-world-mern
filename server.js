const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const postRoutes = require('./routes/post')
const path = require('path')

dotenv.config()
const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/post', postRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
