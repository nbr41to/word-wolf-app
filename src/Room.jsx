import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { subjects, shuffle } from './subjects'

const Room = (code) => {
    // console.log(subjects[10])
    const [subject, setSubject] = useState()
    const [themes, setThemes] = useState()
    const history = useHistory()
    const location = useLocation()
    const code1 = location.pathname.slice(1)
    const code2 = location.pathname.slice(1) ** 2

    useEffect(() => {
        const dice = code1 % 70
        setSubject(subjects[dice])
    }, [])

    useEffect(() => {
        if (subject) {
            let dice = Number(code1)
            for (let i = 0; i < String(code2).length; i++) {
                dice += Number(String(code2).charAt(i))
            }
            const themes = [subject[dice % 2], subject[dice % 2], subject[dice % 2], subject[dice % 2]]
            themes[dice % 4] = subject[(dice % 2 + 1) % 2]
            setThemes(themes)
        }
    }, [subject])

    const themeDialog = (theme, index) => {
        alert(`あなたのテーマ：${theme}`)
        for (let i = 0; i < 4; i++) {
            if (i !== index) {
                document.getElementById(i).setAttribute("disabled", true);
            }
        }

    }

    return (
        <div>
            <h2>ご参加ありがとうございます！</h2>
            <h2>ゲームを楽しみましょう！</h2>
            <h3>【ルール】</h3>
            <p>これから、あるテーマに関して3分間4人でトークしてもらいます。しかし、4人のうち1人だけ違うテーマの人がいます。この人は、他の3人のテーマに話を合わせる狼です。（あなたが狼かそうでないかわからない状態でゲームはスタートします。）</p>
            <ul>
                <li>下にある自分の番号のボタンを押してテーマを確認します</li>
                <li>トークの時間は3分間</li>
                <li>トーク終了後に狼だと思う人に票を入れます</li>
                <li>最も多い票の人が狼だった場合は狼の負け</li>
                <li>最も多い票の人が狼でない場合は狼と思われた人の負け</li>
                <li>つまり、狼であろうとなかろうと疑われたら負けのゲーム</li>
            </ul>
            {themes?.map((theme, index) =>
                <button onClick={() => themeDialog(theme, index)} key={index} id={index}>
                    Player{index + 1}
                </button>
            )}
            <hr />
            <button onClick={() => history.push("/")}>Homeへ戻る</button>
        </div>
    )
}

export default Room
