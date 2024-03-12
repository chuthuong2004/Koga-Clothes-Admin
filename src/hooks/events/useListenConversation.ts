import { socketServices } from '@/services';
import {StoreMessage} from '@/types/entities';
import {useEffect} from 'react';
import {useSWRConfig} from 'swr';

/**
 * This hook will listen for incoming message events, then update the conversation with the key passed in, the key is a key of fetch SWR
 * @param key string key of fetch data conversation
 */
export function useListenConversation(key: string) {
  const {mutate} = useSWRConfig();
  useEffect(() => {
    const onMessage = (message: StoreMessage) => {
      console.log('ATT: ', message._id);
      mutate(key);
    };
    const onJoinedConversation = () => {
      console.log('JOINNNNNNNNNNNNNNNNNNNNN');

      mutate(key);
    };

    socketServices.listen('emit-create-message', onMessage);
    socketServices.listen('emit-joined-conversation', onJoinedConversation);
    return () => {
      socketServices.off('emit-create-message', onMessage);
      socketServices.off('emit-joined-conversation', onJoinedConversation);
    };
  }, [key, mutate]);
}
