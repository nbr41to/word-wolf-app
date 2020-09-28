import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const [code, setCode] = useState("")
    const history = useHistory()


    return (
        <div>
            <h1>Home</h1>
            <p>4桁の数字を入力してください。</p>
            <input type="text" onChange={(e) => setCode(e.target.value)} />
            <button onClick={() => history.push("/" + code)}>START!!</button>
        </div>
    )
}

export default Home
