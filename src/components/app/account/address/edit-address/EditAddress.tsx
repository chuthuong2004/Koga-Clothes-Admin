import React, { useEffect, useState, memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import styles from './EditAddress.module.scss';
import { Button, Input, Select } from '@/components/shares';
import { StoreDistrict, StoreProvince, StoreUserAddress, StoreWard } from '@/types/entities';
import { Controller, useForm } from 'react-hook-form';
import { useAddress } from '@/hooks/helpers';
import { PATTERN_PHONE } from '@/utils';
import { useProfile } from '@/hooks/services';

const cx = classNames.bind(styles);

type FormUpdateAddress = Omit<StoreUserAddress, '_id'>

const defaultValues: FormUpdateAddress = {
  firstName: "",
  lastName: "",
  province: "",
  district: "",
  ward: "",
  specific: "",
  phone: "",
  isDefault: false,
}
type Props = {
  address?: StoreUserAddress;
  handleClosePopUp: () => void;
};
const EditAddress: React.FC<Props> = ({ address, handleClosePopUp }) => {
  const { districts, provinces, wards, handleSelectProvince, handleSelectDistrict, handleSelectWard } = useAddress(address ? address : null)
  const { handleAddAddress, loading, handleUpdateAddress } = useProfile()
  const { handleSubmit, formState: { errors }, control, reset } = useForm<FormUpdateAddress>({
    defaultValues
  })
  console.log("address: ", { districts, provinces, wards });
  useEffect(() => {
    if (address) {
      reset(address)
    }
  }, [address, reset])

  const onSubmit = (data: FormUpdateAddress) => {
    console.log(data);

    if (address) {
      // ** Update address
      handleUpdateAddress(address._id, data, () => {
        handleClosePopUp()
      }, ({ message }) => {
        toast.error(message)
      })
    } else {
      handleAddAddress(data, () => {
        handleClosePopUp()
      }, ({ message }) => {
        toast.error(message)
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='d-flex fd-column gap-1'>
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng nhập họ của bạn !'
          }
        }}
        render={({ field }) => <Input
          label="Họ"
          placeholder='Nhập họ của bạn'
          error={errors.firstName ? errors.firstName.message : ''}
          {...field}
        />}
      />


      <Controller
        control={control}
        name="lastName"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng nhập tên của bạn'
          }
        }}
        render={({ field }) => <Input
          label="Tên"
          placeholder='Nhập tên của bạn'
          error={errors.lastName ? errors.lastName.message : ''}
          {...field}
        />}
      />


      <Controller
        control={control}
        name="phone"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng nhập số điện thoại của bạn !'
          },
          pattern: {
            value: PATTERN_PHONE,
            message: 'Số điện thoại không hợp lệ !'
          }
        }}
        render={({ field }) => <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại của bạn"
          error={errors.phone ? errors.phone.message : ''}
          {...field}
        />}
      />
      <Controller
        control={control}
        name="province"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng chọn tỉnh / thành phố !'
          }
        }}
        render={({ field }) => (
          <Select label="Tỉnh / thành" error={errors.province ? errors.province.message : ''}  {...field} value={field.value} onChange={(e) => {
            handleSelectProvince(e.target.value);
            field.onChange(e)
          }}>
            <option value="">Chọn tỉnh / thành</option>
            {provinces.map((province: StoreProvince) => (
              <option
                key={province.code}
                value={province.name}
              >
                {province.name}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="district"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng chọn quận / huyện !'
          }
        }}
        render={({ field }) => (
          <Select label="Quận / huyện" error={errors.district ? errors.district.message : ''} {...field} value={field.value} onChange={(e) => {
            handleSelectDistrict(e.target.value);
            field.onChange(e)
          }}>
            <option value="">Chọn quận / huyện</option>
            {districts.map((district: StoreDistrict) => (
              <option
                key={district.code}
                value={district.name}
              >
                {district.name}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="ward"
        rules={{
          required: {
            value: true,
            message: 'Vui lòng chọn phường / xã !'
          }
        }}
        render={({ field }) => (
          <Select label="Phường / xã" error={errors.ward ? errors.ward.message : ''} {...field} value={field.value} onChange={(e) => {
            handleSelectWard(e.target.value);
            field.onChange(e)
          }}>
            <option value="">Chọn phường / xã</option>
            {wards.map((ward: StoreWard) => (
              <option
                key={ward.code}
                value={ward.name}
              >
                {ward.name}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="specific"
        render={({ field }) => <Input
          label="địa chỉ"
          placeholder='Nhập địa chỉ cụ thể'
          error={errors.specific ? errors.specific.message : ''}
          {...field}
        />}
      />
      <Controller
        control={control}
        name='isDefault'
        render={({ field: { name, onBlur, onChange, ref, value } }) => <div className={cx('toggle-switch')}>
          <input
            type="checkbox"
            className={cx('toggle-switch-checkbox')}
            id={address?._id || 'isDefault'}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            name={name}
          />
          <label
            htmlFor={address?._id || 'isDefault'}
            className={cx('toggle-switch-label')}
          ></label>
          <label htmlFor={address?._id || 'isDefault'}>Địa chỉ mặc định</label>
        </div>}
      />

      <div className={cx('form-btn')}>
        <Button primary>
          {loading ? (
            <ReactLoading type="spinningBubbles" color="#ffffff" width={20} height={20} />
          ) : (
            'Lưu địa chỉ'
          )}
        </Button>
      </div>
    </form >
  );
};

export default memo(EditAddress);
