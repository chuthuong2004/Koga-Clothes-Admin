import { socketServices } from '@/services';
import { ParamCreateMessage } from '@/services/types';
import { useCallback } from 'react';

export function useMessage() {
  const handleSendMessage = useCallback((message: ParamCreateMessage) => {
    socketServices.emit('create-message', message);
  }, []);

  return {
    onSendMessage: handleSendMessage,
  };
}
