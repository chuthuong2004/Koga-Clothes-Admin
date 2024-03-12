import { selectChat } from '@/store/selectors'
import { useAppSelector } from '@/types/commons'
import { StoreUser } from '@/types/entities'
import { cn, getFirstLetter } from '@/utils'
import { Avatar } from 'antd'
import {PulseLoader} from 'react-spinners';

type MessageProps = {
    user?: StoreUser
}
const MessageLoading = ({ user }: MessageProps) => {
    const { colorUser: receiverBgColor } = useAppSelector(selectChat)
    return (
        <div className={cn('flex flex-col', 'justify-start')}>
            <div className={cn('flex gap-4',)}>

                <Avatar style={{ backgroundColor: receiverBgColor }} size='large' shape='circle' >{getFirstLetter(user?.firstName + ' ' + user?.lastName)}</Avatar>
                <div className={cn('w-[70%] flex flex-col gap-2', 'items-start')}>
                    <div className={cn('bg-card flex shadow-card rounded-xl p-4 ', 'rounded-ss-none')}>
                        <PulseLoader color="#2e2e2e" size={10} />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default MessageLoading