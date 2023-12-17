import { Card, Typography } from "antd";

const Dashboard = () => {
  return (
    <div className=''>
      <div className="flex gap-12">
        <div className="flex-3  flex flex-col gap-12">
          <Card bordered={false}>
            <div>
              <div className="flex flex-col">
                <Typography.Text>Congratulations John! 🎉</Typography.Text>
                <Typography.Text>Best seller of the month</Typography.Text>
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-12">

            <div className="flex gap-12">
              <Card bordered={false}>
                <div>
                  <div className="flex flex-col">
                    <Typography.Text>Congratulations John! 🎉</Typography.Text>
                    <Typography.Text>Best seller of the month</Typography.Text>
                  </div>
                </div>
              </Card>
              <Card bordered={false}>
                <div>
                  <div className="flex flex-col">
                    <Typography.Text>Congratulations John! 🎉</Typography.Text>
                    <Typography.Text>Best seller of the month</Typography.Text>
                  </div>
                </div>
              </Card>
            </div>
            <Card bordered={false}>
              <div>
                <div className="flex flex-col">
                  <Typography.Text>Congratulations John! 🎉</Typography.Text>
                  <Typography.Text>Best seller of the month</Typography.Text>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card bordered={false}>
              <div>
                <div className="flex flex-col">
                  <Typography.Text>Congratulations John! 🎉</Typography.Text>
                  <Typography.Text>Best seller of the month</Typography.Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex-[5] flex flex-col gap-12">
          <Card bordered={false}>
            <div>
              <div className="flex flex-col">
                <Typography.Text>Congratulations John! 🎉</Typography.Text>
                <Typography.Text>Best seller of the month</Typography.Text>
              </div>
            </div>
          </Card>
          <Card bordered={false}>
            <div>
              <div className="flex flex-col">
                <Typography.Text>Congratulations John! 🎉</Typography.Text>
                <Typography.Text>Best seller of the month</Typography.Text>
              </div>
            </div>
          </Card>
          <div className="flex gap-12 w-full">
            <Card bordered={false}>
              <div>
                <div className="flex flex-col">
                  <Typography.Text>Congratulations John! 🎉</Typography.Text>
                  <Typography.Text>Best seller of the month</Typography.Text>
                </div>
              </div>
            </Card>
            <Card bordered={false}>
              <div>
                <div className="flex flex-col">
                  <Typography.Text>Congratulations John! 🎉</Typography.Text>
                  <Typography.Text>Best seller of the month</Typography.Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
