import React from 'react'
import { StyledComponents } from './StartButton.styled'
import Button from '../../atoms/Button'

const Member = ({ playerName, host, onClickButton }) => {
    return (
        <StyledComponents>
            {playerName === host ?
                <Button id="start-button" value="GAME START" onClick={onClickButton} />
                :
                <p>ホストがゲームを開始するのをお待ち下さい...</p>
            }
        </StyledComponents>
    )
}

export default Member;