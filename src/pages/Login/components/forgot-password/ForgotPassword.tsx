import React, { memo, useCallback, useState } from 'react';

// STYLES
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import { Button, Input, LeftIcon } from '@/components/shares';
import { Controller, useForm } from 'react-hook-form';
import { PATTERN_EMAIL, PATTERN_PASSWORD } from '@/utils';
import ReactLoading from 'react-loading';
import { routes } from '@/config';
import { Link } from 'react-router-dom';
import { useAuth, useOTP } from '@/hooks/services';
import { OtpInput } from '@/components/shares/inputs/otp-input';
const cx = classNames.bind(styles);

type FormForgotPassword = {
    email: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
};
const defaultValues: FormForgotPassword = {
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
};

type ForgotPasswordProps = {
    goBack: () => void;
};
const ForgotPassword = ({ goBack }: ForgotPasswordProps) => {
    const { handleSendCode, loading, handleVerifyOtp } = useOTP();
    const { handleForgotPassword } = useAuth();
    const [statusOtp, setStatusOtp] = useState<'' | 'sent' | 'resend' | 'verified'>('');
    const {
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
        getValues,
        setValue,
        watch,
        setError
    } = useForm<FormForgotPassword>({
        defaultValues,
    });
    const onSubmit = (data: FormForgotPassword) => {
        console.log(data);

        switch (statusOtp) {
            case '':
                // ** Handle sent code
                handleSendCode(
                    { username: data.email, checkEmailExist: true },
                    () => {
                        setStatusOtp('sent');
                    },
                    ({ message }) => {
                        console.log(message);
                        setError("email", { message })
                    },
                );
                break;
            case 'sent':
            case 'resend':
                // ** Handle verify code
                handleVerifyOtp(
                    data,
                    () => {
                        setStatusOtp('verified');
                    },
                    ({ message }) => {
                        console.log('ERRO: ', message);
                        setError('code', { message })
                    },
                );
                break;
            case 'verified':
                // ** Handle reset password
                handleForgotPassword(
                    { email: data.email, newPassword: data.newPassword },
                    () => {
                        handleGoBack()
                        setStatusOtp('')
                    },
                    ({ message }) => {
                        console.log(message);
                        setError('newPassword', { message })
                    },
                );
                break;
            default:
                break;
        }
    };

    const handleResendCode = () => {
        handleSendCode({ username: getValues('email'), checkEmailExist: true }, () => {
            setStatusOtp('resend')
            setValue("code", '')
            clearErrors('code')
        }, ({ message }) => {
            setError('email', { message })
        },)
    }

    const handleResetForm = useCallback(() => {
        clearErrors();
        setValue('code', '')
        setValue('confirmPassword', '')
        setValue('email', '')
        setValue('newPassword', '')
    }, [clearErrors, setValue]);
    const handleGoBack = useCallback(() => {
        goBack();
        handleResetForm();
    }, [goBack, handleResetForm]);

    //   ** ========== Render View ==========
    const renderTitle = () => {
        switch (statusOtp) {
            case '':
                return 'Vui lòng nhập email của bạn ở đây để nhận hướng dẫn đặt lại mật khẩu.';
            case 'resend':
            case 'sent':
                return `Mã OTP đã được gửi về địa chỉ email [${getValues(
                    'email',
                )}] Vui lòng nhập mã OTP để đặt lại mật khẩu !`;
            case 'verified':
                return 'Vui lòng nhập mật khẩu mới';
            default:
                break;
        }
    };
    const renderTitleButton = () => {
        switch (statusOtp) {
            case '':
                return 'Gửi mã';
            case 'sent':
            case 'resend':
                return 'Xác thực email';
            case 'verified':
                return 'Đặt lại mật khẩu';
            default:
                break;
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('forgot-password')}>
            <div className={cx('forgot-password__top')}>
                <h3 className={cx('form-title')}>Quên mật khẩu</h3>
                <div className={cx('form-desc', 'text-center')}>{renderTitle()}</div>
                {statusOtp === '' && (
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: statusOtp === '',
                                message: 'Vui lòng nhập địa chỉ email !',
                            },
                            pattern: {
                                value: PATTERN_EMAIL,
                                message: 'Vui lòng nhập địa chỉ email hợp lệ !',
                            },
                        }}
                        render={({ field }) => (
                            <Input label="email" {...field} error={errors.email ? errors.email.message : ''} />
                        )}
                    />
                )}
                {(statusOtp === 'sent' || statusOtp === 'resend') && (
                    <Controller
                        control={control}
                        name="code"
                        rules={{
                            required: {
                                value: statusOtp === 'sent' || statusOtp === 'resend',
                                message: 'Vui lòng nhập mã OTP !',
                            },
                        }}
                        render={({ field }) => (
                            <OtpInput
                                {...field}
                                valueLength={6}
                                onChange={(value) => setValue('code', value.trim())}
                                error={errors.code ? errors.code.message : ''}
                            />
                        )}
                    />
                )}
                {statusOtp === 'verified' && (
                    <>
                        <Controller
                            control={control}
                            name="newPassword"
                            rules={{
                                required: {
                                    value: statusOtp === 'verified',
                                    message: 'Vui lòng nhập mật khẩu mới !',
                                },
                                pattern: {
                                    value: PATTERN_PASSWORD,
                                    message: 'Vui lòng nhập mật khẩu hợp lệ !',
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    error={errors.newPassword ? errors.newPassword.message : ''}
                                    label="Mật khẩu mới"
                                    type="password"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{
                                required: {
                                    value: statusOtp === 'verified',
                                    message: 'Vui lòng nhập mật khẩu mới !',
                                },
                                validate: (val) => {
                                    if (watch('newPassword') !== val) {
                                        return 'Mật khẩu nhập lại không khớp !';
                                    }
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    error={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                    label="Nhập lại mật khẩu"
                                    type="password"
                                />
                            )}
                        />
                    </>
                )}

                <div className={cx('btn')}>
                    <Button large primary>
                        {loading ? (
                            <ReactLoading type="spinningBubbles" color="#ffffff" width={20} height={20} />
                        ) : (
                            renderTitleButton()
                        )}
                    </Button>
                </div>
                {(statusOtp === 'sent' || statusOtp === 'resend') && <div className={cx('btn')}>
                    <Button onClick={handleResendCode} large >
                        Gửi lại mã
                    </Button>
                </div>}

                <div className={cx('btn', 'btn-forgot')}>
                    <Button onClick={handleGoBack} leftIcon={<LeftIcon />} large>
                        trở về đăng nhập
                    </Button>
                </div>
            </div>
            <div className={cx('register-now')}>
                Bạn chưa có tài khoản ?{' '}
                <Link to={routes.register} onClick={handleResetForm}>
                    Tạo ngay
                </Link>
            </div>
        </form>
    );
};

export default memo(ForgotPassword);
