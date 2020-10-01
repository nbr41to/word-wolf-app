import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import Gaming from "./Gaming"

// import { subjects, shuffle } from './subjects'

const Room = ({ history, location }) => {
    const [room, setRoom] = useState()
    const [yourTheme, setYourTheme] = useState()
    const [openGaming, setOpenGaming] = useState(false)
    const roomCode = location.pathname.slice(6)
    console.log(room)

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
    }, [])




    const gameStart = () => {
        // alert(`あなたのテーマ：${theme}`)

    }

    const selectPlayer = (theme, index) => {
        // setYourTheme(theme)
        for (let i = 0; i < 4; i++) {
            if (i !== index) {
                document.getElementById(i).setAttribute("disabled", true);
            }
        }
        setOpenGaming(true)
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
                            {room?.players.map((player) => <li>{player} さん</li>)}
                        </ul>

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
                        {
                            room.players.map((player, index) =>
                                <button onClick={() => selectPlayer(yourTheme, index)} key={index} id={index}>
                                    {player}
                                </button>
                            )
                        }
                        {openGaming && <Gaming theme={yourTheme} room={room} />}
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

    // if (room) {
    //     return (
    //         <div>
    //             <h2>ようこそ！</h2>
    //             <h2>部屋コードは{location.pathname.slice(6)}です。</h2>
    //             <p>部屋コードを知っている4人でワードウルフをお楽しみいただけます！</p>

    //             <h3>【ルール】</h3>
    //             <p>これから、あるテーマに関して3分間4人でトークしてもらいます。しかし、4人のうち1人だけ違うテーマの人がいます。この人は、他の3人のテーマに話を合わせる狼です。（あなたが狼かそうでないかわからない状態でゲームはスタートします。）</p>
    //             <ul>
    //                 <li>下にある自分の番号のボタンを押してテーマを確認します</li>
    //                 <li>トークの時間は3分間</li>
    //                 <li>トーク終了後に狼だと思う人に票を入れます</li>
    //                 <li>最も多い票の人が狼だった場合は狼の負け</li>
    //                 <li>最も多い票の人が狼でない場合は狼と思われた人の負け</li>
    //                 <li>つまり、狼であろうとなかろうと疑われたら負けのゲーム</li>
    //             </ul>
    //             {room.theme.map((theme, index) =>
    //                 <button onClick={() => gameStart(theme, index)} key={index} id={index}>
    //                     player{index + 1}
    //                 </button>
    //             )}
    //             {openGaming && <Gaming theme={yourTheme} />}
    //             <hr />
    //             <button onClick={() => history.push("/")}>Homeへ戻る</button>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <>
    //             <p>お探しのお部屋はありません。</p>
    //             <p>もう一度、部屋コードをご確認ください🙇‍♂️</p>
    //         </>
    //     )
    // }
}

export default Room
