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
            <h1>Home</h1>
            <p>このアプリはグループ通話をしながら、ワードウルフができるアプリです！</p>
            <details>
                <summary>【ルール】</summary>
                <p>ホストがゲームを開始したら,下のピンクの画面を見てください。そこに書かれたテーマについて3分間話し合ってもらいます。しかし、1人だけ違うテーマが与えられます。その人は、他の人のテーマに話を合わせる狼です。そして、あなたは狼かそうでないかわからない状態でゲームはスタートします。</p>
                <ul>
                    <li>ホストは人数がそろったら「GAME START」ボタンを押してください</li>
                    <li>トークの時間は3分間</li>
                    <li>ゲームが始まったらピンクの画面を見てください</li>
                    <li>トーク終了後に投票ボタンが表れますので、狼だと思う人に票を入れてください</li>
                    <li>全員が投票したら結果が表示されます</li>
                    <li>最も多い票の人が狼だった場合は狼の負け</li>
                    <li>最も多い票の人が狼でない場合は狼と思われた人の負け</li>
                    <li>つまり、狼であろうとなかろうと疑われたら負けのゲーム</li>
                </ul>
            </details>
            <details>
                <summary>【注意】</summary>
                <ul>
                    <li>部屋からブラウザを戻ってしまうと部屋は消去されます.</li>
                    <li>ゲーム中にブラウザを更新をしますと正常に機能しません.</li>
                </ul>
            </details>

            <hr />

            <h2>ゲーム内の名前(必須)</h2>
            <input type="text" placeholder="あなたの名前" onChange={(e) => setName(e.target.value)} />
            <br />
            <hr />
            <h2>A:部屋を作る場合</h2>
            <p>新しく部屋を作ります。部屋コードで参加者を招待しましょう。</p>
            <button onClick={createRoom}>部屋を作る</button>
            <hr />
            <h2>B:部屋に入る場合</h2>
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
