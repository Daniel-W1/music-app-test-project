import { BsMusicNoteList } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiLibrary, BiPodcast, BiHeadphone } from 'react-icons/bi'
import { GiLoveSong } from 'react-icons/gi'
import { IoIosAlbums } from 'react-icons/io'

import styled from '@emotion/styled'
import { css } from '@emotion/css'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 22%;
    background-color: #1a1a1a;
    color: white;
    padding: 10px 20px;
    box-sizing: border-box;
    border-right: 1px solid #333333;

    @media(max-width: 900px){
        display: none;
    }
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 10px;
`

const LogoText = styled.h1`
    font-size: 30px;
    margin-left: 10px;
    font-weight: bold;
    color: #29d657;
`

const SectionHeader = styled.h3`
    font-size: 20px;
    margin: 10px 0;
    padding: 0 10px;
    
`

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 7px 0;
    cursor: pointer;
    padding: 10px 10px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #333333;
    }
`

const OptionsSidebar = () => {
    
    const Menu: object[] = [
        {
            name: 'Home',
            icon: <AiTwotoneHome size={24} />,
            path: '/'
        },
        {
            name: 'Library',
            icon: <BiLibrary size={24} />,
            path: '/library'
        },
        {
            name: 'Artists',
            icon: <BiHeadphone size={24} />,
            path: '/artists'
        },
        {
            name: 'Podcasts',
            icon: <BiPodcast size={24} />,
            path: '/podcasts'
        }

    ]

    const Library: object[] = [{
        name: 'Liked Albums',
        icon: <IoIosAlbums size={24} />,
        path: '/liked-albums'
    },
    {
        name: 'Liked Songs',
        icon: <GiLoveSong size={24} />,
        path: '/liked-songs'
    }
    ]

    return (
        <Container>
            <LogoContainer>
                <BsMusicNoteList className = {
                    css`
                        color: #29d657;
                    `
                } size={28} />
                <LogoText>Vibes.</LogoText>
            </LogoContainer>

            {
                Menu.map((item: any, index: number) => {
                    return (
                        <ItemContainer key={index}>
                            {item.icon}
                            <span style={{ marginLeft: '10px' }}>{item.name}</span>
                        </ItemContainer>
                    )
                })
            }

            <SectionHeader>Library</SectionHeader>
            {
                Library.map((item: any, index: number) => {
                    return (
                        <ItemContainer key={index}>
                            {item.icon}
                            <span style={{ marginLeft: '10px' }}>{item.name}</span>
                        </ItemContainer>
                    )
                })
            }

        </Container>
    )
}

export default OptionsSidebar