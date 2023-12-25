import { ConversationItem } from '@/components/app'
import { Typography } from 'antd'
import React from 'react'

const ListConversation = () => {
  return (
    <div className='p-4 flex flex-1 h-full flex-col overflow-y-scroll '>
        <Typography.Title level={5} >Chats</Typography.Title>
        <div className='flex flex-col gap-2'>
            <ConversationItem />
            <ConversationItem active />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
        </div>
    </div>
  )
}

export default ListConversation