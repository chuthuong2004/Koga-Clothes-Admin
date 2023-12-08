import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// STYLES
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { Button, FacebookIcon, GoogleIcon, LogoIcon } from '@/components/shares';
import { routes } from '@/config';
import { selectAuth } from '@/store/selectors';
import { useAppSelector } from '@/types/commons';
import 'react-toastify/dist/ReactToastify.css';
import { FormLogin } from './components';
import { ForgotPassword } from './components/forgot-password';
const cx = classNames.bind(styles);

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { account, user } = useAppSelector(selectAuth);
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  useEffect(() => {
    if (location.pathname === routes.login || location.pathname === routes.register) {
      if (user) {
        navigate(routes.dashboard)
      }
    }
  }, [user, location.pathname, navigate])
  useEffect(() => {
    if (location.pathname === routes.login) {
      setActiveSignUp(false);
    } else {
      setActiveSignUp(true);
    }
  }, [location.pathname, account]);

  const addToCart = async (productId: string, color: string, size: string | number) => {
    // const cart = await addItemToCart({
    //   product: productId,
    //   color,
    //   size,
    // });
  };

  return (
    <section className={cx('login-section')}>
      <div className={cx('container')}>
        <div className={cx('wrapper')}>
          <div className={cx('col-lg')}>
            <div className={cx('customer-actions__greeting')}>
              <div className={cx('logo')}>
                <Link to={routes.home}>
                  <LogoIcon />
                </Link>
              </div>
              <h1>
                <span>Xin chào </span>Quý khách
              </h1>
            </div>
          </div>
          <div className={cx('col-lg')}>
            <div className={cx('customer-actions__wrapper')}>
              <div className={cx('customer-actions__form', openForgotPassword && 'show')}>
                <div className={cx('login-n-signup')}>
                  <div className={cx('nav-links', activeSignUp ? 'sign-up' : 'sign-in')}>
                    <Link to={routes.login} className={cx('nav-link', !activeSignUp && 'active')}>
                      Đăng nhập
                    </Link>
                    <Link to={routes.register} className={cx('nav-link', activeSignUp && 'active')}>
                      Đăng ký
                    </Link>
                    <div className={cx('line')}></div>
                  </div>

                  <FormLogin
                    activeSignUp={activeSignUp}
                    openSignUp={() => setOpenForgotPassword(true)}
                  />
                  <div className={cx('login-n-signup__socials')}>
                    <div className={cx('btn')}>
                      <Button
                        className={cx('btn__facebook')}
                        large
                        primary
                        icon={<FacebookIcon width="18" height="18" />}
                      >
                        Đăng nhập bằng facebook
                      </Button>
                    </div>

                    <div className={cx('btn')}>
                      <Button
                        className={cx('btn__google')}
                        large
                        primary
                        icon={<GoogleIcon width="18" height="18" />}
                        onClick={() => {
                          document.querySelector('.S9gUrf-YoZ4jf')?.classList.add('ok');
                          console.log(document.querySelector('#container'));
                        }}
                      >
                        Đăng nhập bằng Google
                      </Button>
                    </div>
                  </div>
                </div>
                <ForgotPassword goBack={() => setOpenForgotPassword(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
