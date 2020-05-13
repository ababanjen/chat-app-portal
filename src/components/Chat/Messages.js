import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Messages = ({messages, user}) => {
    const match = (s1,s2) => {
        if(s1 && s2)
        return s1.toLowerCase() === s2.toLowerCase()
    }
    return(
        <ScrollToBottom className="message-box-container" >
            {messages.map((data,i) => {
                const isAdmin = data.user === 'admin'
                const isSender = match(data.user,user.name)
                const isSenderClass = isSender ? 'self' : 'friend'
                return(
                <div key={`${data.id}${i}`}>  
                    {
                        isAdmin ?
                            !match(data.name,user.name) && <div className={`text-msg-container admin`} >{data.text}</div>
                        :
                        <div className="row no-gutters" >
                            <div className="chat-bubble-container ">
                                <div className={`chat-bubble msg-${isSenderClass}`}>
                                    {data.text}
                                </div>
                                <p className={`user-name ${isSenderClass}`}>
                                    {isSender ? 'You': data.user}
                                </p>
                            </div>
                            <div className={`arrow ${isSenderClass}`}/>
                        </div>
                    }
                </div>
                )}
            )}
        </ScrollToBottom>
    )
}

export default Messages