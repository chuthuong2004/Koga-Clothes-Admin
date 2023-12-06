import { StoreProduct } from '@/types/entities';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import { useState, memo, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreColor, useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
// import useSWR from 'swr';
import { routes } from '@/config';
import { HeartActiveIcon, HeartIcon } from '@/components/shares';
const cx = classNames.bind(styles);
type Props = {
  product: StoreProduct;
};
const ProductItem: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [isCached, setIsCached] = useState<boolean>(false);
  const [defaultImages, setDefaultImages] = useState<StoreColor>(product.storedProducts[0].colors[0]);
  const [colorActive, setColorActive] = useState<StoreColor>(product.storedProducts[0].colors[0]);

  // const { data } = useSWR(`ProductDetails${product._id}`)
  const handleFavorite = () => {
    if (!user) navigate(routes.login, { state: { from: location } });
    else {
      // const addFavoriteHandler = async () => {
      //   try {
      //     const res = await productApi.addFavorite(currentProduct ? currentProduct._id : '');
      //     refetch();
      //     setCurrentProduct((prev: StoreProduct) => ({ ...prev, favorites: res.data.favorites }));
      //     setIsLiked(true);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // const removeFavoriteHandler = async () => {
      //   try {
      //     const res = await productApi.removeFavorite(currentProduct ? currentProduct._id : '');
      //     refetch();
      //     setIsLiked(false);
      //     setCurrentProduct((prev: StoreProduct) => ({ ...prev, favorites: res.data.favorites }));
      //   } catch (error: any) {
      //     toast.error(error.data.message);
      //   }
      // };
      // if (currentProduct?.favorites.includes(user?._id || '')) {
      //   // remove
      //   removeFavoriteHandler();
      // } else {
      //   addFavoriteHandler();
      // }
    }
  };
  const handleOnMouse = (direction: string) => {
    direction === 'mouseover' ? setIsCached(true) : setIsCached(false);
  };
  const handleMouseColor = (color: StoreColor, action: string) => {
    const prevImageDefault: StoreColor | undefined = product.storedProducts[0].colors.find(
      (color: StoreColor) => color._id === colorActive._id,
    );
    action === 'mouseover'
      ? setDefaultImages(color)
      : setDefaultImages((prev: StoreColor) => (prevImageDefault ? prevImageDefault : prev));
  };

  const hearted = useMemo(() => {
    return product.favorites.find(item => item === user?._id)
  }, [product, user])
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('product-img')}>
          <Link
            className={cx('img-link')}
            onMouseOver={() => handleOnMouse('mouseover')}
            onMouseOut={() => handleOnMouse('mouseout')}
            to={routes.product + '/' + product.slug}
            state={{ colorSelected: colorActive }}
          >
            <img src={process.env.REACT_APP_API_URL + defaultImages?.images[0]} alt="" />
            <img
              src={process.env.REACT_APP_API_URL + defaultImages?.images[1]}
              alt=""
              className={cx('lazyloaded', isCached && 'is-cached')}
            />
          </Link>
          {product?.discount > 0 && (
            <div className={cx('discount')}>-{product.discount}%</div>
          )}
          <div onClick={handleFavorite} className={cx('wishlist', hearted && 'active')}>
            <HeartIcon className={cx('heart')} stroke="#ffffff" />
            <HeartActiveIcon className={cx('heart-active')} />
          </div>
          <div className={cx('banner-product')}>
            <img
              src="https://file.hstatic.net/1000284478/file/frame__22__c3a6e45e3424441da3746870f1e77536.png"
              alt=""
              className={cx('banner-img')}
            />
          </div>
          <div className={cx('outer-product-color')}>
            {product.storedProducts[0].colors.map((color) => (
              <div
                onMouseOver={() => handleMouseColor(color, 'mouseover')}
                onMouseOut={() => handleMouseColor(color, 'mouseout')}
                onClick={() => setColorActive(color)}
                key={color._id}
                className={cx('product-color-loop', colorActive._id === color._id && 'active')}
              >
                <img
                  src={process.env.REACT_APP_API_URL + color.imageSmall}
                  alt=""
                  className={cx('product-color-img')}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx('product-loop-info')}>
          <Link
            to={routes.product + '/' + product.slug}
            state={{ colorSelected: colorActive }}
          >
            <h3 className={cx('trademark-name')}>{product.brand?.name}</h3>
            <p className={cx('product-name')}>{product.name}</p>
          </Link>
          <span className={cx('quantity-color')}>{product.storedProducts[0].colors.length} màu</span>
          <div className={cx('product-price')}>
            <span className={cx('price', product.discount > 0 && 'hasSale')}>
              {(
                product.price -
                product.price * (product.discount / 100)
              ).toLocaleString('vn-VN')}
              <span className={cx('td-underline')}>đ</span>
            </span>
            {product?.discount > 0 && (
              <del>
                {product.price.toLocaleString('vn-VN')}
                <span className={cx('td-underline')}>đ</span>
              </del>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductItem);
