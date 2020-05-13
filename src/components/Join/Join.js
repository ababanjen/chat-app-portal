import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import BaseWrapper from '../BaseWrapper'
import './styles/index.css'
const initialState = {
    name:'',
    password:''
}

const Join = ({history:{push}}) => {
    const [state, setState] = useState(initialState)
    const {name, password} = state

    const handleOnChange = (event) => {
        const {name, value} = event.target
        setState({
            ...state,
            [name]:value
        })
    }
    const handleSignin = (e) => {
        if(name && password) {
            push({
                pathname:'/chat',
                search:`?name=${name}&password=${password}`//fake session
            })
        }
        return
    }
    return (
        <BaseWrapper>
            <div className="join-outer-container">
                    <div>
                        <input placeholder="User name" className="input-msg form" type="text" onChange={(event)=>handleOnChange(event)}
                        name="name"></input>
                        <input placeholder="Password" className="input-msg form" type="password" onChange={(event)=>handleOnChange(event)}
                        name="password"></input>
                        <div className="btn form" onClick={(e)=>handleSignin(e)}>
                            Sign up / Sign in
                        </div>
                    </div>
            </div>
        </BaseWrapper>
    )
}

export default withRouter(Join)