import { Button, Card, Image, Typography } from 'antd';

const ItemRole = () => {
  return (
    <Card className="min-w-[45rem] h-[15rem]  pb-10">
      <div className="justify-between flex">
        <Image
          className="max-h-[13rem] max-w-[16rem]"
          src={require('../../../../../config/images/add-role.png')}
        />
        <div className="actions flex  flex-col justify-end">
          <Button className="bg-primary">Add role</Button>
          <Typography.Text>Add role, if it doesn't exist.</Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default ItemRole;
