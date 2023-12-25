import { FormRepository } from '@/components/app/repositories';
import { useRepository } from '@/hooks/services';
import { useToggle } from '@/hooks/utils';
import { StoreRepository } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { memo } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

type ActionColumnProps = {
  id: string;
  repository: StoreRepository;
};
const ActionColumn = ({ id, repository }: ActionColumnProps) => {
  const { onDeleteRepository } = useRepository();
  const { isOpen, onClose, toggle } = useToggle(false);
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xoá kho ?',
      icon: <ExclamationCircleFilled rev />,
      content: 'Bạn sẽ không thể khôi phục lại kho này.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,

      onOk() {
        onDeleteRepository(
          id,
          () => {
            toast.success('Xoá kho thành công !');
          },
          ({ message }) => {
            console.log(message);
            toast.error(message);
          },
        );
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
      <FormRepository onClose={onClose} open={isOpen} repository={repository} type="Edit" />
    </div>
  );
};

export default memo(ActionColumn);
