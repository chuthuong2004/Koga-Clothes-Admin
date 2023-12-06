import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axios';
import { StoreProvince } from '@/types/entities';
import useSWR from 'swr';
import axios from 'axios';

/**
 * @remarks This hook to fetch data provinces
 * @returns data of provinces
 * @property loading - True if hook is fetching data
 * @property provinces - List of data provinces
 */
export function useProvince() {
  // ** States
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<StoreProvince[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<StoreProvince[]>(
          'https://provinces.open-api.vn/api/?depth=3',
        );
        setProvinces(
          response.data 
            .map((item: any) => ({
              ...item,
              name: item.name.replace('Tỉnh', '').trim(),
            }))
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        );
        setLoading(false);
      } catch (error) {
        console.log('error: ', error);

        setLoading(false);
      }
    })();
  }, []);

  return { loading, provinces };
}
