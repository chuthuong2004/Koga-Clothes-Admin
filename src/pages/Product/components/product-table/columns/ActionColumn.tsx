import { useProduct } from '@/hooks/services/useProduct';
import { StoreProduct } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

type ActionColumnProps = {
    product: StoreProduct
}
const ActionColumn = ({ product }: ActionColumnProps) => {
    const { onDeleteProduct } = useProduct()
    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xoá sản phẩm ?',
            icon: <ExclamationCircleFilled rev />,
            content: 'Bạn sẽ không thể khôi phục lại sản phẩm này.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,

            onOk() {
                onDeleteProduct(product._id, () => {
                    toast.success("Xoá sản phẩm thành công !")
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
            <FaRegEdit size={20} className="text-primary cursor-pointer" />
            <FaTrashAlt onClick={showDeleteConfirm} size={20} className="text-primary cursor-pointer" />
        </div>
    );
}

export default ActionColumn