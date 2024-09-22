import { useState } from 'react'
import styled from 'styled-components'
import {FormContainer} from './Modal.jsx'
import {useCookies} from "react-cookie";


const AuthContainer = styled.div`
    dispay: flex;
    justify-content: center;
    margin: 50px;
`
const AuthContainerBox = styled(FormContainer)`
    box-shadow:rgba(0,0,0,0.08) 0 6px 24px ,rgba(0,0,0,0.08) 0 0 0 1px;
    border-radius: 10px;
    overflow: hidden;
  
    form{
        display:flex;
        flex-direction:column;
        padding:20px;
      input[type='submit']{
        margin: auto;
      }
    }
`
const AuthOptions=styled.div`
  display: flex;
  button{
    width: 50%;
    border: none;
    padding: 10px;
    color:rgb(35,38,47)
  }
`


const Auth = ()=>{
    const [isLogIn,setIsLogIn]=useState(false)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)
    const [error,setError]=useState(null)
    const [cookies,setCookie,removeCookie] = useCookies(null)

    const viewLogin = (status)=>{
        setError(null)
        setIsLogIn(status)
    }
    const handleSubmit = async (e,endpoint)=>{
        e.preventDefault()
        if(!isLogIn && password!==confirmPassword){
            setError("Passwords don't match")
            return
        }
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const data = await response.json()
        
        if(data.detail){
            setError(data.detail)
        }else{
            setCookie('Email',data.email)
            setCookie('AuthToken',data.token)
            window.location.reload()
        }
    }

    return(
        <AuthContainer>
            <AuthContainerBox>
                <form action="">
                    <h2>{isLogIn?'Login':'Sign Up'}</h2>
                    <input required={true} type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
                    <input required={true} type="password" placeholder='password' onChange={e=>setPassword(e.target.value)} />
                    {!isLogIn && <input type="password" placeholder='confirm password' onChange={e=>setConfirmPassword(e.target.value)} />}
                    <input type="submit" value={isLogIn?'Login':'Sign Up'} onClick={(e)=>handleSubmit(e,isLogIn?'login':'signup')} />
                    {error && <p>{error}</p>}
                </form>
                <AuthOptions>
                <button style={isLogIn?{backgroundColor:'grey'}:{}} onClick={()=>viewLogin(true)}>Login</button>
                <button style={!isLogIn?{backgroundColor:'grey'}:{}} onClick={()=>viewLogin(false)}>Sign Up</button>
                </AuthOptions>
            </AuthContainerBox>
        </AuthContainer>
    )
}

export default Auth