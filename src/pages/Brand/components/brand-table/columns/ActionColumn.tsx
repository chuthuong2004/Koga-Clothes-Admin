import { FormBrand } from '@/components/app';
import { useBrand } from '@/hooks/services';
import { useToggle } from '@/hooks/utils';
import { StoreBrand } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

type ActionColumnProps = {
  id: string;
  brand: StoreBrand
}
const ActionColumn = ({ id, brand }: ActionColumnProps) => {
  const { onDeleteBrand } = useBrand()
  const { isOpen, onClose, toggle } = useToggle(false)
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xoá thương hiệu [${brand.name}] ?`,
      icon: <ExclamationCircleFilled rev />,
      content: 'Bạn sẽ không thể khôi phục lại thương hiệu này.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,

      onOk() {
        onDeleteBrand(id, () => {
          toast.success("Xoá thương hiệu thành công !")
        }, ({ message }) => {
          console.log(message);
          toast.error(message)
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <div className="flex gap-2 items-center">
      <FaRegEdit onClick={toggle} size={20} className="text-primary cursor-pointer" />
      <FaTrashAlt onClick={showDeleteConfirm} size={20} className="text-primary cursor-pointer" />
      <FormBrand onClose={onClose} open={isOpen} brand={brand} type="Edit" />
    </div>
  );
}

export default ActionColumn