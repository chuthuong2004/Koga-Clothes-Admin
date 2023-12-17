import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import React from 'react'

const TopHeader = () => {
    return (
        <div className='flex gap-4 p-4 pb-6 border-b'>
            <Avatar src={"https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg"} size='large' shape='circle' />
            <div className='flex-1'>

            <Input size="large" className='rounded-full'  prefix={<SearchOutlined rev size={20} />}  placeholder='Search...'/>
            </div>
        </div>
    )
}

export default TopHeader