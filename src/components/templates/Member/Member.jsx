import React from 'react'
import { StyledComponents } from './Member.styled'

const Member = ({ playerName, players }) => {
    return (
        <StyledComponents>
            <h3>現在の参加者</h3>
            <ul>
                {players?.map((player, index) =>
                    <li key={index}>
                        {player} さん
                    {player === playerName && <span>(あなた)</span>}
                    </li>
                )}
            </ul>
        </StyledComponents>
    )
}

export default Member;