import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import BaseWrapper from '../BaseWrapper'
import { useCookies } from 'react-cookie';
import axios from '../../utils/axios'
import './styles/index.css'
const initialState = {
    username:'',
    password:''
}

const Signin = ({history:{push}}) => {
    const [ cookies, setCookies, removeCookie ] = useCookies([]);
    const [state, setState] = useState(initialState)
    const {username, password} = state

    useEffect(() => {
        if(cookies.session) {
            push('/chat')
        }
    },[cookies])

    const handleOnChange = (event) => {
        const {name, value} = event.target
        setState({
            ...state,
            [name]:value
        })
    }
    
    const handleSignin = (e) => {
        if(username && password) {
            try {
                axios({
                    method:'post',
                    url:'login',
                    data:state
                }).then((res) => {
                    if(res.status === 200) {
                        setCookies('session',res._id)
                        push('/chat')
                    } else {
                        alert(res.message)
                    }
                }).catch(() => {
                    alert("Error") 
                })
            } catch(err) {
                alert("Error") 
            }
            return
        }
        return alert('All fields are required')
    }
    return (
        <BaseWrapper key="signin">
            <div className="join-outer-container">
                    <div>
                        <input placeholder="User name" className="input-msg form" type="text" onChange={(event)=>handleOnChange(event)}
                        name="username"required/>
                        <input placeholder="Password" className="input-msg form" type="password" onChange={(event)=>handleOnChange(event)}
                        name="password" required/>
                        <div className="btn form" onClick={(e)=>handleSignin(e)}>
                            Sign up / Sign in
                        </div>
                        <div className="policy">
                            <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by searching email address or phone number when provided.</p>
                        </div>
                    </div>
            </div>
        </BaseWrapper>
    )
}

export default withRouter(Signin)