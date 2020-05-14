import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import axios from '../../utils/axios'
import Messeges from './Messages'
import BaseWrapper from '../BaseWrapper'
import './styles/index.css'

let socket
const ENDPOINT = 'localhost:8080'
const Chat = ({location, history:{push}}) => {
    const [cookie, setCookie, removeCookie] = useCookies([])
    const [userData, setUserData] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const query = location.search

    useEffect(()=> {
        if(cookie.session && !userData) {
            getUserSession(cookie.session)
        }
        if(!cookie.session) {
            push('/')
        }
    },[cookie])
    
    useEffect(() => {
        if(userData) {
            socket = io(ENDPOINT)
            socket.emit('join', userData, (err) => {
                if(err) {
                    alert(err.message)
                    removeCookie('session')
                    push('/')
                }
            })
            getRoomMessages()
        }
    },[ENDPOINT,query, userData])

    useEffect(()=> {
        if(userData) {
            socket.on('message', (message) => {
                setMessages([...messages, message ])
            })
        }
    },[messages, userData])

    const getRoomMessages = async() => {
        try{
            const roomMessages = await axios({
                method:'get',
                url:`room/messages/static`,
            })
            if(roomMessages.status === 200) {
                setMessages([...messages, ...roomMessages.data.messages ])
            }
        } catch (err) {
            alert('Network error')
        }
    }

    const getUserSession = async(id) => {
        try {
            const sessionData = await axios({
                method:'get',
                url:`session/${id}`,
            })
            if(sessionData.status === 200) {
                setUserData(sessionData.data[0].user)
            } else {
                alert('Invalid Login') 
                push('/')
            }
        } catch(err) {
            alert('Network error') 
        }
    }

    const sendMessage = (event) => {
        event.preventDefault()
        if(message.match(/^ *$/) === null) {
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
        <BaseWrapper key="chat">
                <Messeges messages={messages} user={userData}/>
                <div className="text-container chat">
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