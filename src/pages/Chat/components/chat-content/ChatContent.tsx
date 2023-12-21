import React from 'react'
import { ChatHeading, ChatBody, ChatBottom, EmptyChat } from './components'
import { useAppSelector } from '@/types/commons'
import { selectChat } from '@/store/selectors'

const ChatContent = () => {
    const { selectedConversation } = useAppSelector(selectChat)
    return (
        <div className='flex-4 h-full'>
            {selectedConversation ? <div className='flex flex-col h-full'>
                <ChatHeading />
                <ChatBody />
                <ChatBottom />
            </div> : <EmptyChat />
            }

        </div>
    )
}

export default ChatContent