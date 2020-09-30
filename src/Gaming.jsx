import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from './firebase'

const Gaming = ({ theme, room }) => {
    const [timer, setTimer] = useState(3)
    const players = room.players
    useEffect(() => {
        // カウントダウンする秒数
        var sec = 3;

        // 開始日時を設定
        var dt = new Date();
        // console.log("Start: ", dt);
        // 終了時刻を開始日時+カウントダウンする秒数に設定
        var endDt = new Date(dt.getTime() + sec * 1000);
        // console.log("End : ", endDt);

        // 1秒おきにカウントダウン
        var cnt = sec;
        var id = setInterval(function () {
            cnt--;
            setTimer(cnt)
            // console.log(cnt);
            // 現在日時と終了日時を比較
            dt = new Date();
            if (dt.getTime() >= endDt.getTime()) {
                clearInterval(id);
                console.log("Finish!");
            }
        }, 1000);
    }, [])

    return (
        <div style={{ width: '90%', height: '100vh', backgroundColor: 'pink', }}>
            <h2>あなたのテーマ</h2>
            <h2>{theme}</h2>
            <h2>制限時間</h2>
            <h2>残り{timer}秒</h2>
            <h2>投票</h2>
            {timer <= 0 &&
                room.players.map((player) => <button>{player}</button>)
            }
            <h2>結果を見る</h2>
            <h2>他の人の投票を待っています</h2>
        </div>
    )
}

export default Gaming
