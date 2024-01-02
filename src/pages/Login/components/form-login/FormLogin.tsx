import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

// STYLES
import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';
import { PATTERN_EMAIL, PATTERN_PASSWORD, PATTERN_PHONE } from '@/utils';
import ReactLoading from 'react-loading';
import { useAuth } from '@/hooks/services';
import { useLocation } from 'react-router-dom';
import { routes } from '@/config';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import { Button, Input } from '@/components/shares';
const cx = classNames.bind(styles)
type FormInputLogin = {
    email: string;
    password: string;
    saveAccount: boolean;
    phone: string;
}

type FormLoginProps = {
    activeSignUp: boolean;
    openSignUp: () => void;
}
const defaultValues: FormInputLogin = {
    email: '',
    password: '',
    saveAccount: false,
    phone: '',
}
const FormLogin = ({ activeSignUp, openSignUp }: FormLoginProps) => {
    const { account } = useAppSelector(selectAuth)
    const { loading, handleLogin, handleRegister } = useAuth()
    const location = useLocation()
    const { handleSubmit, control, formState: { errors }, setError, setValue, reset, clearErrors } = useForm<FormInputLogin>({
        defaultValues
    })


    useEffect(() => {
        if (location.pathname === routes.login) {
            setValue('email', account?.username || '')
            setValue('password', account?.password || '')
            setValue('saveAccount', account ? true : false)
        } else {
            reset(defaultValues);
        }
        clearErrors();
    }, [location.pathname, clearErrors, reset, account, setValue]);

    const onSubmit = (data: FormInputLogin) => {
        console.log(data);
        if (activeSignUp) {
            // ** Handle register
            handleRegister({
                email: data.email,
                password: data.password,
                phone: data.phone
            }, () => {

            }, ({ message }) => {
                console.log('Lỗi đăng ký: ', message);

            })
        } else {
            // ** Handle login 
            handleLogin({
                username: data.email,
                password: data.password, saveAccount: data.saveAccount
            }, () => {

            }, ({ message }) => {
                console.log("Lõi đăng nhập: ", message);
                setError('email', {
                    message: message
                });
            })
        }
        // if (formValue.email && formValue.password && formValue.password.length >= 6) {
        // await loginUser({ email: formValue.email, password: formValue.password });
        // }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('customer-login', 'd-flex', 'fd-column', 'gap-1', 'mt-1')}>
            {activeSignUp && <div className={cx('form-desc')}>
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số, không bao gồm ký tự
                đặc biệt.
            </div>}
          
            <Controller
                control={control}
                name='email'
                rules={{
                    required: {
                        value: true,
                        message: 'Vui lòng nhập địa chỉ email !'
                    },
                    pattern: {
                        value: PATTERN_EMAIL,
                        message: 'Vui lòng nhập email hợp lệ !'
                    }
                }}
                render={({ field }) => <Input
                    label="email"
                    error={errors.email ? errors.email.message : ''}
                    {...field}
                />}
            />

            <Controller
                control={control}
                name='password'
                rules={{
                    required: {
                        value: true,
                        message: 'Vui lòng nhập mật khẩu !'
                    },
                    pattern: {
                        value: PATTERN_PASSWORD,
                        message: 'Vui lòng nhập mật khẩu hợp lệ !'
                    }
                }}
                render={({ field }) => <Input
                    label="mật khẩu"
                    type="password"
                    error={errors.password ? errors.password.message : ''}
                    {...field}
                />}
            />
            {activeSignUp && <Controller
                control={control}
                name='phone'
                rules={{
                    required: {
                        value: activeSignUp,
                        message: 'Vui lòng nhập số điện thoại !'
                    },
                    pattern: {
                        value: PATTERN_PHONE,
                        message: 'Vui lòng nhập mật khẩu hợp lệ !'
                    }
                }}
                render={({ field }) => <Input
                    label="số diện thoại"
                    error={errors.phone ? errors.phone.message : ''}
                    {...field}
                />}
            />}
            <Controller
                control={control}
                name="saveAccount"
                render={({ field }) =>
                    <Input type="checkbox" label="Lưu thông tin đăng nhập" {...field} value='' checked={field.value} />}
            />
            {activeSignUp && (
                <>
                    <Input type="checkbox" label="Đăng kí nhận thông tin khuyến mãi" />
                    <div className={cx('form-desc')}>
                        Bằng cách tạo tài khoản ở Maison là bạn đồng ý với các{' '}
                        <span>Chính sách Bảo mật và Điều khoản - Điều kiện.</span>
                    </div>
                </>
            )}
            <Button className={cx('btn-action')} large primary>
                {loading ? (
                    <ReactLoading
                        type="spinningBubbles"
                        color="#ffffff"
                        width={20}
                        height={20}
                    />
                ) :
                    activeSignUp ? (
                        'Tạo tài khoản'
                    ) : (
                        'Đăng nhập'
                    )}
            </Button>

            {!activeSignUp && (
                <div className={cx('redirect-form')}>
                    <span
                        onClick={openSignUp}
                        className={cx('redirect-btn')}
                    >
                        Quên mật khẩu?
                    </span>
                </div>
            )}
            <div className={cx('input-line')}></div>
        </form>
    )
}

export default FormLogin