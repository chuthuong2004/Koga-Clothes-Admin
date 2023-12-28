import { BASE_URL } from '@/config'
import { selectAuth, selectChat } from '@/store/selectors'
import { useAppSelector } from '@/types/commons'
import { StoreMessage } from '@/types/entities'
import { cn, getFirstLetter } from '@/utils'
import { Avatar, Typography } from 'antd'
import moment from 'moment'
import React from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

type MessageProps = {
  own?: boolean;
  message: StoreMessage
}
const Message = ({ own, message }: MessageProps) => {
  const { user, colorUser } = useAppSelector(selectAuth)
  const { colorUser: receiverBgColor } = useAppSelector(selectChat)
  return (
    <div className={cn('flex flex-col', own ? 'justify-end' : 'justify-start')}>
      <div className={cn('flex gap-4', own && 'flex-row-reverse')}>

        <Avatar  style={{ backgroundColor: own ? colorUser : receiverBgColor }} size='large' shape='circle' src={BASE_URL + message.sender.avatar}>{getFirstLetter(message.sender?.firstName + ' ' + message.sender?.lastName)}</Avatar>
        <div className={cn('w-[70%] flex flex-col gap-2', own ? 'items-end' : 'items-start')}>
          <div className={cn('bg-card shadow-card rounded-xl p-4 ', own ? 'bg-primary-gradient rounded-tr-none' : 'rounded-ss-none')}>
            <Typography.Text className={cn(own && 'text-white')}>{message.text}</Typography.Text>
          </div>
          <div className='flex gap-2 items-center'>
            {own && <div>
              <IoCheckmarkDoneOutline size={16} className='text-slate-500' />
            </div>}

            <Typography.Text className='text-slate-500 text-lg mb-0'>{moment(new Date(message.createdAt).toUTCString()).format('LT')}</Typography.Text>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Message