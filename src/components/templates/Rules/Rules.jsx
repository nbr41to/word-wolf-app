import React from 'react'
import { StyledComponents } from './Rules.styled'

const Rules = () => {
    return (
        <StyledComponents>
            <details>
                <summary>【ルール】</summary>
                <p>与えられたテーマについて部屋のメンバーで3分間話し合ってもらいます。しかし、1人だけ違うテーマが与えられます。その人は、他の人のテーマに話を合わせる狼となるでしょう。そしてあなたが狼かそうでないかは、わからない状態でゲームはスタートします。</p>
                <ul>
                    <li>トークの時間は3分間</li>
                    <li>トーク終了後に投票ボタンが表れますので、狼だと思う人に票を入れてください</li>
                    <li>全員が投票したら結果が表示されます</li>
                    <li>最も多い票の人が狼だった場合は狼の負け</li>
                    <li>最も多い票の人が狼でない場合は狼と思われた人の負け</li>
                    <li>つまり、狼であろうとなかろうと疑われたら負けのゲーム</li>
                    <p>※ルールは相談して変更してもらっても構いません。</p>
                </ul>
            </details>
            <details>
                <summary>【使い方】</summary>
                <ol>
                    <li>ホストが新しく部屋を作ります。このときに部屋コードが作成されます。</li>
                    <li>他の参加者はホストに教えてもらった部屋コードを入力して部屋に入ってください。</li>
                    <li>メンバーが全員部屋に参加したことを確認したら、ホストは「GAME START」ボタンを押してください。</li>
                    <li>ホストがゲームを開始したら、画面に現れる赤枠内を見てください。</li>
                    <li>以降の流れはルールに記載</li>
                </ol>
            </details>
            <details>
                <summary>【注意】</summary>
                <ul>
                    <li>部屋からブラウザを戻ってしまうと部屋は消去されます.</li>
                    <li>ゲーム中にブラウザを更新をしますと正常に機能しません.</li>
                </ul>
            </details>
        </StyledComponents>
    )
}

export default Rules;