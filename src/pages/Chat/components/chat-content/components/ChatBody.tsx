import { Message } from '@/components/app'
import React from 'react'

const ChatBody = () => {
  return (
    <div className='p-4 bg-background flex-1 overflow-y-scroll'>

      <div className='flex flex-col gap-4 py-12'>
        <Message />
        <Message />
        <Message own/>
        <Message own />
        <Message />
        <Message />
        <Message own />
        <Message />
      </div>
    </div>
  )
}

export default ChatBody