import { Card, Typography } from 'antd'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

const EmptyChat = () => {
    return (
        <div className='w-full h-full flex items-center justify-center bg-background'>
            <div className='flex flex-col gap-4 items-center'>

                <Card bordered={false} className='rounded-full w-[80px] h-[80px] flex items-center justify-center'>
                    <IoChatbubbleEllipsesOutline size={40} />
                </Card>
                <Card bordered={false} className='rounded-full px-12 p-0 h-16 flex items-center justify-center'>

                    <Typography.Text>Start Conversation</Typography.Text>
                </Card>
            </div>
        </div>
    )
}

export default EmptyChat