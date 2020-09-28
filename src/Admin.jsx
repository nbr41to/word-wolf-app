import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { subjects, shuffle } from './subjects'

const Admin = () => {
    const [code, setCode] = useState("")
    const [subject, setSubject] = useState()
    const [themes, setThemes] = useState()
    const history = useHistory()
    const location = useLocation()
    const code1 = code
    const code2 = code ** 2

    const search = () => {
        const subject = subjects[code1 % 70]
        let dice = Number(code1)
        for (let i = 0; i < String(code2).length; i++) {
            dice += Number(String(code2).charAt(i))
        }
        const themes = [subject[dice % 2], subject[dice % 2], subject[dice % 2], subject[dice % 2]]
        themes[dice % 4] = subject[(dice % 2 + 1) % 2]
        setThemes(themes)
    }

    return (
        <div>
            <h2>Admin</h2>
            <p>4桁の数字を入力してください。</p>
            <input type="tel" maxlength="4" onChange={(e) => setCode(e.target.value)} />
            <button onClick={search}>RESULT</button>
            {themes?.map((theme, index) => <p key={index}>Player{index + 1}:{theme}</p>)}
        </div>
    )
}

export default Admin
