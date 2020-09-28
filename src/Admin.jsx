import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { subjects, shuffle } from './subjects'

const Admin = () => {
    const [code, setCode] = useState("")
    const history = useHistory()
    const location = useLocation()
    const code1 = code
    const code2 = code ** 2

    const search = () => {
        setSubject(subjects[code1 % 70])
        if (subject) {
            let dice = Number(code1)
            for (let i = 0; i < String(code2).length; i++) {
                dice += Number(String(code2).charAt(i))
            }
            const themes = [subject[dice % 2], subject[dice % 2], subject[dice % 2], subject[dice % 2]]
            themes[dice % 4] = subject[(dice % 2 + 1) % 2]
            setThemes(themes)
        }
    }

    // useEffect(() => {
    //     const dice = code1 % 68
    //     setSubject(subjects[dice])
    // }, [])

    // useEffect(() => {
    //     if (subject) {
    //         let dice = Number(code1)
    //         for (let i = 0; i < String(code2).length; i++) {
    //             dice += Number(String(code2).charAt(i))
    //         }
    //         const themes = [subject[dice % 2], subject[dice % 2], subject[dice % 2], subject[dice % 2]]
    //         themes[dice % 4] = subject[(dice % 2 + 1) % 2]
    //         setThemes(themes)
    //     }
    // }, [subject])



    return (
        <div>
            <h2>Admin</h2>
            <p>4桁の数字を入力してください。</p>
            <input type="number" onChange={(e) => setCode(e.target.value)} />
            <button onClick={search}>RESULT</button>
            <p>Player1:${thmes[0]}</p>
            <p>Player2:${thmes[1]}</p>
            <p>Player3:${thmes[2]}</p>
            <p>Player4:${thmes[3]}</p>
        </div>
    )
}

export default Admin
