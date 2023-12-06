import { useCallback, useState } from 'react';

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
  return {handleFavorite, isLoading}
}
