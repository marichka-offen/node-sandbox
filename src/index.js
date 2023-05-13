const users = require('./characters-db.json')
const express = require('express')
const app = express()

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

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
