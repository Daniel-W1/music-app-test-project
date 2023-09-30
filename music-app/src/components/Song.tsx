import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { useState } from 'react'

import { BsPlayFill } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'


import { useAppDispatch } from '../hooks/hooks'
import { changeVisibility, setEditIndex } from '../store/modalSlice'


interface SongProps {
    data: {
        id: number,
        title: string,
        artist: string,
        album: string,
        year: number
        index: number
    }
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    box-sizing: border-box;
    color: white;
    flex-wrap: wrap;
`

const Title = styled.span`
    font-size: 1.2em;
    font-weight: bolder;
`

const Album = styled.span`
    font-size: 0.8em;
`

const Artist = styled.span`
    font-size: 0.8em;
`

const Rank = styled.div`
    font-size: 1.3em;
    color: gray;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: end;

    width: 30px;
`

const StyledButton = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
    text-align: right;
    display: grid;
    place-items: center;
`



const Song = (
    { data }: SongProps
) => {
    const dispatch = useAppDispatch()
    
    const [isHovered, setIsHovered] = useState(false)
    
    const HandleClick = () => {
        dispatch(setEditIndex(data.index))
        dispatch(changeVisibility())
    }    
    
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={
            css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: start;
                padding: 0 20px;
                box-sizing: border-box;

                :hover {
                    background-color: #282828;
                    border-radius: 5px;
                }

                @media (max-width: 600px) {
                    padding: 0 10px;
                }
            `
        }>
            <Rank>{isHovered ? <StyledButton><BsPlayFill className = {
                css`
                    font-size: 1.2em;
                `
            } /></StyledButton> : data.index + 1 + '.'}</Rank>
            <Container>
                <div
                    className={
                        css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                `
                    }
                >
                    <Title>{data.title}</Title>
                    <Album>{data.album}</Album>
                </div>
                <div className={
                    css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    `
                }>
                    {isHovered && <StyledButton onClick={
                        HandleClick
                    } 
                    className = {
                        css`
                            font-size: 1em;
                        `
                    }
                    ><FiEdit2 /></StyledButton>}

                    <div
                        className={
                            css`
                        display: flex;
                        height: 100%;
                        flex-direction: column;
                        justify-content: center;
                        align-items: end;
                        margin-left: 20px;
                        
                        @media (max-width: 600px) {
                            display: none;
                        }
                        `
                        }
                    >
                        <span>{data.year}</span>
                        <Artist>{data.artist}</Artist>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Song