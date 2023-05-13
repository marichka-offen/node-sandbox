const users = require('./characters-db.json')
const express = require('express')
const validator = require('./validationModule')

const app = express()

app.use(express.json())

// Routes
app.get('/api/users', (req, res) => {
  if (!users) {
    res.status(500).send('Internal server error. Unable to retrieve user data.')
  }
  res.send(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id))
  if (!user) {
    res.status(404).send('User not found')
  }
  res.send(user)
})

app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    age: req.body.age,
    occupation: req.body.occupation,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    interests: req.body.interests,
  }

  const bodyValidator = validator(user)

  if (bodyValidator.error) {
    res.status(400).send(bodyValidator.error.details[0].message)
  }

  users.push(user)
  res.send(user)
})

// Port configs
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
