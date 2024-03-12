import { ParamCreateProduct } from '@/services/types';
import { handleErrorHooks } from '@/utils';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { productService } from '@/services';
import { useSWRConfig } from 'swr';

export function useProduct() {
  const { mutate } = useSWRConfig();
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
    async (
      params: ParamCreateProduct,
      successCallback: () => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setIsLoading(true);
        const created = await productService.create(params);
        console.log('created: ', created);

        mutate('ListProducts');
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate],
  );
  const handleUpdateProduct = useCallback(
    async (
      id: string,
      params: ParamCreateProduct,
      successCallback: () => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setIsLoading(true);
        const created = await productService.update(id ,params);
        console.log('created: ', created);

        mutate('ListProducts');
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate],
  );
  const handleDeleteProduct = useCallback(
    async (id: string, successCallback: () => void, errCallback?: ErrCallbackType) => {
      try {
        setIsLoading(true);
        await productService.delete(id);
        mutate('ListProducts');
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate],
  );
  return {
    handleFavorite,
    isLoading,
    onCreateProduct: handleCreateProduct,
    onDeleteProduct: handleDeleteProduct,
    onUpdateProduct: handleUpdateProduct,
  };
}
