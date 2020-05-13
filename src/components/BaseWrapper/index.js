import React from 'react'
import { withRouter } from 'react-router-dom'

const BaseWrapper = ({children, history:{push}, location:{pathname}}) => {
    const handleLogout = (event) => {
        push('/')//fake logout
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