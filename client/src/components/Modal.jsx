import styled from "styled-components";
import {useState} from "react";
import {useCookies} from "react-cookie";

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalBox = styled.div`
    background-color: white;
    width: 40%;
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.05) 0 6px 24px 0,rgba(0,0,0,0.08) 0 0 0 1px;
`
const Title=styled.h3``
const CloseButton=styled.button`
    border: none;
    background-color: transparent;
    &:hover{
        color: rgb(255,50,50);
    }

`
const FormTitleContainer=styled.div`
    display: flex;
    justify-content: space-between;
`
export const FormContainer=styled.div`
    display: flex;
    flex-direction: column;    
    label{
        font-size: 13px;
    }
    input{
        margin: 10px 0;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1.5px solid rgb(230,232,236);
    }
    input[type='submit']{
        margin: auto;
    }
`


const Modal = ({mode,setShowModal,task,getData})=>{

    const [cookies,setCookies,removeCookies]=useCookies(null)
    const editMode = mode==='edit'
    const [data,setData]=useState({
        user_email:editMode? task.user_email:cookies.Email,
        title:editMode? task.title:'',
        id:'',
        date:editMode?task.date:new Date(),
        progress:editMode? task.progress:0
    })
    const postData = async (e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status===200){
                console.log('Added')
                setShowModal(false)
                getData()
            }
        }catch(err){
            console.error(err)
        }
    }
    const editData = async (e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status===200){
                console.log('Edited')
                setShowModal(false)
                getData()
            }

        }catch(err){
            console.error(err)
        }
    }


    const handleChange=(e)=>{
        const {name,value}=e.target
        setData(d=>({
            ...d,
            [name]:value
        }))
    }
    return(
        <Overlay>
            <ModalBox>
                <FormTitleContainer>
                    <Title>Lets {mode} your task</Title>
                    <CloseButton onClick={()=>setShowModal(false)}>X</CloseButton>
                </FormTitleContainer>
                <FormContainer>
                    <input required maxLength={30} type={"text"} placeholder={'Your task goes here'} name={'title'} onChange={handleChange} value={data.title}></input>
                    <label htmlFor={'range'}>Drag to select your current progress</label>
                    <input type={"range"} id={'range'} min={0} max={100} name={'progress'} step={1} required={true} value={data.progress}  onChange={handleChange} />
                    <input type={"submit"} value={mode==='create'?'ADD TASK':'EDIT TASK'} onClick={mode==='create'?postData:editData}/>
                </FormContainer>
            </ModalBox>
        </Overlay>
    )
}

export default Modal