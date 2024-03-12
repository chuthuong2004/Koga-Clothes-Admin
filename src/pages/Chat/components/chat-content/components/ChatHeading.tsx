import { BASE_URL } from '@/config'
import { toggleSidebar } from '@/store/actions'
import { selectAuth, selectChat } from '@/store/selectors'
import { useAppDispatch, useAppSelector } from '@/types/commons'
import { getFirstLetter } from '@/utils'
import { Avatar, Typography } from 'antd'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { memo, useMemo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline, IoVideocamOutline } from 'react-icons/io5'
import { MdOutlineDehaze, MdOutlineLocalPhone } from 'react-icons/md'

const ChatHeading = () => {
    const dispatch = useAppDispatch()
    const isTablet = useMediaQuery("(max-width: 48rem)")

    const isMobile = useMediaQuery("(max-width: 445px)")
    const { selectedConversation, colorUser } = useAppSelector(selectChat)
    const { user } = useAppSelector(selectAuth)
    const receiver = useMemo(() => {
        return selectedConversation?.members.filter(member => member.userId?._id !== user?._id)[0].userId
    }, [selectedConversation, user])

    const handleSidebar = () => dispatch(toggleSidebar())
    return (
        <div className='flex gap-4 p-4 pb-6 border-b justify-between'>
            <div className='flex items-center gap-4'>
                {isTablet &&
                    <MdOutlineDehaze onClick={handleSidebar} size={25} className='cursor-pointer' />
                }
                <div className='flex gap-4 flex-1'>
                    <Avatar style={{ backgroundColor: colorUser }} size='large' shape='circle' src={BASE_URL + receiver?.avatar} >{getFirstLetter(receiver?.firstName + ' ' + receiver?.lastName)}</Avatar>
                    <div className='flex flex-col gap-0'>
                        <Typography.Text className='font-medium'>{receiver?.firstName + ' ' + receiver?.lastName}</Typography.Text>
                        <p className='font-normal text-slate-500 text-lg'>Frontend Developer</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                {!isMobile && (
                    <>
                        <MdOutlineLocalPhone className='cursor-pointer' size={25} />
                        <IoVideocamOutline className='cursor-pointer' size={25} />
                        <IoSearchOutline className='cursor-pointer' size={25} />
                    </>
                )}
                <BsThreeDotsVertical className='cursor-pointer' size={25} />
            </div>
        </div>
    )
}

export default memo(ChatHeading)