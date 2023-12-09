import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const FormProduct = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className="flex justify-between items-center">
        <div>
          <Typography.Title level={4}>Add a new product</Typography.Title>
        </div>
        <Space>
          <Button type="default" size="large">
            Discard
          </Button>
          <Button danger size="large">
            Save Draft
          </Button>
          <Button type="primary" size="large">
            Publish Product
          </Button>
        </Space>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={16} sm={16} className='gap-4'>
          <div className="flex flex-col gap-8">
            <Card bordered={false}>Product Information</Card>
            <Card bordered={false}>Product Information</Card>
            <Card bordered={false}>Product Information</Card>
            <Card bordered={false}>Product Information</Card>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col gap-8">

            <Card bordered={false}>Pricing</Card>
            <Card bordered={false}>Pricing</Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormProduct;
