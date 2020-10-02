import React, { useState, useEffect } from 'react'
import firebase from './firebase'

import Button from './components/atoms/Button'
import Rules from "./components/templates/Rules"
import Member from "./components/templates/Member"
import StartButton from "./components/templates/StartButton"
import Gameplate from "./components/templates/Gameplate"


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

    const backHome = () => {
        if (window.confirm("本当にHOMEに戻りますか？（作った部屋は削除されます）")) {
            history.goBack();
        }
    }

    return (
        <>
            {
                room ?
                    <div>
                        <h1>ROOM</h1>
                        <h2>部屋コードは{roomCode}です。</h2>
                        <p>一緒にプレイする人にコードを教えて招待しましょう！</p>
                        <Member
                            playerName={playerName}
                            players={room?.players}
                        />
                        {room.isGaming &&
                            <Gameplate theme={room?.table[playerName]} room={room} />
                        }
                        <Rules />
                        <StartButton
                            playerName={playerName}
                            host={room?.host}
                            onClickButton={gameStart}
                        />
                        <Button value="Homeへ戻る" onClick={backHome} />
                    </div >
                    :
                    <>
                        <p>お探しのお部屋はありません。</p>
                        <p>もう一度、部屋コードをご確認ください🙇‍♂️</p>
                        <Button value="Homeへ戻る" onClick={backHome} />
                    </>
            }
        </>
    )
}

export default Room
