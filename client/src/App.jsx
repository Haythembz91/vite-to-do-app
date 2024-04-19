
import ListHeader from "./components/ListHeader.jsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import ListItem from './components/ListItem.jsx'
import Auth from './components/Auth.jsx'
import {useCookies} from "react-cookie";

const Container = styled.div`
    background-color: white;
    box-shadow: rgba(0,0,0,0.05) 0 6px 24px, rgba(0,0,0,0.08) 0 0 0 1px;
    border-radius: 10px;
    padding: 10px;
    margin-top: 50px;
    width: 50%;
`


const App =()=>{
    const [cookies,setCookie,removeCookie] = useCookies(null)
    const userEmail=cookies.Email
    const [tasks,setTasks]=useState(null)
    const authToken = cookies.AuthToken
    const getData = async ()=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`)
            const json = await response.json()
            setTasks(json)
        }catch(err){console.error(err)}
    }

    useEffect(()=>{
        if (authToken){
            getData()
        }
    },[])


    const sortedTasks = tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))
    return(
        <Container>
            {authToken && <><ListHeader getData={getData} listName={'⛱️ Holiday Tick List'}></ListHeader>
            {sortedTasks?.map(task=><ol key={task.id}><ListItem getData={getData} key={task.id} task={task}></ListItem></ol>)}</>}
            {!authToken && <Auth></Auth>}
        </Container>
    )
}

export default App