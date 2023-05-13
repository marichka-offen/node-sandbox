const users = require('./characters-db.json')
const express = require('express')
const { postValidator, putValidator } = require('./validationModule')

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
    ...req.body,
  }

  const validator = postValidator(user)
  if (validator.error) {
    res.status(400).send(validator.error.details[0].message)
  }

  users.push(user)
  res.send(user)
})

app.put('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id))
  if (!user) {
    res.status(404).send('User not found')
  }

  const validator = putValidator(req.body)
  if (validator.error) {
    res.status(400).send(validator.error.details[0].message)
  }

  const updatedUser = {
    ...user,
    ...req.body,
  }

  const index = users.indexOf(user)
  users[index] = updatedUser

  res.send(updatedUser)
})

// Port configs
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
