import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { IoImageOutline } from 'react-icons/io5'

const ChatBottom = () => {
  return (
    <div className='p-4 bg-background'>
      <div className='bg-card rounded-xl p-8 flex gap-4'>
        <Input size="large" placeholder='Type your message...' className='border-none focus:border-card focus:outline-none focus:shadow-none' />
        <div className='flex gap-4 items-center'>
          <div>
            <IoImageOutline size={25} />
          </div>
          <Button size="large" type="primary" className='flex items-center justify-center'>
            <SendOutlined rev size={40} />
          </Button>
        </div>
      </div>
    </div >
  )
}

export default ChatBottom