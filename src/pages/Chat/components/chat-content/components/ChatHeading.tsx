import { Avatar, Typography } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline, IoVideocamOutline } from 'react-icons/io5'
import { MdOutlineLocalPhone } from 'react-icons/md'

const ChatHeading = () => {
    return (
        <div className='flex gap-4 p-4 pb-6 border-b justify-between'>
            <div className='flex gap-4 flex-1'>
                <Avatar src={"https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg"} size='large' shape='circle' />
                <div className='flex flex-col gap-0'>
                    <Typography.Text className='font-medium'>Văn Thương Đào</Typography.Text>
                    <p className='font-normal text-slate-500 text-lg'>Frontend Developer</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <MdOutlineLocalPhone className='cursor-pointer'  size={25}/>
                <IoVideocamOutline className='cursor-pointer'  size={25}/>
                <IoSearchOutline className='cursor-pointer'  size={25}/>
                <BsThreeDotsVertical className='cursor-pointer'  size={25}/>
            </div>
        </div>
    )
}

export default ChatHeading