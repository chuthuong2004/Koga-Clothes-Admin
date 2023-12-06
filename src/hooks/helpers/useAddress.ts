import { useCallback, useEffect, useState } from 'react';
import { KeyOfProvince, ParamAddress, StoreDistrict, StoreWard } from '@/types/entities';
import { useProvince } from './useProvince';

// ** Default Values
export const defaultValues: Record<KeyOfProvince, string> = {
  province: 'Select Province / City',
  district: 'Select District',
  ward: 'Select Ward / Commune',
};

/**
 *  This hook to handle address
 * @param {object} dataAddress Current address
 * @returns {object} Object contain value address
 *  @property {boolean} loading - True if data provinces is fetching
 *  @property {array} provinces - List data provinces
 *  @property {array} districts - List data districts
 *  @property {array} wards - List data wards
 *  @property {function} handleSelectProvince - This function handle select address
 *  @property {function} handleSelectType - This function handle select type
 *  @property {string} selectType - Value of "province" | "district" | "ward"
 *  @property {object} valueSelected - Address selected
 *  @property {function} handleSearch - This function to handle search address
 *  @property {string} searchValue - Search value
 *  @property {string} debounceValue - Value debounce of value search
 */
export function useAddress(dataAddress: ParamAddress) {
  // ** Province hooks
  const { provinces } = useProvince();

  const [districts, setDistricts] = useState<Array<StoreDistrict>>([]);

  const [wards, setWards] = useState<Array<StoreWard>>([]);
  // ** States
  const [valueSelected, setValueSelected] = useState<Record<KeyOfProvince, string>>(() =>
    dataAddress
      ? Object.values(dataAddress).every((item) => item.length > 0)
        ? dataAddress
        : defaultValues
      : defaultValues,
  );
  // ** Effect
  useEffect(() => {
    if (dataAddress && provinces.length > 0) {
      console.log(
        "data adđress: ", dataAddress
      );
      
      const dataDistricts: StoreDistrict[] =
        provinces.find((item) => item.name === dataAddress.province)?.districts || [];
      const dataWards: StoreWard[] =
        dataDistricts.find((item) => item.name.includes(dataAddress.district))?.wards || [];
        
      setDistricts(
        dataDistricts
          .map((item) => ({
            ...item,
            name:
              item.name.split(' ').length > 2 ? item.name.replace('Quận', '').trim() : item.name,
          }))
          .sort((a, b) => (a.name > b.name ? 1 : -1)),
      );
      setWards(dataWards.sort((a, b) => (a.name > b.name ? 1 : -1)));
    }
  }, [dataAddress, provinces]);

  // ** Handle select province
  const handleSelectProvince = useCallback(
    (value: string) => {
      setValueSelected({ ...defaultValues, province: value });
      setDistricts(
        provinces
          .find((item) => item.name === value)
          ?.districts.map((item) => ({
            ...item,
            name:
              item.name.split(' ').length > 2 ? item.name.replace('Quận', '').trim() : item.name,
          }))

          .sort((a, b) => (a.name > b.name ? 1 : -1)) || [],
      );
    },

    [provinces],
  );
  // ** Handle select province
  const handleSelectDistrict = useCallback(
    (value: string) => {
      setValueSelected((prev) => ({
        province: prev?.province ? prev.province : '',
        district: value,
        ward: defaultValues.ward,
      }));
      const district = districts.find((item) => item.name === value);
      if (district && district.wards.length > 0) {
        setWards(district.wards.sort((a, b) => (a.name > b.name ? 1 : -1)));
      }
    },

    [districts],
  );
  // ** Handle select province
  const handleSelectWard = useCallback(
    (value: string) => {
      setValueSelected((prev) => ({
        ...prev,
        ward: value,
      }));
    },

    [],
  );

  return {
    provinces,
    districts,
    wards,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
    valueSelected,
  };
}
