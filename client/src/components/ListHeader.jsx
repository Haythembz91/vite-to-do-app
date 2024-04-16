
import React from "react";
import styled from "styled-components";



const HeaderItem = styled.h1`
`
const Header = styled.div`
    display:flex;
    justify-content: space-between;
    border-bottom: rgba(0,0,0,0.05) 1px solid;
`
const ButtonContainer = styled.div`
    display:flex;
    align-items: center;
    button{
        border-radius: 12px;
        margin: 0 5px;
        padding: 5px 10px;
        background-color: transparent;
        font-size: 10px;
    }
`
const AddButton = styled.button`
    
    
`
const SignOutButton = styled.button`
    
`
const ListHeader = ({listName})=>{
    return(
        <Header>
            <HeaderItem>{listName}</HeaderItem>
            <ButtonContainer>
                <AddButton>ADD NEW</AddButton>
                <SignOutButton>SIGN OUT</SignOutButton>
            </ButtonContainer>
        </Header>
    )
}

export default ListHeader