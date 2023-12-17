import React from 'react'
import { ChatHeading, ChatBody, ChatBottom } from './components'

const ChatContent = () => {
    return (
        <div className='flex-4 h-full'>
            {/* <EmptyChat /> */}
            <div className='flex flex-col h-full'>
                <ChatHeading />
                <ChatBody />
                <ChatBottom />
            </div>
        </div>
    )
}

export default ChatContent