import classNames from 'classnames/bind';
import styles from './Feature.module.scss';
import React, { memo } from 'react';
import { StoreProduct } from '@/types/entities';
const cx = classNames.bind(styles);

type Props = {
  features: StoreProduct[];
};
const Feature: React.FC<Props> = ({ features }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('container-fluid')}>
        {features.map((feature) => (
          <div key={feature._id} className={cx('feature-item')}>
            <div className={cx('feature-img')}>
              <img
                src={process.env.REACT_APP_API_URL + feature.storedProducts[0].colors[0].images[0]}
                alt=""
                className={cx('lazyloaded')}
              />
            </div>
            <div className={cx('banner-product')}>
              <img
                src="https://file.hstatic.net/1000284478/file/frame__22__c3a6e45e3424441da3746870f1e77536.png"
                alt=""
                className={cx('banner-img')}
              />
            </div>
            <div className={cx('trademark')}>{feature.brand.name}</div>
            <p className={cx('name-product')}>{feature.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Feature);
