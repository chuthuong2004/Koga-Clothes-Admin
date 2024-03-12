import { toggleSidebar } from '@/store/actions'
import { selectAuth } from '@/store/selectors'
import { useAppDispatch, useAppSelector } from '@/types/commons'
import { getFirstLetter } from '@/utils'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import React, { memo } from 'react'
import { MdClose } from 'react-icons/md'


const TopHeader = () => {
    const dispatch = useAppDispatch()
    const { colorUser, user } = useAppSelector(selectAuth)
    const isTablet = useMediaQuery("(max-width: 48rem)")

    const handleSidebar = () => dispatch(toggleSidebar())

    return (
        <div className='flex gap-4 p-4 pb-6 border-b'>
            <Avatar style={{ backgroundColor: colorUser }} size='large' shape='circle' >{getFirstLetter(user?.firstName + ' ' + user?.lastName)}</Avatar>

            <div className='flex-1 flex gap-4 items-center'>

                <Input size="large" className='rounded-full' prefix={<SearchOutlined rev size={20} />} placeholder='Search...' />
                {isTablet &&
                    <MdClose onClick={handleSidebar} size={25} className='cursor-pointer' />
                }

            </div>
        </div>
    )
}

export default memo(TopHeader)