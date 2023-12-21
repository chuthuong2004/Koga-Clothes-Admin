import { socketServices } from '@/services';
import { ResponsePaginate } from '@/types/commons';
import {StoreMessage} from '@/types/entities';
import {useEffect} from 'react';
import {useSWRConfig} from 'swr';
/**
 * @remarks This hook will listen informed messages => update message with key of SWR
 * @param key The key of fetcher conversation
 * @param conversationId The ID of conversation
 */
export function useListenMessage(key: string, conversationId: string) {
  const {mutate} = useSWRConfig();
  useEffect(() => {
    socketServices.emit('join-conversation', {
      conversation_id: conversationId,
    });
  }, [conversationId]);
  useEffect(() => {
    const onMessage = async (message: StoreMessage) => {
      console.log('MESSAGE: ', message);
      if (conversationId !== message.conversation._id) {
        return;
      }
      mutate(
        key,
        (prevData: ResponsePaginate<StoreMessage> | undefined) => {
          if (!prevData) {
            return undefined;
          }
          return {
            ...prevData,
            docs: [...prevData.docs, message],
            totalDocs: prevData.totalDocs + 1,
          };
        },
        {revalidate: false},
      );
    };
    const onJoinConversation = (response: any) => {
      console.log('JOIN_CONVERSATION: ', response);
    };

    // const onReactionMessage = async (message: StoreMessage) => {
    //   console.log('REACT XONG: ', message.reactions);
    //   // TODO: Show notification
    //   mutate(
    //     key,
    //     (prevData: ResponsePagination<StoreMessage> | undefined) => {
    //       if (!prevData) {
    //         return undefined;
    //       }
    //       const messageReactIndex = prevData.docs.findIndex(
    //         item => item._id === message._id,
    //       );
    //       if (messageReactIndex !== -1) {
    //         console.log('VOO TReaction');
    //         // prevData.docs[messageReactIndex] = message;
    //         return {
    //           ...prevData,
    //           docs: [
    //             ...prevData.docs.slice(0, messageReactIndex),
    //             message,
    //             ...prevData.docs.slice(messageReactIndex + 1),
    //           ],
    //         };
    //       }
    //       return prevData;
    //     },
    //     {revalidate: false},
    //   );
    // };
    // const onPinMessage = async (message: StoreMessage) => {
    //   console.log('MESSAGE PIN: ', message);
    //   // TODO: Show notification
    //   // if (conversationId !== message.conversation_id._id) {
    //   //   return;
    //   // }
    //   mutate(
    //     key,
    //     (prevData: ResponsePagination<StoreMessage> | undefined) => {
    //       if (!prevData) {
    //         return undefined;
    //       }
    //       const messageReactIndex = prevData.docs.findIndex(
    //         item => item._id === message._id,
    //       );
    //       if (messageReactIndex !== -1) {
    //         console.log('PINNED');
    //         // prevData.docs[messageReactIndex] = message;
    //         return {
    //           ...prevData,
    //           docs: [
    //             ...prevData.docs.slice(0, messageReactIndex),
    //             message,
    //             ...prevData.docs.slice(messageReactIndex + 1),
    //           ],
    //         };
    //       }
    //       return prevData;
    //     },
    //     {revalidate: false},
    //   );
    // };
    // const onUnPinMessage = async (message: StoreMessage) => {
    //   console.log('MESSAGE UNPIN: ', message);
    //   // TODO: Show notification
    //   if (conversationId !== message.conversation_id._id) {
    //     return;
    //   }
    //   mutate(
    //     key,
    //     (prevData: ResponsePagination<StoreMessage> | undefined) => {
    //       if (!prevData) {
    //         return undefined;
    //       }
    //       return {
    //         ...prevData,
    //         docs: prevData.docs.filter(msg => msg._id !== message._id),
    //         totalDocs: prevData.totalDocs - 1,
    //       };
    //     },
    //     {revalidate: false},
    //   );
    // };

    socketServices.listen('emit-join-conversation', onJoinConversation);
    socketServices.listen('emit-create-message', onMessage);
    // socketServices.listen('emit-reaction-message', onReactionMessage);
    // socketServices.listen('emit-message-pin', onPinMessage);
    // socketServices.listen('emit-message-unpin', onUnPinMessage);
    return () => {
      socketServices.off('emit-create-message', onMessage);
    //   socketServices.off('emit-reaction-message', onReactionMessage);

    //   socketServices.off('emit-message-pin', onPinMessage);
    //   socketServices.off('emit-message-unpin', onUnPinMessage);
    };
  }, [key, mutate, conversationId]);
}
