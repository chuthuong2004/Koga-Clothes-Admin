import { Button, Space, Steps, UploadFile } from 'antd';

import { FormProvider, useForm } from 'react-hook-form';
import {
  FormPricing,
  FormOrganization,
  FormInfoBasic,
  FormVariants,
  FormQuantity,
  FormMedias,
  FormInventory,
} from './forms';
import { EditorState, convertToRaw } from 'draft-js';
import { ParamCreateProduct } from '@/services/types';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { StoreColor, StoredProduct } from '@/types/commons';
import FormSize from './components/FormSize';
import { uploadImageProduct } from '@/utils';
import { useProduct } from '@/hooks/services';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/config';
import { toast } from 'react-toastify';
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
  colors: { colorName: string }[];
  sizes: { sizeName: string }[];
  medias: Record<
    string,
    {
      images: UploadFile<any>[];
      imageSmall: UploadFile<any>[];
      imageMedium: UploadFile<any>[];
    }
  >;
  repositories: { repository: string }[];
  storedProducts: StoredProduct[];
};
const FormProduct = () => {
  const navigate = useNavigate()
  const { onCreateProduct } = useProduct()
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
          colors: [
            {
              imageMedium: '',
              images: [],
              imageSmall: '',
              sizes: [
                {
                  quantity: '',
                  size: '',
                },
              ],
            },
          ],
        },
        {
          repository: '',
          colors: [
            {
              imageMedium: '',
              images: [],
              imageSmall: '',
              sizes: [
                {
                  quantity: '',
                  size: '',
                },
              ],
            },
          ],
        },
      ],
      colors: [
        {
          colorName: '',
        },
      ],
      medias: {},
      sizes: [
        {
          sizeName: '',
        },
      ],
      repositories: [
        {
          repository: '',
        },
      ],
    },
  });
  const onSubmit = async (data: FormCreateProduct) => {
    const descContentState = convertToRaw(data.description.getCurrentContent());
    const preserveContentState = convertToRaw(data.preserveInformation.getCurrentContent());
    const deliveryContentState = convertToRaw(data.deliveryReturnPolicy.getCurrentContent());

    const newData: ParamCreateProduct = {
      brand: data.brand,
      category: data.category,
      code: data.code,
      gender: data.gender,
      keywords: data.keywords,
      name: data.name,
      storedProducts: data.storedProducts,
      description: draftToHtml(descContentState),
      deliveryReturnPolicy: draftToHtml(deliveryContentState),
      preserveInformation: draftToHtml(preserveContentState),
      price: parseInt(data.price, 10),
      discount: parseInt(data.discount, 10),
    };
    console.log('Current: ', current);

    // ** Submit variants
    if (data.colors.length > 0 && current === 2) {
      console.log('VOO');
      const medias = data.colors.reduce(
        (acc, item) => ({
          ...acc,
          [item.colorName]: {
            images: [],
            imageMedium: [],
            imageSmall: [],
          },
        }),
        {},
      );
      methods.setValue('medias', medias);
    }
    // ** Submit images
    if (current === 3) {
      const colors: StoreColor[] = data.colors.map((color) => {
        return {
          colorName: color.colorName,
          sizes: data.sizes.map((size) => {
            return {
              size: size.sizeName,
              quantity: '',
              _id: '',
            };
          }),
          imageMedium: '',
          images: [''],
          imageSmall: '',
          _id: '',
        };
      });
      const storedProductsTemp: StoredProduct[] = data.repositories
        .filter((item) => item.repository)
        .map((repo) => {
          return {
            repository: repo.repository,
            colors: colors,
          };
        });
      methods.setValue('storedProducts', storedProductsTemp);
    }

    // ** Submit quantity
    if (current === 4) {
      const storedProducts = data.storedProducts
      if (data.medias) {
        const listFileMedia = Object.values(data.medias);
        for (let i = 0; i < listFileMedia.length; i++) {
          const media = listFileMedia[i];
          const uploaded = await uploadImageProduct(
            media.images
              .map((file) => (file.originFileObj)),
            media.imageSmall[0].originFileObj,
            media.imageMedium[0].originFileObj,
          );
          data.storedProducts.forEach((storedProduct, index) => {
            storedProducts[index].colors[i].images = uploaded.images
            storedProducts[index].colors[i].imageSmall = uploaded.imageSmall
            storedProducts[index].colors[i].imageMedium = uploaded.imageMedium
          })
        }
      }
      newData.storedProducts = storedProducts;

      console.log('Data submit: ', newData);
      onCreateProduct(newData, () => {
        console.log("Tạo thành công !");
        toast.success('Thêm mới sản phẩm thành công !')
        navigate(routes.product)
      }, ({ message }) => {
        console.log({ message });

      })
      return;
    }
    setCurrent((prev) => prev + 1);
    console.log(newData);
  };

  const onError = (err: any) => {
    console.log(err);
  };
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="flex flex-col flex-gap12">
        {/* <div className="flex flex-col gap-8">
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
        </div> */}
        <Space direction="vertical">
          <Steps
            current={current}
            onChange={onChange}
            status="process"
            responsive
            items={[
              {
                title: 'Step 1',
                description: 'Basic info product',
                disabled: false,
              },
              {
                title: 'Step 2',
                description: 'Organization',
                disabled: current < 1,
              },
              {
                title: 'Step 3',
                description: 'Pricing & Variants',
                disabled: current < 2,
              },
              {
                title: 'Step 4',
                description: 'Medias',
                disabled: current < 3,
              },
              {
                title: 'Step 5',
                description: 'Inventory',
                disabled: current < 4,
              },
            ]}
          />
          {current === 0 && <FormInfoBasic />}
          {current === 1 && <FormOrganization />}
          {current === 2 && (
            <div className="grid grid-cols-2 gap-4 w-full">
              <FormPricing />
              <FormInventory />
              <FormVariants />
              <FormSize />
            </div>
          )}
          {current === 3 && <FormMedias />}
          {current === 4 && <FormQuantity />}
          <div className="flex justify-between">
            <Button size="large" danger>
              Previous
            </Button>
            <Button size="large" type="primary" onClick={methods.handleSubmit(onSubmit, onError)}>
              Next
            </Button>
          </div>
        </Space>
      </form>
    </FormProvider>
  );
};

export default FormProduct;
