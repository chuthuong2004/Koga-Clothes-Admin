import { ChangeEvent, memo } from 'react';
import styles from './AccordionPrice.module.scss';
import classNames from 'classnames/bind';
import { Input, MinusIcon, PlusIcon } from '@/components/shares';
import { ActionFilter } from '@/types/commons';
const cx = classNames.bind(styles);

type FilterProduct = {
  sort: boolean;
  gender: boolean;
  brand: boolean;
  category: boolean;
  color: boolean;
  size: boolean;
  price: boolean;
};
type AccordionPriceProps = {
  onFilter: (name: keyof FilterProduct) => void;
  openFilter: FilterProduct;
  onActionFilter: (e: ChangeEvent<HTMLInputElement>, type: keyof ActionFilter) => void;
  actionFilter: ActionFilter;
};
/**
 * <div className={cx('filter-collection-item', 'material-filter')}>
          <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
            <span>Giá</span>
            <PlusIcon />
          </div>
        </div>
 * @param param0 
 * @returns 
 */
const AccordionPrice = ({
  openFilter,
  onFilter,
  actionFilter,
  onActionFilter,
}: AccordionPriceProps) => {
  return (
    <div className={cx('filter-collection-item', 'gender-filter', openFilter.price && 'open')}>
      <div
        onClick={() => onFilter('price')}
        className={cx('d-flex', 'justify-content-between', 'align-items-center')}
      >
        <span>Giá</span>
        {openFilter.price ? <MinusIcon /> : <PlusIcon />}
      </div>
      <div className={cx('content-filter', openFilter.price && 'open')}>
        <div className={cx('filter-container')}>
          <div className={cx('type-filter-item')}>
            <Input
              type="radio"
              value={'lt-1000000'}
              name="price"
              checked={actionFilter.filter?.price.includes('lt-1000000')}
              onChange={(e) => onActionFilter(e, 'filter')}
              label="Dưới 1,000,000đ"
            />
          </div>

          <div className={cx('type-filter-item')}>
            <Input
              type="radio"
              value={'lt-1000000'}
              name="price"
              checked={actionFilter.filter?.price.includes('lt-1000000')}
              onChange={(e) => onActionFilter(e, 'filter')}
              label="1,000,000đ - 2,000,000đ"
            />
          </div>
          <div className={cx('type-filter-item')}>
            <Input
              type="radio"
              value={'lt-1000000'}
              name="price"
              checked={actionFilter.filter?.price.includes('lt-1000000')}
              onChange={(e) => onActionFilter(e, 'filter')}
              label="2,000,000đ - 3,000,000đ"
            />
          </div>
          <div className={cx('type-filter-item')}>
            <Input
              type="radio"
              value={'lt-1000000'}
              name="price"
              checked={actionFilter.filter?.price.includes('lt-1000000')}
              onChange={(e) => onActionFilter(e, 'filter')}
              label="Trên 4,000,000đ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AccordionPrice);
