import { FormBlog, FormBrand } from '@/components/app';
import { useBrand } from '@/hooks/services';
import { useToggle } from '@/hooks/utils';
import { StoreBlog } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

type ActionColumnProps = {
  id: string;
  blog: StoreBlog
}
const ActionColumn = ({ id, blog }: ActionColumnProps) => {
  const { onDeleteBrand } = useBrand()
  const { isOpen, onClose, toggle } = useToggle(false)
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xoá bài viết ?',
      icon: <ExclamationCircleFilled rev />,
      content: 'Bạn sẽ không thể khôi phục lại bài viết này.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,

      onOk() {
        onDeleteBrand(id, () => {
          toast.success("Xoá bài viết thành công !")
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
      <FormBlog onClose={onClose} open={isOpen} blog={blog} type="Edit" />
    </div>
  );
}

export default ActionColumn