import { StoreBrand } from '@/types/entities';
import styles from './TradeMarkProduct.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
const cx = classNames.bind(styles);
type TrademarkProductProps = {
  data: StoreBrand;
  banner?: boolean;
};
const TradeMarkProduct: React.FC<TrademarkProductProps> = ({ data, banner = true }) => {
  return (
    <div className={cx('container')}>
      {banner && (
        <img
          src={data.image && process.env.REACT_APP_API_URL + data.image}
          alt=""
          className={cx('trademark-img')}
        />
      )}
      <div className={cx('products-container')}>
        {/* <SlideProduct products={data.products.slice(0, 12)} /> */}
      </div>
    </div>
  );
};

export default memo(TradeMarkProduct);
