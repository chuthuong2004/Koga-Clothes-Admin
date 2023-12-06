import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './GuideSize.module.scss';
import { CloseIcon } from '../../../shares/Icons';
import { StoreGuideSize } from '@/types/commons';
const cx = classNames.bind(styles);

const guideSizes: StoreGuideSize[] = [
  {
    name: 'ĐẦM VÀ ÁO',
    title: 'Thông số đo',
    sizes: [
      {
        sizeNumber: 34,
        sizeChar: 'XS',
      },
      {
        sizeNumber: 36,
        sizeChar: 'S',
      },
      {
        sizeNumber: 38,
        sizeChar: 'M',
      },
      {
        sizeNumber: 40,
        sizeChar: 'L',
      },
      {
        sizeNumber: 42,
        sizeChar: 'XL',
      },
    ],
    sizeParameters: [
      {
        name: 'Vòng ngực',
        value: [84, 88, 92, 96, 100],
      },
      {
        name: 'Vòng eo',
        value: [64, 68, 72, 76, 80],
      },
      {
        name: 'Vòng mông',
        value: [86, 90, 94, 98, 102],
      },
      {
        name: 'Ngang vai',
        value: [33.8, 35, 36.2, 37.5, 38.7],
      },
      {
        name: 'Dài đầm mini',
        value: [84, 86, 88, 90, 92],
      },
      {
        name: 'Dài đầm midi',
        value: [118, 120, 122, 124, 126],
      },
    ],
  },
  {
    name: 'Quần tây',
    title: 'Thông số đo',
    sizes: [
      {
        sizeNumber: 34,
        sizeChar: 'XS',
      },
      {
        sizeNumber: 36,
        sizeChar: 'S',
      },
      {
        sizeNumber: 38,
        sizeChar: 'M',
      },
      {
        sizeNumber: 40,
        sizeChar: 'L',
      },
      {
        sizeNumber: 42,
        sizeChar: 'XL',
      },
    ],
    sizeParameters: [
      {
        name: 'Vòng lưng',
        value: [64, 68, 72, 76, 80],
      },
      {
        name: 'Vòng mông',
        value: [86, 90, 94, 98, 102],
      },
      {
        name: 'Dài đáy trước',
        value: [29.5, 30.5, 31.5, 32.5, 33.5],
      },
      {
        name: 'Dài đáy sau',
        value: [35, 36, 37, 38, 39],
      },
      {
        name: 'Rộng đùi',
        value: [54, 56, 58, 60, 62],
      },
      {
        name: 'Dài quần dài',
        value: [103, 105, 107, 109, 110],
      },
    ],
  },
  {
    name: 'Quần Jean',
    title: 'Thông số đo',
    sizes: [
      {
        sizeNumber: 34,
        sizeChar: 'XS',
      },
      {
        sizeNumber: 36,
        sizeChar: 'S',
      },
      {
        sizeNumber: 38,
        sizeChar: 'M',
      },
      {
        sizeNumber: 40,
        sizeChar: 'L',
      },
      {
        sizeNumber: 42,
        sizeChar: 'XL',
      },
    ],
    sizeParameters: [
      {
        name: 'Vòng lưng',
        value: [65, 67, 69, 71, 73],
      },
      {
        name: 'Vòng mông',
        value: [80, 82, 84, 86, 88],
      },
      {
        name: 'Dài đáy trước (không lưng)',
        value: [24, 25, 26, 27, 28],
      },
      {
        name: 'Dài đáy sau (không lưng)',
        value: [35, 36, 37, 38, 39],
      },
      {
        name: 'Rộng đùi tại đáy',
        value: [45.5, 50, 52.5, 55, 60],
      },
      {
        name: 'Dài sườn ngoài (không lưng)',
        value: [92, 93, 94, 95, 96],
      },
      {
        name: 'Dài sườn trong (không lưng)',
        value: [68, 68, 68, 68, 68],
      },
    ],
  },
];
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};
const GuideSize: React.FC<Props> = ({ isOpen, handleClose }) => {
  return (
    <div className={cx('size-popup', !isOpen && 'closed')}>
      <div className={cx('size-popup__title')}>
        <div></div>
        <h4>Bảng size</h4>
        <div onClick={handleClose} className={cx('size-popup--close')}>
          Đóng
          <span>
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className={cx('size-popup__body')}>
        <table cellSpacing="0">
          <tbody>
            {guideSizes.map((guideSize: StoreGuideSize) => (
              <>
                <tr>
                  <td colSpan={6}>
                    <strong>
                      <span>{guideSize.name}</span>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2}>
                    <strong>
                      <span>{guideSize.title}</span>
                    </strong>
                  </td>
                  {guideSize.sizes.map((size, index) => (
                    <td>
                      <strong>
                        <span>{size.sizeChar}</span>
                      </strong>
                    </td>
                  ))}
                </tr>
                <tr>
                  {guideSize.sizes.map((size, index) => (
                    <td>
                      <span>
                        <strong>
                          <span>{size.sizeNumber}</span>
                        </strong>
                      </span>
                    </td>
                  ))}
                </tr>
                {guideSize.sizeParameters.map((sizeParameter, index) => (
                  <tr>
                    <td>
                      <span>
                        <strong>
                          <span>{sizeParameter.name}</span>
                        </strong>
                      </span>
                    </td>
                    {sizeParameter.value.map((valueParameter, index) => (
                      <td>
                        <span>
                          <span>{valueParameter}</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className={cx('size-popup__note')}>
        *Note: Sizechart chỉ mang tính chất tương đối, kích thước sản phẩm sẽ tùy thuộc vào từng
        phom dáng và chất liệu khác nhau
      </div>
    </div>
  );
};

export default memo(GuideSize);
