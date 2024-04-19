
import React, {useState} from "react";
import styled from "styled-components";
import Modal from './Modal.jsx'
import {useCookies} from "react-cookie";


const HeaderItem = styled.h1`
`
const Header = styled.div`
    display:flex;
    justify-content: space-between;
    border-bottom: rgba(0,0,0,0.05) 1px solid;
`
export const ButtonContainer = styled.div`
    display:flex;
    align-items: center;
    button{
        border-radius: 12px;
        margin: 0 5px;
        padding: 5px 10px;
        font-size: 10px;
        background-color: transparent;
    }
`
const AddButton = styled.button`
    border: 1.5px solid rgb(108,115,148);
    color:rgb(108,115,148);
    &:hover{
        background-color: rgb(131,138,172);
    }
    &:active{
        background-color:rgb(108,115,148) ;
        color: white;
    }
`
const SignOutButton = styled.button`
    border: 1.5px solid rgb(255,175,163);
    background-color:rgb(255,175,163)!important;
    color:rgb(234,234,234);
    &:hover{
        background-color: rgb(175,94,94);
        border: 1.5px solid rgb(175,94,94);
    }
    &:active{
        background-color:rgb(175,81,81)!important; ;
        border: 1.5px solid rgb(175,81,81);
        color: white;
    }  
`


const ListHeader = ({listName,getData})=>{

    const [cookies,setCookie,removeCookie] = useCookies(null)
    const [showModal,setShowModal]=useState(false)
    const mode = 'create'
    const email = cookies.Email
    const handleSignOut =()=>{
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }
    const handleDelete =async()=>{
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/delete`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email})
        })
        if(response.status===200){
            removeCookie('Email')
            removeCookie('AuthToken')
            window.location.reload()
        }
        
    }
    return(
        <Header>
            <HeaderItem>{listName}</HeaderItem>
            <ButtonContainer>
                <AddButton onClick={()=>setShowModal(true)}>ADD NEW</AddButton>
                <SignOutButton onClick={()=>handleSignOut()}>SIGN OUT</SignOutButton>
            </ButtonContainer>
            {showModal && <Modal mode={mode} setShowModal={setShowModal} getData={getData}></Modal>}
            <div style={{fontSize:'14px',position:"absolute",top:0,right:0,margin:'10px'}}>Welcome: <b>{cookies.Email}</b>
                <div>
                    <button onClick={handleDelete}>Delete account</button>
                </div>
            </div>
        </Header>
    )
}

export default ListHeader