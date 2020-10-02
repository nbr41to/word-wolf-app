import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from './firebase'
import shortid from "shortid";

import Rules from './components/templates/Rules'
import Entry from './components/templates/Entry'
import Input from './components/atoms/Input'

const Home = () => {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [themes, setThemes] = useState([])
    const history = useHistory()

    useEffect(() => {
        firebase.auth().signInAnonymously().then(() => {
            firebase.firestore().collection("subjects").onSnapshot((snapshot) => {
                let getThemes = snapshot.docs.map((doc) => {
                    const getTheme = doc.data();
                    return getTheme
                });
                setThemes(getThemes)
            })
        });
    }, [])

    const createRoom = () => {
        if (name !== "") {
            const id = shortid.generate()
            const code = String(Math.random() * 1).slice(2, 8) // 6桁の乱数文字列

            firebase.auth().signInAnonymously()
                .then(() => {
                    firebase.firestore().collection("rooms").doc(code).set(
                        {
                            id: id,
                            code: code,
                            theme: themes[Number(code) % 70].theme,
                            host: name,
                            players: [name],
                            table: {},
                            isGaming: false,
                            finished: false,
                            votes: [],
                        }
                    )
                })
                .then(() => {
                    history.push({
                        pathname: "/room/" + code,
                        state: {
                            playerName: name,
                        }
                    })
                })
        } else {
            alert("名前を入力してください")
        }
    }

    const entryRoom = () => {
        if (name !== "") {
            firebase.auth().signInAnonymously()
                .then(() => {
                    firebase.firestore().collection("rooms").doc(code).update(
                        {
                            players: firebase.firestore.FieldValue.arrayUnion(name),
                        }
                    )
                })
                .then(() => {
                    history.push({
                        pathname: "/room/" + code,
                        state: {
                            playerName: name,
                        }
                    })
                })
        } else {
            alert("名前を入力してください")
        }
    }

    return (
        <div>
            <h1>HOME</h1>
            <p>このアプリはグループ通話をしながら、ワードウルフができるアプリです！</p>
            <Rules />

            <h2>ゲーム内の名前(必須)</h2>
            {/* <TextField label="Player Name" variant="outlined" /> */}
            <Input type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} />
            <div style={{ display: 'flex' }}>
                <Entry
                    style={{ width: '50%' }}
                    label="部屋を作る"
                    buttonLabel="NEW ROOM"
                    color="limegreen"
                    onClickButton={createRoom}
                >
                    <p>新しく部屋を作り、ホストになります。参加者に部屋コードを伝えてください。</p>
                </Entry>
                <Entry
                    style={{ width: '50%' }}
                    label="部屋に入る"
                    buttonLabel="INTO ROOM"
                    color="pink"
                    onClickButton={entryRoom}
                >
                    <p>ホストから伝えられた6桁の部屋コードを入力してください。</p>
                    <Input
                        type="tel"
                        maxLength="6"
                        placeholder="Room code"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </Entry>
            </div>
        </div>
    )
}

export default Home
