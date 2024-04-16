
import ListHeader from "./components/ListHeader.jsx";
import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    box-shadow: rgba(0,0,0,0.05) 0 6px 24px, rgba(0,0,0,0.08) 0 0 0 1px;
    border-radius: 10px;
    padding: 10px;
    margin-top: 50px;
    width: 50%;
`

console.log(new Date())
const App =()=>{
    return(
        <Container>
            <ListHeader listName={'⛱️ Holiday Tick List'}></ListHeader>
        </Container>
    )
}

export default App