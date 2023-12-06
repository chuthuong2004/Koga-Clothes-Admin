import { memo } from 'react';
import ReactLoading from 'react-loading';

import classNames from 'classnames/bind';
import styles from './EditInformation.module.scss';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import { useProfile } from '@/hooks/services';
import { GenderUser } from '@/types/unions';
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Select } from '@/components/shares';

const cx = classNames.bind(styles);

type FormUpdateProfile = {
  username: string;
  email: string;
  phone: string;
  gender: GenderUser
  firstName: string;
  lastName: string;
  birthday: string;
}
type EditInformationProps = {
  handleClosePopup: () => void;
};

const EditInformation = ({ handleClosePopup }: EditInformationProps) => {
  const { user } = useAppSelector(selectAuth);
  const { handleUpdateProfile, loading: isLoading } = useProfile()
  const { handleSubmit, formState: { errors }, control, } = useForm<FormUpdateProfile>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      gender: user?.gender || "Other",
      birthday: user?.birthday || "",
      username: user?.username || "",
    }
  })

  const onSubmit = (data: FormUpdateProfile) => {
    handleUpdateProfile(data, () => {
      handleClosePopup()
    }, ({ message }) => {
      console.log("Error edit profile: ", message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='d-flex fd-column gap-1'>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => <Input
          label="họ"
          {...field}
          error={errors.firstName ? errors.firstName.message : ''}
        />}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => <Input
          label="tên"
          {...field}
          error={errors.lastName ? errors.lastName.message : ''}
        />}
      />
      <Controller
        control={control}
        name="birthday"
        render={({ field }) => <Input
          {...field}
          error={errors.birthday ? errors.birthday.message : ''}
          label="sinh nhật"
          type="date"
          placeholder="Nhập ngày tháng năm"
        />}
      />

      <Controller
        control={control}
        name="gender"
        render={({ field }) => <Select label="giới tính"{...field} onChangeSelected={field.onChange} >
          <option value="Other">Chọn giới tính</option>
          <option selected={user?.gender === 'Male'} value={'Male'}>
            Nam
          </option>
          <option selected={user?.gender === 'Female'} value={'Female'}>
            Nữ
          </option>
          <option selected={user?.gender === 'Other'} value={'Other'}>
            Khác
          </option>
        </Select>}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field }) => <Input
          {...field}
          error={errors.phone ? errors.phone.message : ''}
          disabled
          label="số điện thoại"
          name="phone"
        />}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => <Input
          {...field}
          error={errors.email ? errors.email.message : ''}
          disabled
          label="Email"
        />}
      />
      <div className={cx('action')}>
        <Button primary>
          {isLoading ? (
            <ReactLoading type="spinningBubbles" color="#ffffff" width={20} height={20} />
          ) : (
            'Lưu'
          )}
        </Button>
      </div>
    </form>
  );
};

export default memo(EditInformation);
