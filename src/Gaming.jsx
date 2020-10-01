import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from './firebase'

const Gaming = ({ theme, room }) => {
    const [timer, setTimer] = useState(200) // カウントダウンする秒数
    const [voted, setVoted] = useState(false)

    useEffect(() => {
        // 開始日時を設定
        var dt = new Date();
        // 終了時刻を開始日時+カウントダウンする秒数に設定
        var endDt = new Date(dt.getTime() + timer * 1000);
        // console.log("End : ", endDt);

        // 1秒おきにカウントダウン
        var cnt = timer;
        var id = setInterval(function () {
            cnt--;
            setTimer(cnt)
            // 現在日時と終了日時を比較
            dt = new Date();
            if (dt.getTime() >= endDt.getTime()) {
                clearInterval(id);
            }
        }, 1000);
    }, [])

    const vote = (player, index) => {
        for (let i = 0; i < room.players.length; i++) {
            document.getElementById(i).setAttribute("disabled", true)
            if (i === index) {
                // document.getElementById(i).style.backgroundColor = "limegreen"
                document.getElementById(i).style.color = "red"
            }
        }
        firebase.firestore().collection("rooms").doc(room.code).update({
            // votes: firebase.firestore.FieldValue.arrayUnion(player), // 重複を許す追加ができないのだ
            votes: [...room.votes, player]
        })
    }

    return (
        <div style={{ width: '100vw', backgroundColor: 'pink', }}>
            <h2>あなたのテーマ</h2>
            <h2>{theme}</h2>
            <h2>制限時間</h2>
            <h2>残り{timer}秒</h2>
            <h2>投票</h2>
            {timer <= 0 &&
                room.players.map((player, index) => <button id={index} key={index} onClick={() => vote(player, index)}>{player}</button>)
            }
            <p>他の人の投票を待っています</p>
            <h2>結果</h2>
            {room.players.length <= room.votes.length &&
                Object.keys(room.table).map((player, index) => <li key={index}>{player}さん：{room.votes.filter(vote => vote === player).length}票</li>)
            }
        </div >
    )
}

export default Gaming
