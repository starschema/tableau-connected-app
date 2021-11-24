require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const jwt = require("jsonwebtoken")

app.use(express.json())

const PORT = process.env.PORT

const users = [
  {
    id: "1",
    username: "John",
    password: "John123",
    isAdmin: true,
  },
  {
    id: "2",
    username: "Jane",
    password: "Jane123",
    isAdmin: false,
  },
  {
    id: "3",
    username: "Robert",
    password: "P@1234",
    isAdmin: true,
  },
]

const generateAccessToken = (user) => {
  const jwtOptions = {
    expiresIn: "10m",
    header: {
      kid: process.env.CONNECTED_APP_SECRET_ID,
      iss: process.env.CONNECTED_APP_ID,
    },
  }

  const tableauPayload = {
    jti: require("crypto").randomBytes(64).toString("hex"),
    iss: process.env.CONNECTED_APP_ID,
    aud: "tableau",
    sub: "robert@vizsimply.com",
    scope: ["tableau:views:embed"],
  }

  const accessToken = jwt.sign(
    { userID: user.id, isAdmin: user.isAdmin, ...tableauPayload },
    process.env.CONNECTED_APP_SECRET_VALUE,
    jwtOptions
  )

  return accessToken
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body
  console.log(`UN: ${username}, PW: ${password}`)
  const user = users.find((u) => {
    return u.username === username && u.password === password
  })
  if (user) {
    const accessToken = generateAccessToken(user)
    res.json(accessToken)
  } else {
    res.status(400).json("Username or password incorrect!")
  }
})

app.listen(5000, () => console.log(`Backend server is running on port ${PORT}`))
