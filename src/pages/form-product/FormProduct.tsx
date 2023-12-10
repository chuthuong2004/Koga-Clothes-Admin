import { Button, Card, Col, Input, Row, Select, Space, Typography } from 'antd';
import React from 'react';

import { Editor, EditorState } from 'draft-js';
import { Controller, useForm } from 'react-hook-form';
type FormCreateProduct = {
  name: string;
  description: string;
  category: string;
  gender: string[];
}
const FormProduct = () => {
  // const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const { handleSubmit, control, formState: { errors } } = useForm<FormCreateProduct>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      gender: []
    }
  })
  const onSubmit = (data: FormCreateProduct) => {
    console.log(data);

  }
  return (
    <div className="flex flex-col gap-8">
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
          <Button onClick={handleSubmit(onSubmit)} type="primary" size="large">
            Publish Product
          </Button>
        </Space>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={16} sm={16} className="gap-4">
          <div className="flex flex-col gap-8">
            <Card bordered={false}>
              <Space direction="vertical" className='w-full'>
                <Typography.Text>Product information</Typography.Text>
                <div className='flex flex-col'>
                  <Typography.Text>Tên sản phẩm</Typography.Text>
                  <Controller
                    control={control}
                    name='name'
                    rules={{
                      required: {
                        value: true,
                        message: 'Vui lòng nhập tên sản phẩm !'
                      }
                    }}
                    render={({ field }) => (
                      <Input size="large" placeholder="Nhập tên sản phẩm" status={errors.name && 'error'}  {...field} type='danger' />

                    )}
                  />
                  {errors.name && <Typography.Text type='danger'>{errors.name?.message}</Typography.Text>}
                </div>
                <div className='flex flex-col'>
                  <Typography.Text>Mô tả</Typography.Text>
                  <Controller
                    control={control}
                    name="description"
                    rules={{
                      required: {
                        value: true,
                        message: 'Vui lòng nhập mô tả sản phẩm !'
                      }
                    }}
                    render={({ field }) => (
                      <Input size="large" placeholder="Enter product description" status={errors.description && 'error'} {...field} />

                    )}
                  />
                  {errors.description && <Typography.Text type='danger'>{errors.description?.message}</Typography.Text>}
                </div>

                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
              </Space>
            </Card>
            <Card bordered={false}>Product Information</Card>
            <Card bordered={false}>Product Information</Card>
            <Card bordered={false}>Product Information</Card>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex flex-col gap-8">
            <Card bordered={false}>Pricing</Card>
            <Card bordered={false}>
              <Space direction='vertical' className='w-full'>
                <Typography.Text>Tổ chức</Typography.Text>
                <div className='flex flex-col gap-2'>
                  <Typography.Text>Danh mục</Typography.Text>
                  <Controller
                    control={control}
                    name="category"
                    rules={{
                      required: {
                        value: true,
                        message: 'Vui lòng chọn danh mục !'
                      }
                    }}
                    render={({ field }) => (
                      <Select
                        size='large'
                        defaultValue="10"
                        {...field}
                        status={errors.category && 'error'}
                        options={[
                          { value: '', label: 'Chọn danh mục' },
                          { value: '5', label: '5' },
                          { value: '10', label: '10' },
                          { value: '20', label: '20' },
                          { value: '25', label: '25' },
                          { value: '50', label: '50' },
                        ]}
                      />
                    )}
                  />
                  {
                    errors.category &&
                    <Typography.Text type='danger' >{errors.category?.message}</Typography.Text>
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography.Text>Collection</Typography.Text>
                  <Controller
                    control={control}
                    name="category"
                    rules={{
                      required: {
                        value: true,
                        message: 'Vui lòng chọn collection !'
                      }
                    }}
                    render={({ field }) => (
                      <Select
                        // mode="multiple"
                        size='large'
                        {...field}
                        value={field.value && field.value}
                        status={errors.category && 'error'}
                        placeholder="Chọn collection"
                        options={[
                          // { value: '', label: 'Chọn collection' },
                          { value: 'Man', label: "Man's Clothing" },
                          { value: 'Woman', label: "Women's Clothing" },
                          { value: 'Kids', label: "Kid's Clothing" },
                        ]}
                      />
                    )}
                  />
                  {
                    errors.category &&
                    <Typography.Text type='danger' >{errors.category?.message}</Typography.Text>
                  }
                </div>


              </Space>

            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormProduct;
