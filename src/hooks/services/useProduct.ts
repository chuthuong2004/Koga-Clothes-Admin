import { ParamCreateProduct } from '@/services/types';
import { handleErrorHooks } from '@/utils';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { productService } from '@/services';

export function useProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const handleFavorite = useCallback(async () => {
    try {
      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleCreateProduct = useCallback(
    async (params: ParamCreateProduct, successCallback: () => void, errCallback?: ErrCallbackType) => {
      try {
        setIsLoading(true);
        const created = await productService.create(params);
        console.log('created: ', created);
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );
  return { handleFavorite, isLoading, onCreateProduct: handleCreateProduct };
}
