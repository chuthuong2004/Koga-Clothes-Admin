import { ParamLogin, ParamRegister } from '@/services/types';
import { StoreToken, useAppDispatch, useAppSelector } from '@/types/commons';
import { useCallback, useState } from 'react';
import { ErrCallbackType } from '../types';
import { authService } from '@/services';
import { logout, saveAccount, setCredentials, setToken } from '@/store/actions';
import { handleErrorHooks } from '@/utils';
import { selectAuth, selectCart } from '@/store/selectors';
import { ForgotPasswordParams } from './types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@/config';
import { toast } from 'react-toastify';

export function useAuth() {
  // ** Selectors
  const { user } = useAppSelector(selectAuth);
  const cart = useAppSelector(selectCart);
  // ** Dispatch
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  //   ** States
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (
    params: ParamLogin,
    successCallback: () => void,
    errorCallback?: ErrCallbackType,
  ) => {
    try {
      // ** Handle logic login here
      setLoading(true);
      const response = await authService.login(params);
      console.log('response: ', response);
      const { refreshToken, accessToken, ...dataUser } = response;
      const token: StoreToken = {
        accessToken,
        refreshToken,
      };
      //   ** Stored users
      dispatch(setCredentials(dataUser));

      // ** Stored token
      dispatch(setToken(token));
      if (params.saveAccount) {
        // ** store username & password
        dispatch(
          saveAccount({
            username: params.username,
            password: params.password,
          }),
        );
      }

      if (cart.cartItems.length > 0) {
        for (const cartItem of cart.cartItems) {
          // await addToCart(cartItem.product._id, cartItem.color, cartItem.size);
        }
      }
      // navigate(
      //   locationState?.from.pathname === routes.payment
      //     ? routes.cart
      //     : locationState?.from.pathname || '/',
      // );
      successCallback();
      toast.success('Đăng nhập thành công !');
    } catch (err) {
      console.log(err);

      // ** Handle errors
      handleErrorHooks(err, errorCallback);
    } finally {
      setLoading(false);
    }
  };

  // ** Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
    } finally {
      dispatch(logout());
      toast.success('Đăng xuất thành công !');
    }
  }, [dispatch]);

  // ** Handle register
  const handleRegister = useCallback(
    async (params: ParamRegister, successCallback: () => void, errorCallback?: ErrCallbackType) => {
      try {
        setLoading(true);
        const registered = await authService.register(params);
        console.log('register: ', registered);
        if (registered) {
          successCallback();
        }
        setLoading(false);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** Handle forgot password
  const handleForgotPassword = useCallback(
    async (
      params: ForgotPasswordParams,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await authService.resetPassword(params);
        successCallback();
        toast.success('Lấy lại mật khẩu thành công !');
        console.log('forgot password: ');
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
    handleForgotPassword,
  };
}
