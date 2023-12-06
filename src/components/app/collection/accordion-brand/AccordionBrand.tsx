import { usePagination } from '@/hooks/helpers';
import { brandService } from '@/services';
import { StoreBrand } from '@/types/entities';
import React, { memo, useEffect, useRef } from 'react';
import styles from './AccordionBrand.module.scss';
import classNames from 'classnames/bind';
import { Input, MinusIcon, PlusIcon } from '@/components/shares';
import { useCheckedCard, useToggle } from '@/hooks/utils';
const cx = classNames.bind(styles);
const AccordionBrand = () => {
  const { data: brands } = usePagination(
    'BrandsGetList',
    {
      page: 1,
      limit: 20,
      offset: 0,
      parent: '',
    },
    brandService.getAll,
  );
  console.log(brands);
  const { handleCheckedItem, listItemSelected } = useCheckedCard<StoreBrand>();

  const { isOpen, toggle } = useToggle(false);
  const brandRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      let totalItems = brands ? brands?.docs.length : 0;
      let heightItems = totalItems * 49 + 61; // 80: heigh của 1 item, 30 là phần margin 1 item
      if (heightItems > 500) {
        heightItems = 500;
        brandRef.current!.style.overflowY = 'scroll';
      }
      brandRef.current!.style.height = String(heightItems + 'px');
    } else {
      brandRef.current!.style.height = '61px';
    }
  }, [isOpen, brands, listItemSelected]);
  return (
    <div ref={brandRef} className={cx('filter-collection-item', 'brand-filter', isOpen && 'open')}>
      <div
        onClick={toggle}
        className={cx('d-flex', 'justify-content-between', 'align-items-center')}
      >
        <span className="text-justify bg-current-price font-bold underline">Thương hiệu</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <div className={cx('content-filter', isOpen && 'open')}>
        <div className={cx('filter-container')}>
          {brands?.docs?.map((brand: StoreBrand) => (
            <div key={brand._id} className={cx('type-filter-item')}>
              <Input
                type="checkbox"
                label={brand.name}
                name="brand"
                onChange={(e) => handleCheckedItem(brand)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AccordionBrand);
