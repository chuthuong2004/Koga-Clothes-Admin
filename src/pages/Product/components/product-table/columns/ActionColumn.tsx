import { routes } from '@/config';
import { useProduct } from '@/hooks/services';
import { StoreProduct } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { memo } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type ActionColumnProps = {
    product: StoreProduct
}
const ActionColumn = ({ product }: ActionColumnProps) => {
    const navigate = useNavigate()
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
    const handleGoToEdit = () => {
        navigate(`${routes.product}/edit/${product.slug}`)
    }
    return (
        <div className="flex gap-2 items-center">
            <FaRegEdit onClick={handleGoToEdit} size={20} className="text-primary cursor-pointer" />
            <FaTrashAlt onClick={showDeleteConfirm} size={20} className="text-primary cursor-pointer" />
        </div>
    );
}

export default memo(ActionColumn)