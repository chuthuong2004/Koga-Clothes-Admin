import { useToggle } from '@/hooks/utils';
import { Button, Card, Image, Typography } from 'antd';
import ModalRole from '../../modal-role/ModalRole';

const AddRole = () => {

  const { isOpen, toggle, onClose } = useToggle(false)

  return (
    <>
      <Card>
        <div className="justify-between flex">
          <Image
            className="max-h-[13rem]"
            src={require('@/config/images/add-role.png')}
          />
          <div className="flex flex-col justify-end">
            <Button onClick={toggle} type="primary" size="large">
              Thêm mới
            </Button>
            <Typography.Text>Add role, if it doesn't exist.</Typography.Text>
          </div>
        </div>
      </Card>
      <ModalRole open={isOpen} onCancel={onClose} onClose={onClose} />

    </>

  );
};

export default AddRole;
