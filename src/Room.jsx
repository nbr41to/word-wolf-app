import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import Gaming from "./Gaming"

// import { subjects, shuffle } from './subjects'

const Room = ({ history, location }) => {
    const [room, setRoom] = useState()
    const roomCode = location.pathname.slice(6)
    const playerName = location.state.playerName
    // console.log(room)

    useEffect(() => {
        // データを監視したいのでonSnapshot
        firebase.firestore().collection("rooms").doc(roomCode).onSnapshot((doc) => {
            if (doc.exists) {
                setRoom(doc.data())
            }
        });
        // 一人でも退室したら部屋消える関数
        return () => {
            firebase.firestore().collection("rooms").doc(roomCode).delete()
        }
        // オーナーが退室したら部屋消える関数を作りたい
        // return () => {
        //     if (room?.host === playerName) {
        //         firebase.firestore().collection("rooms").doc(roomCode).delete()
        //     }
        // }
    }, [])

    const gameStart = () => {
        const dice = Number([...String((Number(roomCode) + 123) ** 3)].reduce((sum, num) => Number(sum) + Number(num)))
        // wolf選出演算
        const wolf = dice % room.players.length
        const themes = []
        const table = {}
        for (let i = 0; i < room.players.length; i++) {
            if (i !== wolf) {
                table[room.players[i]] = room.theme[dice % 2]
            } else {
                table[room.players[i]] = room.theme[(dice + 1) % 2]
            }
        }
        firebase.firestore().collection("rooms").doc(roomCode).update({
            table: table,
            isGaming: true,
            votes: []
        })
        document.getElementById("start-button").setAttribute("disabled", true);
    }

    return (
        <>
            {
                room ?
                    <div>
                        <h2> ようこそ！</h2>
                        <h2>部屋コードは{roomCode}です。</h2>
                        <p>部屋コードを知っている4人でワードウルフをお楽しみいただけます！</p>

                        <h3>現在の参加者</h3>
                        <ul>
                            {room?.players.map((player, index) => <li key={index}>{player} さん</li>)}
                        </ul>
                        <p>あなた：{playerName}</p>
                        <h3>【注意】</h3>
                        <ul>
                            <li>部屋からブラウザを戻ってしまうと部屋は消去されます.</li>
                            <li>ゲーム中にブラウザを更新をしますと正常に機能しません.</li>
                        </ul>
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
                        {playerName === room.host ?
                            <button id="start-button" onClick={gameStart}>GAME START</button>
                            :
                            <p>ホストがゲームを開始するのをお待ち下さい...</p>}
                        {room.isGaming && <Gaming theme={room?.table[playerName]} room={room} />}
                        <hr />
                        <button onClick={() => history.push("/")}>Homeへ戻る</button>
                    </div >
                    :
                    <>
                        <p>お探しのお部屋はありません。</p>
                        <p>もう一度、部屋コードをご確認ください🙇‍♂️</p>
                    </>
            }
        </>
    )
}

export default Room
