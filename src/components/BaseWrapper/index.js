import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'

const BaseWrapper = ({children, history:{push}, location:{pathname, search}}) => {
    const handleLogout = (event) => {
        const ENDPOINT = 'localhost:8080'
        const query = search
        const queryStrings = queryString.parse(query)
        const socket = io(ENDPOINT)
        socket.emit('leave', queryStrings, (err) => {
            if(err) {//fake session checker
                alert(err.message)
                return
            }
            push('/')
        })
    }
    return(
        <div className="chat-container">
            <div className="text-container">
                    <span className="header-title">Chat app</span>
                    {pathname !== '/' && (
                        <div className="btn logout" onClick={(e)=>{handleLogout(e)}}>
                            Log out
                        </div>
                    )}
            </div>
            {children}
        </div>
    )
}

export default withRouter(BaseWrapper)