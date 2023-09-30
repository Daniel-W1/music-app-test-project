import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'


import { AiOutlineClose } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { changeVisibility, setEditIndex } from '../store/modalSlice'
import { addSong, deleteSong, editSong } from '../store/musicSlice'

interface ModalFromProps {
  data: {
    id: number | null,
    title: string,
    artist: string,
    album: string,
    year: number
  }
}

interface ContainerProps {
  visible: boolean
}

const Container = styled.div`
    opacity: ${(props: ContainerProps) => props.visible ? 1 : 0};
    pointer-events: ${(props: ContainerProps) => props.visible ? 'all' : 'none'};
    transition: all 0.3s ease-in-out;
    width: 40%;
    min-width: 320px;
    height: 70%;
    max-height: 400px;
    padding: 30px 20px;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props: ContainerProps) => props.visible ? 'translate(-50%, -50%)' : 'translate(-50%, -20%)'};
    color: white;
    background-color: #1a1a1a;
    z-index: 100;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius: 15px;
    
  
    
`

const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #333333;
    color: white;
    padding: 0 10px;
    font-size: 16px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

const SubmitButton = styled.button`
    width: 30%;
    min-width: 100px;
    letter-spacing: 1px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #29d657;
    color: white;
    padding: 0 10px;
    font-size: 16px;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #1db954;
    }
    font-weight: bold;
    `

const ModalForm = ({ data }: ModalFromProps) => {
  const dispatch = useAppDispatch();
  const editedIndex = useAppSelector(state => state.modal.editIndex)
  const [isloading, setIsLoading] = useState<boolean>(false)

  const [formData, setFormData] = useState<
    {
      title: string,
      artist: string,
      album: string,
      year: number
    } | any
  >({});

  useEffect(() => {
    setFormData(
      {
        ...data
      }
    )
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (editedIndex != null) {
        handleEdit()
      } else {
        handleAdd()
      }
      dispatch(changeVisibility())
    }, 1000);
  }

  const handleEdit = () => {
    dispatch(editSong(
      {
        id: formData.id,
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        year: formData.year
      }
    )
    )
    setIsLoading(false)
  }

  const handleAdd = () => {
    dispatch(addSong(
      {
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        year: formData.year
      }
    )
    )
    setIsLoading(false)
  }

  const handleDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      dispatch(setEditIndex(null))
      dispatch(changeVisibility())
      dispatch(deleteSong(formData.id))
      setIsLoading(false)

    }, 1000);
  }

  const visible = useAppSelector(state => state.modal.visible);

  return (
    <Container visible={visible}>
      <FormContainer action="" onSubmit={
        (e) => handleSubmit(e)
      }>
        <div className={
          css`
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: flex-end;
          `
        }>
          <AiOutlineClose onClick={() => dispatch(changeVisibility())} className={
            css`
            width: 20px;
            height: 20px;
            cursor: pointer; 
            `
          } />

        </div>
        <StyledInput type="text" required placeholder="Title" value={formData.title || ''} name='title' onChange={handleChange} />
        <StyledInput type="text" required placeholder="Artist" value={formData.artist || ''} name='artist' onChange={handleChange} />
        <StyledInput type="text" required placeholder="Album" value={formData.album || ''} name='album' onChange={handleChange} />
        <StyledInput type="number" required placeholder="Year" value={formData.year || ''} name='year' onChange={handleChange} />
        {isloading ? <SubmitButton><ClipLoader color="#ffffff" loading={isloading} size={13} /></SubmitButton> : <SubmitButton type="submit">{editedIndex ? 'Done' : 'Add'}</SubmitButton>}
        {editedIndex != null &&
          <div>
            {
              isloading ? <ClipLoader color="#ffffff" loading={isloading} size={13} />:
                <AiFillDelete onClick={() => handleDelete()}
                  className={
                    css`
                      width: 20px;
                      height: 20px;
                      cursor: pointer;
                      transition: color 0.2s ease-in-out;

                      :hover{
                        color: red;
                      }
                    `
                  } />
            }
          </div>
        }
      </FormContainer>
    </Container>
  )
}

export default ModalForm