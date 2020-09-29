import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
// import { themes, shuffle } from './subjects'
import firebase from './firebase'


const Admin = () => {
    const [code, setCode] = useState("")
    const [subjects, setSubject] = useState()
    const history = useHistory()
    const location = useLocation()
    const code1 = code
    const code2 = code ** 2


    useEffect(() => {

        // thmesをシャッフルして上書きする
    }, [])

    // テーマの追加機能も実装

    // const themesUpdate = () => {
    //     firebase.auth().signInAnonymously().then(() => {
    //         themes.map(theme => {
    //             firebase.firestore().collection("subjects").doc().set(
    //                 { theme: theme }
    //             )
    //         })
    //     })
    // }



    return (
        <div>
            <h2>Admin</h2>
            <p>4桁の数字を入力してください。</p>
            <input type="tel" maxlength="4" onChange={(e) => setCode(e.target.value)} />
            {/* <button onClick={search}>RESULT</button> */}
            {/* {themes?.map((theme, index) => <p key={index}>Player{index + 1}:{theme}</p>)} */}

            {/* <button onClick={() => themesUpdate()}>themeUpdate</button> */}

        </div>
    )
}

export default Admin
