import { ChangeEvent, memo } from 'react'
import styles from './AccordionGender.module.scss'
import classNames from 'classnames/bind'
import { MinusIcon, PlusIcon } from '@/components/shares';
import { ActionFilter } from '@/types/commons';
const cx = classNames.bind(styles)

type FilterProduct = {
    sort: boolean;
    gender: boolean;
    brand: boolean;
    category: boolean;
    color: boolean;
    size: boolean;
    price: boolean;
  };
type AccordionGenderProps = {
    onFilter: (name: keyof FilterProduct) => void;
    openFilter: FilterProduct
    onActionFilter: (e: ChangeEvent<HTMLInputElement>, type: keyof ActionFilter) => void
    actionFilter: ActionFilter
}
const AccordionGender = ({openFilter, onFilter, actionFilter, onActionFilter}: AccordionGenderProps) => {
    return (
        <div className={cx('filter-collection-item', 'gender-filter', openFilter.gender && 'open')}>
          <div
            onClick={() => onFilter('gender')}
            className={cx('d-flex', 'justify-content-between', 'align-items-center')}
          >
            <span>Giới tính</span>
            {openFilter.gender ? <MinusIcon /> : <PlusIcon />}
          </div>
          <div className={cx('content-filter', openFilter.gender && 'open')}>
            <div className={cx('filter-container')}>
              <div className={cx('gender')}>
                <input
                  type="radio"
                  className={cx('d-none')}
                  value={'Women'}
                  id={'Women'}
                  name="gender"
                  checked={actionFilter.filter?.gender.includes('Women')}
                  onChange={(e) => onActionFilter(e, 'filter')}
                />
                <label htmlFor={'Women'} className={cx('gender-sw')}>
                  Nữ
                </label>
              </div>
              <div className={cx('gender')}>
                <input
                  type="radio"
                  className={cx('d-none')}
                  value={'Man'}
                  id={'Man'}
                  name="gender"
                  checked={actionFilter.filter?.gender.includes('Man')}
                  onChange={(e) => onActionFilter(e, 'filter')}
                />
                <label htmlFor={'Man'} className={cx('gender-sw')}>
                  Nam
                </label>
              </div>
              <div className={cx('gender')}>
                <input
                  type="radio"
                  className={cx('d-none')}
                  value={'Unisex'}
                  id={'Unisex'}
                  name="gender"
                  checked={actionFilter.filter?.gender.includes('Unisex')}
                  onChange={(e) => onActionFilter(e, 'filter')}
                />
                <label htmlFor={'Unisex'} className={cx('gender-sw')}>
                  Unisex
                </label>
              </div>
            </div>
          </div>
        </div>
    )
}

export default memo(AccordionGender)