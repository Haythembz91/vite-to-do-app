import ProgressBar from './ProgressBar.jsx'
import TickIcon from './TickIcon.jsx'
import styled from "styled-components";
import {ButtonContainer} from './ListHeader.jsx'
import {useState} from "react";
import Modal from './Modal.jsx'



const EditButton = styled.button`
    border: 1.5px solid rgb(141,181,145);
    color: rgb(141,181,145);
    &:hover{
        background-color: rgb(182,223,186);
    }
    &:active{
        color: white;
        background-color:rgb(141,181,145) ;
    }
`
const DeleteButton=styled.button`
    border: 1.5px solid rgb(255,175,163);
    color: rgb(255,175,163);
    &:hover{
        background-color: rgb(255,201,193);
    }
    &:active{
        background-color:rgb(255,175,163) ;
        color: white;
    }
`
const TaskItem=styled.li`
    width: 100%;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.08) 0 0 0 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const TaskTitle=styled.p``


const ListItem = ({task,getData})=>{

    const deleteTask = async ()=>{

        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},

            })
            if(response.status===200){
                console.log('Deleted')
                getData()
            }
        }catch(err){
            console.log(err)
        }

    }




    const [showModal,setShowModal]=useState(false)
    return(
        <TaskItem>
            <InfoContainer>
                <TickIcon></TickIcon>
                <TaskTitle>
                    {task.title}
                </TaskTitle>
            </InfoContainer>
            <ProgressBar progress={task.progress}></ProgressBar>
            <ButtonContainer>
                <EditButton onClick={()=>setShowModal(true)}>EDIT</EditButton>
                <DeleteButton onClick={deleteTask}>DELETE</DeleteButton>
            </ButtonContainer>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}></Modal>}
        </TaskItem>
    )
}

export default ListItem