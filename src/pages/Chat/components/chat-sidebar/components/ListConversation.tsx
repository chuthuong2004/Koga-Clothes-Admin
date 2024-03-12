import { ConversationItem } from '@/components/app'
import { useListenConversation } from '@/hooks/events/useListenConversation'
import { usePagination } from '@/hooks/helpers'
import { conversationService } from '@/services'
import { selectAuth } from '@/store/selectors'
import { useAppSelector } from '@/types/commons'
import { Typography } from 'antd'
import { memo } from 'react'

const ListConversation = () => {
  const {user} = useAppSelector(selectAuth)
  const { data } = usePagination(`ListConversation${user?._id}`, {
    limit: 10,
    offset: 0,
    page: 1
  }, conversationService.getMyConversation)
  useListenConversation(`ListConversation${user?._id}`)
  console.log("data: ", data);

  return (
    <div className='p-4 flex flex-1 h-full flex-col overflow-y-scroll '>
      <Typography.Title level={5} >Chats</Typography.Title>
      <div className='flex flex-col gap-2'>
        {data?.docs.map((conversation) => (
          <ConversationItem conversation={conversation} key={conversation._id} />

        ))}
      </div>
    </div>
  )
}

export default memo(ListConversation)