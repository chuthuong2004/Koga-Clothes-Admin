import { Button, Card, Col, Row, Space, Typography } from 'antd';

import { FormProvider, useForm } from 'react-hook-form';
import { FormPricing, FormOrganization, FormInfoBasic, FormVariants } from './forms';
import { EditorState, convertToRaw } from 'draft-js';
import { ParamCreateProduct } from '@/services/types';
import draftToHtml from 'draftjs-to-html';
export type FormCreateProduct = {
  name: string;
  code: string;
  description: EditorState;
  category: string;
  gender: string[];
  brand: string;
  preserveInformation: EditorState;
  deliveryReturnPolicy: EditorState;
  price: string;
  discount: string;
  keywords: string[];
  storedProducts: {
    repository: string;
    colors: {
      imageSmall: string;
      imageMedium: string;
      images: string[];
      sizes: {
        size: string;
        quantity: string;
      }[]
    }[]
  }[]
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
      deliveryReturnPolicy: EditorState.createEmpty(),
      discount: '0',
      preserveInformation: EditorState.createEmpty(),
      price: '',
      keywords: [],
      storedProducts: [
        {
          repository: '',
          colors: [{
            imageMedium: '',
            images: [],
            imageSmall: '',
            sizes: [
              {
                "quantity": '',
                size: ''
              }
            ]
          }]
        },
        {
          repository: '',
          colors: [{
            imageMedium: '',
            images: [],
            imageSmall: '',
            sizes: [
              {
                "quantity": '',
                size: ''
              }
            ]
          }]
        }
      ]
    }
  })
  const onSubmit = (data: FormCreateProduct) => {
    const descContentState = convertToRaw(data.description.getCurrentContent());
    const preserveContentState = convertToRaw(data.preserveInformation.getCurrentContent());
    const deliveryContentState = convertToRaw(data.deliveryReturnPolicy.getCurrentContent());

    const newData: ParamCreateProduct = {
      ...data,
      description: draftToHtml(descContentState),
      deliveryReturnPolicy: draftToHtml(deliveryContentState),
      preserveInformation: draftToHtml(preserveContentState),
      price: parseInt(data.price, 10),
      discount: parseInt(data.discount, 10),
    }

    console.log(newData);
  }

  const onError = (err: any) => {
    console.log(err);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
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
                <FormInfoBasic />
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
