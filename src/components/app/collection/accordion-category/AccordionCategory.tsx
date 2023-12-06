import { Input, MinusIcon, PlusIcon } from '@/components/shares';
import { StoreCategory } from '@/types/entities';
import React, { Fragment, memo, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AccordionCategory.module.scss';
import { usePagination } from '@/hooks/helpers';
import { categoryService } from '@/services';
import { useCheckedCard, useToggle } from '@/hooks/utils';
const cx = classNames.bind(styles);

type Props = {};
const AccordionCategory = ({}: Props) => {
  const { data: categories } = usePagination(
    'CategoriesGetList',
    {
      page: 1,
      limit: 20,
      offset: 0,
      parent: '',
    },
    categoryService.getAll,
  );
  console.log(categories);
  const { handleCheckedItem, listItemSelected } = useCheckedCard<StoreCategory>();

  const { isOpen, toggle } = useToggle(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      let totalItems = categories ? categories?.docs.length : 0;
      if (listItemSelected.length > 0) {
        const quantity = listItemSelected.reduce(
          (acc: any, item: any) => acc + item.children.length,
          0,
        );
        totalItems = totalItems + quantity;
      }
      const heightItems = totalItems * 49; // 80: heigh của 1 item, 30 là phần margin 1 item
      categoryRef.current!.style.height = String(heightItems + 61 + 'px');
    } else {
      categoryRef.current!.style.height = '61px';
    }
  }, [isOpen, categories, listItemSelected]);
  return (
    <div
      ref={categoryRef}
      className={cx('filter-collection-item', 'type-filter', isOpen && 'open')}
    >
      <div
        onClick={toggle}
        className={cx('d-flex', 'justify-content-between', 'align-items-center')}
      >
        <span>Sản phẩm</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>

      <div className={cx('content-filter', isOpen && 'open')}>
        {categories?.docs?.map((category: StoreCategory) => (
          <AccordionItemCategory
            onChecked={handleCheckedItem}
            category={category}
            key={category._id}
            listItemSelected={listItemSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(AccordionCategory);

const AccordionItemCategory = memo(
  ({
    category,
    onChecked,
    listItemSelected,
  }: {
    category: StoreCategory;
    onChecked: (value: StoreCategory) => void;
    listItemSelected: StoreCategory[];
  }) => {
    const { data: categories } = usePagination(
      `CategoryListParent${category._id}`,
      {
        page: 1,
        limit: 1000,
        offset: 0,
        parent: category._id,
      },
      categoryService.getAll,
    );
    const { isOpen, toggle } = useToggle(false);
    console.log('current: ', category);

    const categoryRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (categoryRef.current) {
        if (isOpen) {
          let totalItems = 0;
          const found = listItemSelected.find((item) => item._id === category._id);
          if (found) {
            const quantity = found.children.length;
            totalItems = totalItems + quantity;
          }
          const heightItems = totalItems * 49; // 80: heigh của 1 item, 30 là phần margin 1 item
          categoryRef.current!.style.height = String(heightItems + 61 + 'px');
        } else {
          categoryRef.current!.style.height = '0px';
        }
      }
    }, [isOpen, categories, category, listItemSelected]);
    return (
      <Fragment>
        <div key={category._id} className={cx('type-filter-item')}>
          <Input
            type="checkbox"
            label={category.name}
            name="category"
            onChange={(e) => {
              toggle();
              onChecked(category);
            }}
            className="flex-1"
          />

          {categories && categories.docs?.length > 0 ? isOpen ? <MinusIcon /> : <PlusIcon /> : null}
        </div>
        {categories && categories.docs.length > 0 && typeof categories?.docs[0] === 'object' && (
          <div ref={categoryRef} className={cx('content-filter', isOpen && 'open')}>
            {categories?.docs?.map((category: StoreCategory) => (
              <AccordionItemCategory
                listItemSelected={listItemSelected}
                onChecked={onChecked}
                category={category}
                key={category._id}
              />
            ))}
          </div>
        )}
      </Fragment>
    );
  },
);
