import { css } from '@emotion/css'
import styled from '@emotion/styled'
import {AiOutlineRight, AiOutlineLeft, AiOutlineCaretDown} from 'react-icons/ai'
import MyImage from '../assets/myimage.jpg'
import { useAppDispatch } from '../hooks/hooks'
import { changeVisibility, setEditIndex } from '../store/modalSlice'

const Container = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    align-items: center;
    background-color: ;
    color: white;
    padding: 10px 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);

    @media (max-width: 600px) {
        padding: 10px 10px;
    }
`

const ActiveIconContainer = styled.div`
    background-color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    width: 30px;
    height: 30px;
`

const SideContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    padding: 0 10px;
    max-width: 50%;
    min-width: 50px;

`

const AddSongButton = styled.button`
    background-color: #29d657;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 8px 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
    margin-right: 10px;

    &:hover {
        background-color: #1db954;
    }

`

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #09d657;
`

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;

    @media (max-width: 600px) {
        display: none;
    }
`

// pass a callback func as a prop to the header component

const Header = (
) => {
 const dispatch = useAppDispatch();

 const handleClick = () => {
    dispatch(setEditIndex(null))
    dispatch(changeVisibility())
 }
 
  return (
    <Container>
        <SideContainer>
            <ActiveIconContainer>
                <AiOutlineLeft />
            </ActiveIconContainer>
            <p className = {
                css`
                    color: #7c9181;
                    cursor: pointer;
                    margin: 0 10px;

                    @media (max-width: 600px) {
                        display: none;
                    }
                `
            } >Home</p>
            <AiOutlineRight />
            <p
                className={
                    css`
                        font-weight: bold;
                        cursor: pointer;
                        margin: 0 10px;

                        @media (max-width: 500px) {
                            display: none;
                        }
                    `
                }
            >Today's Mix</p>
        </SideContainer>
        <SideContainer>
            <AddSongButton
                onClick={handleClick}
            >Add Songs</AddSongButton>
            <ProfileContainer>
                <ProfileImage src = {MyImage}/>
                <span
                    className={
                        css`
                            font-weight: bold;
                            margin-right:4px;
                        `
                    }
                >
                    Daniel
                </span>
                <AiOutlineCaretDown />
            </ProfileContainer>
        </SideContainer>
    </Container>
  )
}

export default Header