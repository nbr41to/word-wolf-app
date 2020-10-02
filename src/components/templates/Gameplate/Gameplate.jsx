import React, { useState, useEffect } from 'react'
import { StyledComponents } from './Gameplate.styled'
import firebase from '../../../firebase'

import Button from '../../atoms/Button'

const Gameplate = ({ theme, room }) => {
    const [timer, setTimer] = useState(180) // カウントダウンする秒数
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
                document.getElementById(i).style.backgroundColor = "red"
            }
        }
        firebase.firestore().collection("rooms").doc(room.code).update({
            // votes: firebase.firestore.FieldValue.arrayUnion(player), // 重複を許す追加ができないのだ
            votes: [...room.votes, player]
        })
        setVoted(true)
    }

    return (
        <StyledComponents>
            <h2>◆あなたのテーマ</h2>
            <h1>「{theme}」</h1>
            <h2>◆制限時間</h2>
            <h2>残り{timer}秒</h2>
            {timer <= 0 &&
                <>
                    <h2>◆投票</h2>
                    {room.players.map((player, index) =>
                        <Button id={index} key={index} value={player} onClick={() => vote(player, index)} />
                    )}
                </>
            }
            {voted && <p>他の人の投票を待っています</p>}
            {room.players.length <= room.votes.length &&
                <>
                    <h2>◆結果</h2>
                    {Object.keys(room.table).map((player, index) =>
                        <li key={index}>{player}さん：{room.votes.filter(vote => vote === player).length}票</li>
                    )}
                </>
            }
        </StyledComponents>
    )
}

export default Gameplate
