import OptionsSidebar from "./components/Options"
import Songs from "./components/Songs"

import './App.css'

import styled from '@emotion/styled'
import { css } from "@emotion/css"

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
`

function App() {
  
  return (
    <Container>
      <OptionsSidebar />
      <div className={
        css`
          flex: 1;
        `
      }>
        <Songs />
      </div>
    </Container>   
  )
}

export default App
