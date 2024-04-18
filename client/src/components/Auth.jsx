import { useState } from 'react'
import styled from 'styled-components'
import {FormContainer} from './Modal.jsx'
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
    const viewLogin = (status)=>{
        setError(null)
        setIsLogIn(status)
    }

    return(
        <AuthContainer>
            <AuthContainerBox>
                <form action="">
                    <h2>{isLogIn?'Login':'Sign Up'}</h2>
                    <input required={true} type="email" placeholder='email' />
                    <input required={true} type="password" placeholder='password' />
                    {!isLogIn && <input type="password" placeholder='confirm password' />}
                    <input required={true} type="submit" value={isLogIn?'Login':'Sign Up'} />
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