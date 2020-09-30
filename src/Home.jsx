import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from './firebase'
import shortid from "shortid";

const Home = () => {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [themes, setThemes] = useState([])
    const history = useHistory()

    useEffect(() => {
        firebase.firestore().collection("subjects").onSnapshot((snapshot) => {
            let getThemes = snapshot.docs.map((doc) => {
                const getTheme = doc.data();
                return getTheme
            });
            setThemes(getThemes)
        });
    }, [])
    // console.log(themes)

    const createRoom = () => {
        if (name !== "") {
            const id = shortid.generate()
            const code = String(Math.random() * 1).slice(2, 8) // 6桁の乱数文字列

            firebase.auth().signInAnonymously()
                .then(() => {
                    if (code) {
                        const wolf = Number(code) % 4
                        const thisThemes = themes[Number(code) % 70].theme
                        const thisTheme = [thisThemes[Number(code) % 2], thisThemes[Number(code) % 2], thisThemes[Number(code) % 2], thisThemes[Number(code) % 2]]
                        thisTheme[wolf] = thisThemes[(Number(code) + 1) % 2]
                        return thisTheme
                        // return thisThemes
                    }
                })
                .then((thisTheme) => {
                    firebase.firestore().collection("rooms").doc(code).set(
                        {
                            id: id,
                            code: code,
                            theme: thisTheme,
                            players: [name],
                            votes: [],
                        }
                    )
                })
                .then(() => {
                    history.push("/room/" + code)
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
                    history.push("/room/" + code)
                })
        } else {
            alert("名前を入力してください")
        }
    }


    return (
        <div>
            <h1>Home</h1>
            <p>このアプリはグループ通話をしながら、ワードウルフができるアプリです！</p>
            <details>
                <summary>ルール</summary>
                <p>数人であるテーマについて話し合ってもらいます。</p>
            </details>
            <hr />
            <h2>ゲーム内の名前(必須)</h2>
            <input type="text" placeholder="あなたの名前" onChange={(e) => setName(e.target.value)} />
            <br />
            <hr />
            <h2>A:部屋を作る</h2>
            <p>新しく部屋を作ります。部屋コードで参加者を招待しましょう。</p>
            <button onClick={createRoom}>部屋を作る</button>
            <hr />
            <h2>B:部屋に入る</h2>
            <p>招待された場合、6桁の部屋コードを入力してください。</p>
            <input
                type="tel"
                maxLength="6"
                placeholder="部屋コード"
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={() => entryRoom()}>部屋に入る</button>
        </div>
    )
}

export default Home
