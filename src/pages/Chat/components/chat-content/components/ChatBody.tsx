import { Message } from '@/components/app'
import { useListenMessage } from '@/hooks/events'
import { usePagination } from '@/hooks/helpers'
import { messageService } from '@/services'
import { QueryOptions } from '@/services/types'
import { selectAuth, selectChat } from '@/store/selectors'
import { useAppSelector } from '@/types/commons'
import { formatDateTimeMessage } from '@/utils'
import { Typography } from 'antd'
import { useCallback, useEffect, useRef } from 'react'

const ChatBody = () => {
  const { selectedConversation } = useAppSelector(selectChat)
  const { user } = useAppSelector(selectAuth)
  const callback = useCallback(
    (query: QueryOptions) => messageService.getMessagesFromConversation(selectedConversation?._id || "", query)
    , [selectedConversation?._id])
  const { data } = usePagination(`ListMessage${selectedConversation?._id}`, {
    page: 1,
    limit: 10,
    offset: 0
  }, callback, true)
  useListenMessage(`ListMessage${selectedConversation?._id}`, selectedConversation?._id || '')
  console.log("messages: ", data, `ListMessage${selectedConversation?._id}`);
  const chatContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (data && data.docs.length > 0) {
      chatContainerRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }, [data])
  return (
    <div className='p-4 bg-background flex-1 overflow-y-scroll'>

      <div ref={chatContainerRef} className='flex flex-col gap-4 py-12'>
        {data?.docs.map((message, index) => {
          const renderTimeMessage = () => {
            // ** Time created of previous message
            const prevMessageCreated =
              data && data.docs.length > 0
                ? new Date(data.docs[index > 0 ? index - 1 : 0].createdAt)
                : null;

            // ** Time created of current message
            const currentMessageCreated = new Date(message.createdAt);

            // ** check if current message & previous message aspart 10 minutes
            const condition = prevMessageCreated
              ? currentMessageCreated.getTime() - prevMessageCreated.getTime() >
              10 * 60000
              : false; // ** 10 minutes

            return condition ? (
              <Typography.Text className='text-center text-slate-500 text-base' >
                {formatDateTimeMessage(new Date(message.createdAt), 'vi')}
              </Typography.Text>
            ) : null;
          };
          return <>
            {data && data.docs.length > 0 && index > 0 && renderTimeMessage()}
            <Message message={message} own={message.sender._id === user?._id} key={message._id} />
          </>
        })}
      </div>
    </div>
  )
}

export default ChatBody