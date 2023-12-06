import classNames from 'classnames/bind';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './CustomSlick.scss';
import {
  Aojo,
  Ceci,
  CharlesKeith,
  CoachTradeMark,
  Dsquared2,
  Gigi,
  Havaianas,
  Lesella,
  Marhenj,
  MaxCo,
  MLB,
  Mujosh,
  Pedro,
  Pinko,
  Puma,
  Skechers,
  TedBaker,
  TheKooples,
  TopMan,
  TopShop,
  WeekendMaxMara,
} from './LogoTradeMark/LogoTradeMark';
import styles from './TradeMarkSlide.module.scss';
const cx = classNames.bind(styles);
const linkList = [
  {
    to: '/',
    icon: <CoachTradeMark />,
  },
  {
    to: '/',
    icon: <Dsquared2 />,
  },
  {
    to: '/',
    icon: <WeekendMaxMara />,
  },
  {
    to: '/',
    icon: <MaxCo />,
  },
  {
    to: '/',
    icon: <Pinko />,
  },
  {
    to: '/',
    icon: <MaxCo />,
  },
  {
    to: '/',
    icon: <TedBaker />,
  },
  {
    to: '/',
    icon: <Lesella />,
  },
  {
    to: '/',
    icon: <Puma />,
  },
  {
    to: '/',
    icon: <MLB />,
  },
  {
    to: '/',
    icon: <Skechers />,
  },
  {
    to: '/',
    icon: <Marhenj />,
  },
  {
    to: '/',
    icon: <Pedro />,
  },
  {
    to: '/',
    icon: <CharlesKeith />,
  },
  {
    to: '/',
    icon: <Havaianas />,
  },
  {
    to: '/',
    icon: <Mujosh />,
  },
  {
    to: '/',
    icon: <Aojo />,
  },
  {
    to: '/',
    icon: <TopShop />,
  },
  {
    to: '/',
    icon: <TopMan />,
  },
  {
    to: '/',
    icon: <Gigi />,
  },
  {
    to: '/',
    icon: <Ceci />,
  },
];

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  draggable: true,
  autoplaySpeed: 3000,
  arrows: false,
  dotsClass: cx('container-dots'),
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
      },
    },
  ],
};
const TradeMarkSlide = () => {
  return (
    <div className={cx('trade-mark')}>
      <div className={cx('trade-mark-wrapper')}>
        <div className={cx('block-title')}>Thương hiệu</div>
        <div className={cx('slides')}>
          <div className={cx('container')}>
            <Slider className={cx('slider-pc')} {...settings}>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <CoachTradeMark />
                </Link>
                <Link to={'/'}>
                  <Dsquared2 />
                </Link>
                <Link to={'/'}>
                  <WeekendMaxMara />
                </Link>
                <Link to={'/'}>
                  <MaxCo />
                </Link>
                <Link to={'/'}>
                  <Pinko />
                </Link>
                <Link to={'/'}>
                  <TedBaker />
                </Link>
                <Link to={'/'}>
                  <TheKooples />
                </Link>
                <Link to={'/'}>
                  <Lesella />
                </Link>
                <Link to={'/'}>
                  <Puma />
                </Link>
                <Link to={'/'}>
                  <MLB />
                </Link>
                <Link to={'/'}>
                  <Skechers />
                </Link>
                <Link to={'/'}>
                  <Marhenj />
                </Link>
                <Link to={'/'}>
                  <Pedro />
                </Link>
                <Link to={'/'}>
                  <CharlesKeith />
                </Link>
                <Link to={'/'}>
                  <Havaianas />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Mujosh />
                </Link>
                <Link to={'/'}>
                  <Aojo />
                </Link>
                <Link to={'/'}>
                  <TopShop />
                </Link>
                <Link to={'/'}>
                  <TopMan />
                </Link>
                <Link to={'/'}>
                  <Gigi />
                </Link>
                <Link to={'/'}>
                  <Ceci />
                </Link>
              </div>
            </Slider>
            <Slider className={cx('slider-mobile')} {...settings}>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <CoachTradeMark width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Dsquared2 width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <WeekendMaxMara width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <MaxCo width="8rem" height="8rem" />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Pinko width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <TedBaker width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <TheKooples width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Lesella width="8rem" height="8rem" />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Puma width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <MLB width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Skechers width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Marhenj width="8rem" height="8rem" />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Pedro width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <CharlesKeith width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Havaianas width="8rem" height="8rem" />
                </Link>{' '}
                <Link to={'/'}>
                  <Mujosh width="8rem" height="8rem" />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Aojo width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <TopShop width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <TopMan width="8rem" height="8rem" />
                </Link>
                <Link to={'/'}>
                  <Gigi width="8rem" height="8rem" />
                </Link>
              </div>
              <div className={cx('slide-trademark')}>
                <Link to={'/'}>
                  <Ceci width="8rem" height="8rem" />
                </Link>
              </div>
            </Slider>

            {/* <Swiper
              slidesPerView={5}
              grid={{
                rows: 3,
                fill: 'row',
              }}
              // spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              autoplay={true}
              modules={[Grid, Pagination]}
              className={cx('slider')}
            >
              {linkList.map((link, i) => (
                <SwiperSlide key={i} className={cx('slide-item')}>
                  <Link to={link.to}>{link.icon}</Link>
                </SwiperSlide>
              ))}
            </Swiper> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TradeMarkSlide);
