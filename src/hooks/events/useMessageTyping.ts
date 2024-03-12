import { socketServices } from '@/services';
import { ResponseTyping } from '@/services/types';
import {useCallback, useEffect, useRef, useState} from 'react';

/**
 * @remarks This hook will listen typing message => return object
 * @param conversationId The ID of conversation
 * @return {object} The object containing
 *  @property {boolean} loadingMessage: true if receiver is typing
 *  @property {function} handleTypingOn: This function to handle typing on
 *  @property {function} handleTypingOff: This function to handle typing off
 */
export function useMessageTyping(conversationId: string) {
  const [loadingMessage, setLoadingMessage] = useState<
    Array<ResponseTyping & {loading: boolean}>
  >([]);
  const loadingRef = useRef<ResponseTyping | null>(null);

  useEffect(() => {
    const onTyping = (response: ResponseTyping) => {
      if (conversationId === response.conversationId) {
        if (loadingRef.current?.userId === response.userId) {
          return;
        } else {
          setLoadingMessage(prev => {
            if (prev.find(loading => loading.userId === response.userId)) {
              return prev;
            }
            return [
              ...prev,
              {
                loading: true,
                ...response,
              },
            ];
          });
          loadingRef.current = response;
          return;
        }
      }
    };
    const offTyping = (response: ResponseTyping) => {
      if (response.conversationId === conversationId) {
        setLoadingMessage(prev => {
          if (prev.find(loading => loading.userId === response.userId)) {
            return prev.filter(loading => loading.userId !== response.userId);
          }
          return prev;
        });
        if (
          loadingRef.current &&
          loadingRef.current.userId === response.userId
        ) {
          loadingRef.current = null;
        }
      }
    };
    socketServices.listen('emit-typing-on', onTyping);
    socketServices.listen('emit-typing-off', offTyping);
    return () => {
      socketServices.off('emit-typing-on', onTyping);
      socketServices.off('emit-typing-off', offTyping);
    };
  }, [conversationId]);

  const handleTypingOn = useCallback(() => {
    socketServices.emit('typing-on');
  }, []);
  const handleTypingOff = useCallback(() => {
    socketServices.emit('typing-off');
  }, []);
  return {
    loadingMessage,
    handleTypingOn,
    handleTypingOff,
  };
}
