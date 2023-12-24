import { Message, MessageLoading } from '@/components/app';
import { useListenMessage, useMessageTyping } from '@/hooks/events';
import { usePagination } from '@/hooks/helpers';
import { messageService } from '@/services';
import { QueryOptions } from '@/services/types';
import { selectAuth, selectChat } from '@/store/selectors';
import { useAppSelector } from '@/types/commons';
import { formatDateTimeMessage } from '@/utils';
import { Typography } from 'antd';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { memo, useCallback, useEffect, useRef } from 'react';

const ChatBody = () => {
  const { selectedConversation } = useAppSelector(selectChat);
  const { user } = useAppSelector(selectAuth);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const containerMessageRef = useRef<HTMLDivElement>(null);
  const { loadingMessage } = useMessageTyping(selectedConversation?._id || '');
  const callback = useCallback(
    (query: QueryOptions) =>
      messageService.getMessagesFromConversation(selectedConversation?._id || '', query),
    [selectedConversation?._id],
  );
  const { data, loadMore } = usePagination(
    `ListMessage${selectedConversation?._id}`,
    {
      page: 1,
      limit: 10,
      offset: 0,
    },
    callback,
    true,
  );
  useListenMessage(`ListMessage${selectedConversation?._id}`, selectedConversation?._id || '');
  console.log('messages: ', data, `ListMessage${selectedConversation?._id}`);

  const { scrollY } = useScroll({
    container: chatContainerRef,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('Page scroll: ', latest);
    if (latest === 0) {
      scrollY.set(200);
      loadMore();
    }
  });

  useEffect(() => {
    if (data && data.docs.length > 0) {
      if (data.offset > 15) {
        chatContainerRef.current?.scrollTo({ top: 500, behavior: 'smooth' });
        containerMessageRef.current?.scrollTo({ top: 500, behavior: 'smooth' });
      } else {
        containerMessageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }, [data]);
  return (
    <div ref={chatContainerRef} className="p-4 bg-background flex-1 overflow-y-scroll">
      <div ref={containerMessageRef} className="flex flex-col gap-4 py-12">
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
              ? currentMessageCreated.getTime() - prevMessageCreated.getTime() > 10 * 60000
              : false; // ** 10 minutes

            return condition ? (
              <Typography.Text className="text-center text-slate-500 text-base">
                {formatDateTimeMessage(new Date(message.createdAt), 'vi')}
              </Typography.Text>
            ) : null;
          };
          return (
            <>
              {data && data.docs.length > 0 && index > 0 && renderTimeMessage()}
              <Message message={message} own={message.sender._id === user?._id} key={message._id} />
              {data &&
                index === data.docs.length - 1 &&
                loadingMessage.map(loading => {
                  if (loading.conversationId === selectedConversation?._id && loading.userId !== user?._id) {
                    return (
                      <MessageLoading user={message.conversation.members.find(item => item.userId._id === loading.userId)?.userId} />
                    )
                  }
                  return null
                })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ChatBody);
