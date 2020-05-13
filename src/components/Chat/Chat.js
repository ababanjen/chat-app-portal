import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import Messeges from './Messages'
import BaseWrapper from '../BaseWrapper'
import './styles/index.css'

const initialQueryValues = ({
    name:'',
    room:''
})
let socket
const ENDPOINT = 'localhost:8080'
const Chat = ({location, history:{push}}) => {
    const [values, setValues] = useState(initialQueryValues)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const query = location.search

    useEffect(() => {
        const queryStrings = queryString.parse(query)
        setValues({
            ...values,
            queryStrings
        })
        socket = io(ENDPOINT)
        socket.emit('join', queryStrings, (err) => {
            if(err) {//fake session checker
                alert(err.message)
                push('/')
            }
        })
    },[ENDPOINT,query])

    useEffect(()=> {
        socket.on('message', (message) => {
            setMessages([...messages, message ])
        })
    },[messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }
    const handleOnChange = event => {
        const {value} = event.target
        setMessage(value)
    }

    const handleOnKeypress = (event) => {
        if(event.key === 'Enter') sendMessage(event)
        return
    }
    
    return(
        <BaseWrapper>
                <Messeges messages={messages} user={queryString.parse(query)}/>
                <div className="text-container">
                    <input type="text" 
                    className="input-msg"
                    value={message} 
                    onChange={(e)=>handleOnChange(e)}
                    onKeyPress={(e)=>handleOnKeypress(e)}
                    placeholder="Start a new message"
                    />
                    <div className="btn send" onClick={(e)=>sendMessage(e)}>
                        send
                    </div>
                </div>
        </BaseWrapper>
    )
}

export default withRouter(Chat)