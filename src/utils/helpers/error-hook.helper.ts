import { ErrCallbackType } from '@/hooks/types';
import axios from 'axios';

export function handleErrorHooks(err: unknown, cb?: ErrCallbackType) {
  if (axios.isAxiosError(err) && err.response) {
    if (cb) {
      console.log(err);

      cb(err.response.data);
    }
  }
}
