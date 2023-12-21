import { selectAuth, selectChat } from '@/store/selectors'
import { useAppSelector } from '@/types/commons'
import { getFirstLetter } from '@/utils'
import { Avatar, Typography } from 'antd'
import { memo, useMemo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline, IoVideocamOutline } from 'react-icons/io5'
import { MdOutlineLocalPhone } from 'react-icons/md'

const ChatHeading = () => {
    const { selectedConversation, colorUser } = useAppSelector(selectChat)
    const { user } = useAppSelector(selectAuth)
    const receiver = useMemo(() => {
        return selectedConversation?.members.filter(member => member.userId._id !== user?._id)[0].userId
    }, [selectedConversation, user])
    return (
        <div className='flex gap-4 p-4 pb-6 border-b justify-between'>
            <div className='flex gap-4 flex-1'>
                <Avatar style={{ backgroundColor: colorUser }} size='large' shape='circle' >{getFirstLetter(receiver?.firstName + ' ' + receiver?.lastName)}</Avatar>
                <div className='flex flex-col gap-0'>
                    <Typography.Text className='font-medium'>{receiver?.firstName + ' ' + receiver?.lastName}</Typography.Text>
                    <p className='font-normal text-slate-500 text-lg'>Frontend Developer</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <MdOutlineLocalPhone className='cursor-pointer' size={25} />
                <IoVideocamOutline className='cursor-pointer' size={25} />
                <IoSearchOutline className='cursor-pointer' size={25} />
                <BsThreeDotsVertical className='cursor-pointer' size={25} />
            </div>
        </div>
    )
}

export default memo(ChatHeading)