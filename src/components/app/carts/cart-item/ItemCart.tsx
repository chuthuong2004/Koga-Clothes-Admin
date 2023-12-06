import React, { useEffect, useState, memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styles from './ItemCart.module.scss';
import { CloseIcon, Dialog, Button, MinusIcon, PlusStrongIcon } from '@/components/shares';
import { routes } from '@/config';
import { selectAuth, selectCart } from '@/store/selectors';
import { StoreColor, StoreSize, useAppDispatch, useAppSelector } from '@/types/commons';
import { StoreCartItem } from '@/types/entities';
import { CartAction } from '@/types/unions';
const cx = classNames.bind(styles);
type Props = {
  cartItem: StoreCartItem;
  isSelected?: boolean;
  onChangeChecked?: (cartItem: StoreCartItem, isSelected: boolean) => void;
  handleClosePopUp?: () => void;
  isCart?: boolean;
};
const ItemCart: React.FC<Props> = ({
  cartItem,
  onChangeChecked = () => {},
  handleClosePopUp = () => {},
  isSelected = false,
  isCart = true,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const cart = useAppSelector(selectCart);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoadingRemoveFavorite, setIsLoadingRemoveFavorite] = useState(false);
  const [defaultSize, setDefaultSize] = useState<string | number>(cartItem.size);

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);
  async function handleRemoveFavorite() {
    // try {
    //   setIsLoadingRemoveFavorite(true);
    //   const res = await productS.removeFavorite(cartItem.product._id);
    //   setIsLoadingRemoveFavorite(false);
    //   refetchProfile();
    // } catch (error: any) {
    //   toast.error(error.data.message);
    // }
  }
  async function handleAddFavorite() {
    // try {
    //   const res = await productApi.addFavorite(cartItem.product._id);
    //   refetchProfile();
    // } catch (error: any) {
    //   toast.error(error.data.message);
    // }
  }

  async function handleAddToCart() {
    // if (!isCart) {
    //   handleRemoveFavorite();
    //   await addItemToCart({
    //     product: cartItem.product._id,
    //     color: cartItem.color,
    //     size: defaultSize,
    //   });
    // } else {
    //   handleRemoveFromCart();
    //   handleAddFavorite();
    // }
  }

  async function handleDecreaseCart() {
    // await updateQuantityCart({
    //   cartItemId: cartItem._id || '',
    //   quantity: cartItem.quantity - 1,
    // });
  }

  async function handleIncreaseCart() {
    // await updateQuantityCart({
    //   cartItemId: cartItem._id || '',
    //   quantity: cartItem.quantity + 1,
    // });
  }

  async function handleRemoveFromCart() {
    // if (isCart) {
    //   const res = await removeItemFromCart(cartItem._id || '');
    //   console.log('res', res);
    //   dispatch(removeFromCart(cartItem));
    // }
    // !isCart && handleRemoveFavorite();
  }

  async function handleCart(action: CartAction) {
    // if (user && cartItem) {
    //   action === Action.ADD && handleAddToCart();
    //   action === Action.DECREASE && handleDecreaseCart();
    //   action === Action.INCREASE && handleIncreaseCart();
    //   action === Action.REMOVE && handleRemoveFromCart();
    // } else {
    //   action === Action.ADD && navigate(routes.login, { state: { from: location } });
    //   action === Action.DECREASE && dispatch(decreaseCart(cartItem));
    //   action === Action.INCREASE && dispatch(increaseCart(cartItem));
    //   action === Action.REMOVE && dispatch(removeFromCart(cartItem));
    // }
  }

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChangeChecked(cartItem, e.target.checked);
  };

  const handleChangeSelectedSize = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultSize(e.target.value);
  }, []);

  return (
    <div className={cx('wrapper')}>
      {/* {(isLoadingUpdated || isLoadingRemoved) && <Loading />} */}
      <div className={cx('container')}>
        {isCart && <input type="checkbox" checked={checked} onChange={handleChangeChecked} />}
        <Link to={routes.product + '/' + cartItem.product.slug} className={cx('image-wrapper')}>
          <img src={process.env.REACT_APP_API_URL + cartItem.image} alt="" />
        </Link>
        <div className={cx('text-wrapper')}>
          <div className={cx('top')}>
            {/* <Link to={routes.trademark} className={cx('brand')}>
              {cartItem?.product.brand.name}
            </Link> */}
            <div onClick={() => setIsOpenDialog(true)} className={cx('close')}>
              <CloseIcon />
            </div>
            <Dialog
              title="Xóa sản phẩm?"
              description={`Bạn chắc chắn muốn xóa sản phẩm này khỏi ${
                isCart ? 'Giỏ Hàng' : 'danh sách Yêu Thích'
              }?`}
              isOpenDialog={isOpenDialog}
              handleCloseDialog={() => setIsOpenDialog(false)}
            >
              <Button onClick={() => handleCart('add')} border small primary>
                {false && !false ? (
                  <ReactLoading type="spinningBubbles" color="#ffffff" width={20} height={20} />
                ) : isCart ? (
                  'Chuyển vào Yêu Thích'
                ) : (
                  'Chuyển vào giỏ hàng'
                )}
              </Button>
              <Button onClick={() => handleCart('remove')} small>
                {isLoadingRemoveFavorite && !isCart && !true ? (
                  <ReactLoading type="spinningBubbles" color="#2e2e2e" width={20} height={20} />
                ) : (
                  'Xóa'
                )}
              </Button>
            </Dialog>
          </div>
          <Link
            to={routes.product + '/' + cartItem.product.slug}
            className={cx('product-name', isCart && 'item-cart')}
          >
            {cartItem.product.brand.name} - {cartItem.product.name}
          </Link>
          <div className={cx('product-price', { hasSale: cartItem.product.discount > 0 })}>
            <span className={cx('price')}>
              {(
                cartItem.product.price -
                cartItem.product.price * (cartItem.product.discount / 100)
              ).toLocaleString('vn-VN')}
              ₫
            </span>
            <del>{cartItem.product.price.toLocaleString('vn-VN')}₫</del>
          </div>
          <div className={cx('variant-select')}>
            <div className={cx('product-variant-color')}>
              <span>Màu sắc:</span>
              <span>{cartItem.color}</span>
            </div>
            <div className={cx('product-variant-size')}>
              <span>Kích cỡ:</span>

              {isCart ? (
                <div>{cartItem.size}</div>
              ) : (
                <select name="" id="" value={defaultSize} onChange={handleChangeSelectedSize}>
                  {cartItem.product.storedProducts[0].colors
                    .find((c: StoreColor) => c.colorName === cartItem.color)
                    ?.sizes.map((size: StoreSize) => (
                      <option key={size._id} value={size.size}>
                        {size.size}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>

          {isCart ? (
            <div className={cx('product-quantity')}>
              <div className={cx('input-number')}>
                <div onClick={() => handleCart('decrease')} className={cx('btn-quantity')}>
                  <MinusIcon />
                </div>
                <span className={cx('input-quantity')}>{cartItem.quantity}</span>
                <div onClick={() => handleCart('increase')} className={cx('btn-quantity')}>
                  <PlusStrongIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className={cx('product-actions')}>
              {cart.cartItems.find(
                (item: StoreCartItem) =>
                  item.product._id === cartItem.product._id && item.color === cartItem.color,
              ) ? (
                <Button disabled small primary children="Đã có trong giỏ hàng" />
              ) : (
                <Button onClick={() => handleCart('add')} small primary>
                  {false ? (
                    <ReactLoading type="spinningBubbles" color="#ffffff" width={20} height={20} />
                  ) : (
                    'Chuyển vào giỏ hàng'
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCart);
