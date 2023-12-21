import { setSelectedConversation } from '@/store/actions';
import { selectAuth, selectChat } from '@/store/selectors';
import { useAppDispatch, useAppSelector } from '@/types/commons';
import { StoreConversation } from '@/types/entities';
import { cn, getFirstLetter, randomBgAvatar } from '@/utils'
import { Avatar, Typography } from 'antd'
import React, { memo, useMemo } from 'react'

type ConversationItemProps = {
  conversation: StoreConversation
}
const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)
  const { selectedConversation, colorUser } = useAppSelector(selectChat)
  const receiver = useMemo(() => {
    return conversation.members.filter(member => member.userId._id !== user?._id)[0]?.userId
  }, [conversation, user])

  const handleJoinConversation = () => {
    if (selectedConversation?._id === conversation._id) return
    dispatch(setSelectedConversation(conversation))

  }
  const activeChat = selectedConversation && conversation._id === selectedConversation._id

  return (
    <div onClick={handleJoinConversation} className={cn('flex gap-2 items-center rounded-md   p-2 cursor-pointer', activeChat ? 'bg-primary-gradient' : 'hover:bg-slate-100')}>
      <Avatar style={{ backgroundColor: selectedConversation?._id === conversation._id ? colorUser : randomBgAvatar() }} size='large' shape='circle' >{getFirstLetter(receiver?.firstName + ' ' + receiver?.lastName)}</Avatar>
      <div className='flex-1'>
        <div className='flex gap-4'>
          <Typography.Text className={cn('font-medium flex-1', activeChat && 'text-white')}>{receiver.firstName + ' ' + receiver.lastName}</Typography.Text>
          <Typography.Text className={cn('text-base', activeChat && 'text-slate-200')}>20/12</Typography.Text>
        </div>
        {conversation.lastMessage && (

          <div>
            <Typography.Text className={cn('text-slate-500', activeChat && 'text-slate-200')}>{conversation.lastMessage.text}</Typography.Text>
          </div>
        )}

      </div>
    </div>
  )
}

export default memo(ConversationItem)