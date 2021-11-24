import "./App.css"
import axios from "axios"
import { useState } from "react"
const { tableau } = window

function App() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/login", { username, password })
      console.log("Tableau on the window object ", tableau)
      setUser(res.data)
      setAccessToken(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log("ACCESS TOKEN ", accessToken)

  return (
    <div className="container">
      {user ? (
        <div className="container">
          <tableau-viz
            id="tableauViz"
            src="https://10ax.online.tableau.com/t/developmentonlydev595736/views/EnergyMap/energymap"
            toolbar="Bottom"
            hide-tabs
            width="800px"
            height="600px"
            token={accessToken}
          ></tableau-viz>
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Connected App Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
