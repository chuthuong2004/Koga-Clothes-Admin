import { cn } from '@/utils'
import { Avatar, Typography } from 'antd'
import React from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

type MessageProps = {
  own?: boolean
}
const Message = ({ own }: MessageProps) => {
  return (
    <div className={cn('flex flex-col', own ? 'justify-end' : 'justify-start')}>
      <div className={cn('flex gap-4', own && 'flex-row-reverse')}>
        <Avatar src='https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg' size="large" shape='circle' />
        <div className={cn('w-[70%] flex flex-col gap-2', own && 'items-end')}>
          <div className={cn('bg-card shadow-card rounded-xl p-4 ', own ? 'bg-primary rounded-tr-none' : 'rounded-ss-none')}>
            <Typography.Text className={cn(own && 'text-white')}>Hey John, I am looking for the best admin template. Could you please help me to find it out?</Typography.Text>
          </div>
          <div className='flex gap-2 items-center'>
            {own && <div>
              <IoCheckmarkDoneOutline size={16} className='text-slate-500' />
            </div>}

            <Typography.Text className='text-slate-500 text-lg mb-0'>2:46 PM</Typography.Text>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Message