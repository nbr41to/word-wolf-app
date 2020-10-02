import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
// import { themes, shuffle } from './subjects'
import firebase from './firebase'

import Button from './components/atoms/Button'
import Input from './components/atoms/Input'



const Admin = () => {
    const [onChange, setOnChange] = useState()
    const [code, setCode] = useState()
    const [room, setRoom] = useState()
    console.log(room)

    useEffect(() => {
        if (code) {
            firebase.firestore().collection("rooms").doc(code).onSnapshot((doc) => {
                if (doc.exists) {
                    setRoom(doc.data())
                }
            });
        }
    }, [code])

    const search = () => {
        setCode(onChange)
    }

    // テーマの追加機能も実装
    const themesUpdate = () => {
        firebase.auth().signInAnonymously().then(() => {
            themes.map(theme => {
                firebase.firestore().collection("subjects").doc().set(
                    { theme: theme }
                )
            })
        })
    }


    return (
        <>
            <h1>Admin</h1>
            <p>6桁の数字を入力してください。</p>
            <Input type="tel" maxlength="6" onChange={(e) => setOnChange(e.target.value)} />
            <Button value="取得" onClick={search} />
            {room &&
                <>
                    {!Object.keys(room.table).length ? <p>まだゲームが始まっていません</p>
                        :
                        <ul>
                            <h3>ゲーム中...</h3>
                            {Object.keys(room.table).map((player, index) => <li key={index}>{player}さん：{room.table[player]}({room.votes.filter(vote => vote === player).length}票)</li>)}
                            <p>票状況：{room.votes.length}/{room.players.length}</p>
                        </ul>
                    }
                </>
            }
            <h2></h2>
        </>
    )
}

export default Admin
