import React, { memo } from 'react'
import TopHeader from './components/TopHeader'
import ListConversation from './components/ListConversation'


const ChatSidebar = () => {
  return (
    <div className='flex-1 flex flex-col w-full h-full'>
        <TopHeader/>
        <ListConversation />
    </div>
  )
}

export default memo(ChatSidebar)