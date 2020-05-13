import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Messages = ({messages, user}) => {
    const match = (s1,s2) => {
        if(s1 && s2)
        return s1.toLowerCase() === s2.toLowerCase()
    }
    return(
        <ScrollToBottom className="message-box-container">
            {messages.map((data,i) => {
                const isAdmin = data.user === 'admin'
                const isSender = match(data.user,user.name)
                const isSenderClass = isSender ? 'self' : 'friend'

                return(
                <>  
                    {
                        isAdmin ?
                            !match(data.name,user.name) && <div className={`text-msg-container admin`} key={i}>{data.text}</div>
                        :
                        <div class="row no-gutters" key={i}>
                            <div class="chat-bubble-container ">
                                <div class={`chat-bubble msg-${isSenderClass}`}>
                                    {data.text}
                                </div>
                                <p className={`user-name ${isSenderClass}`}>
                                    {isSender ? 'You': data.user}
                                </p>
                            </div>
                            <div className={`arrow ${isSenderClass}`}/>
                        </div>
                    }
                </>
                )}
            )}
        </ScrollToBottom>
    )
}

export default Messages