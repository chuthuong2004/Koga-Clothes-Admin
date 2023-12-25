import { cn } from '@/utils'
import { Avatar, Typography } from 'antd'
import React from 'react'

type ConversationItemProps = {
  active?: boolean
}
const ConversationItem = ({ active }: ConversationItemProps) => {
  return (
    <div className={cn('flex gap-2 items-center rounded-md   p-2 cursor-pointer', active ? 'bg-primary-gradient' : 'hover:bg-slate-100')}>
      <Avatar src="https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg" shape='circle' size='large' />
      <div className='flex-1'>
        <div className='flex gap-4'>
          <Typography.Text className={cn('font-medium flex-1', active && 'text-white')}>Văn Thương Đào</Typography.Text>
          <Typography.Text className={cn('text-base', active && 'text-slate-200')}>20/12</Typography.Text>
        </div>
        <div>
          <Typography.Text className={cn('text-slate-500',  active && 'text-slate-200')}>Xin chào hello</Typography.Text>
        </div>

      </div>
    </div>
  )
}

export default ConversationItem