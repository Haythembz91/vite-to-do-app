
import React, {useState} from "react";
import styled from "styled-components";
import Modal from './Modal.jsx'


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
const ListHeader = ({listName})=>{

    const [showModal,setShowModal]=useState(false)
    const mode = 'create'

    return(
        <Header>
            <HeaderItem>{listName}</HeaderItem>
            <ButtonContainer>
                <AddButton onClick={()=>setShowModal(true)}>ADD NEW</AddButton>
                <SignOutButton>SIGN OUT</SignOutButton>
            </ButtonContainer>
            {showModal && <Modal mode={mode} setShowModal={setShowModal}></Modal>}
        </Header>
    )
}

export default ListHeader