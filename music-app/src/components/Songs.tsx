import Header from "./Header"
import ModalForm from "./ModalForm"
import Song from "./Song"
import styled from '@emotion/styled'
import { css } from '@emotion/css'

import { ClipLoader } from "react-spinners"
import { useEffect } from "react"

import {useSelector, useDispatch} from 'react-redux'
import { getMusicFetch } from "../store/musicSlice"
import { useAppSelector } from "../hooks/hooks"
import { ISongsState, SongType } from "../types"

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: #1a1a1a;
    overflow: hidden;
    padding-bottom: 100px;
    box-sizing: border-box;
`

const Songs = () => {
  const songState = useSelector((state: {
    music: ISongsState
  }) => state.music)

  const songs:SongType[] = songState.music
  const dispatch = useDispatch()
  const editedIndex = useAppSelector(state => state.modal.editIndex)

  useEffect(() => {
    dispatch(getMusicFetch())
  }, [dispatch])
    
  
  return (
    <Container>
      <Header />
        {!songState.isLoading && <ModalForm data={{
          id: editedIndex !== null ? songs[editedIndex].id! : null,
          title: editedIndex !== null ? songs[editedIndex].title : "",
          artist:editedIndex !== null ? songs[editedIndex].artist : "",
          album: editedIndex !== null ? songs[editedIndex].album :"",
          year: editedIndex !== null ? songs[editedIndex].year : 0,
        }} />
      }
      {songState.isLoading ? <div className={
        css`
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      }>
        <ClipLoader color="#ffffff" loading={songState.isLoading} size={50} />
      </div>
        : 
        <div className={
          css`
            width: 100%;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 20px 10px;
          `
        }>

          {
            songs.map((song, index) => {

              return <div onClick={()=>{
              }} key={index}>
                <Song  data={
                  {
                    id: song.id!,
                    title: song.title,
                    artist: song.artist,
                    album: song.album,
                    year: song.year,
                    index: index
                  }

                } />
              </div>
            })
          }

        </div>}
    </Container>
  )
}

export default Songs