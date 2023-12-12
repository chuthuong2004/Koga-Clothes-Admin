import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormPricing, FormOrganization, FormInfoBasic, FormVariants } from './forms';
import { EditorState } from 'draft-js';
export type FormCreateProduct = {
  name: string;
  description: EditorState;
  category: string;
  gender: string[];
  brand: string;
  preserveInformation: string;
  deliveryReturnPolicy: string;
  price: string;
  discount: string;
  keywords: string[];
}
const FormProduct = () => {
  // const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const methods = useForm<FormCreateProduct>({
    defaultValues: {
      name: '',
      description: EditorState.createEmpty(),
      category: '',
      gender: [],
      brand: '',
      deliveryReturnPolicy: '',
      discount: '0',
      preserveInformation: '',
      price: '',
      keywords: []
    }
  })
  const onSubmit = (data: FormCreateProduct) => {
    console.log(data);
  }



  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <Typography.Title level={4}>Thêm mới sản phẩm</Typography.Title>
            </div>
            <Space>
              <Button type="default" size="large">
                Discard
              </Button>
              <Button danger size="large">
                Save Draft
              </Button>
              <Button onClick={methods.handleSubmit(onSubmit)} type="primary" size="large">
                Publish Product
              </Button>
            </Space>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={16} sm={16} className="gap-4">
              <div className="flex flex-col gap-8">
                <FormInfoBasic  />
                <FormVariants />
               
                <Card bordered={false}>Product Information</Card>
              </div>
            </Col>
            <Col span={8}>
              <div className="flex flex-col gap-8">
                <FormPricing />
                <FormOrganization />
              </div>
            </Col>
          </Row>
        </div>
      </form>


    </FormProvider>
  );
};

export default FormProduct;
