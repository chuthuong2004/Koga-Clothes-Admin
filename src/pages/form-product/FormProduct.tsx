import { Button, Space, Steps, Typography, UploadFile } from 'antd';

import { BASE_URL, routes } from '@/config';
import { useProduct } from '@/hooks/services';
import { productService } from '@/services';
import { ParamCreateProduct } from '@/services/types';
import { StoreColor, StoredProduct } from '@/types/commons';
import { uploadImageProduct } from '@/utils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import FormSize from './components/FormSize';
import {
  FormInfoBasic,
  FormInventory,
  FormMedias,
  FormOrganization,
  FormPricing,
  FormQuantity,
  FormVariants,
} from './forms';
export type FormCreateProduct = {
  name: string;
  code: string;
  description: string;
  category: string;
  gender: string[];
  brand: string;
  preserveInformation: string;
  deliveryReturnPolicy: string;
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
  const { onCreateProduct, onUpdateProduct } = useProduct()
  const params = useParams()
  const slug = params.productId
  const { data: product, mutate } = useSWR("GetProductDetails", () => slug ? productService.getById(slug) : undefined);
  console.log("slug: " + slug);

  const methods = useForm<FormCreateProduct>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      gender: [],
      brand: '',
      deliveryReturnPolicy: '',
      discount: '0',
      preserveInformation: '',
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


  useEffect(() => {
    if (product) {
      methods.reset({
        name: product.name,
        code: product.code,
        description: product.description,
        preserveInformation: product.preserveInformation || '',
        deliveryReturnPolicy: product.deliveryReturnPolicy || '',
        category: product.category._id,
        gender: product.gender,
        brand: product.brand._id,
        discount: product.discount?.toString(),
        price: product.price?.toString(),
        keywords: product.keywords,
        storedProducts: product.storedProducts.map(item => ({
          colors: item.colors,
          repository: typeof item.repository === 'string' ? item.repository : item.repository._id
        })),

        colors: product.storedProducts[0].colors.map(item => ({
          colorName: item.colorName
        })),
        sizes: product.storedProducts[0].colors[0].sizes.map(item => ({
          sizeName: item.size
        })),
        repositories: product.storedProducts.map(item => ({
          repository: typeof item.repository === 'string' ? item.repository : item.repository._id
        })),
        medias: product.storedProducts[0].colors.reduce((acc, item) => {
          return {
            ...acc,
            [item.colorName]: {
              images: item.images.map((image, index) => ({
                uid: `${index + 1}`,
                name: 'image.png',
                status: 'done',
                url: BASE_URL + image,
              })),
              imageSmall: [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: BASE_URL + item.imageSmall,
              }],
              imageMedium: [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: BASE_URL + item.imageMedium,
              }],
            }
          }
        }, {})

      })
    }
    return () => {
      mutate(undefined)
    }
  }, [product, methods,mutate])
  console.log("product: ", product);

  const onSubmit = async (data: FormCreateProduct) => {

    const newData: ParamCreateProduct = {
      brand: data.brand,
      category: data.category,
      code: data.code,
      gender: data.gender,
      keywords: data.keywords,
      name: data.name,
      storedProducts: data.storedProducts,
      description: data.description,
      deliveryReturnPolicy: data.preserveInformation,
      preserveInformation: data.deliveryReturnPolicy,
      price: parseInt(data.price, 10),
      discount: parseInt(data.discount, 10),
    };
    // ** Submit variants
    if (data.colors.length > 0 && current === 2) {
      console.log('VOO');
      if (!slug) {
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
      if (slug) {
        if (product && data.sizes.length !== product?.storedProducts[0].colors[0].sizes.length) {

        }
      }

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
      if (data.medias && !slug) {
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
      if (!product) {
        // ** Handle create product
        onCreateProduct(newData, () => {
          console.log("Tạo thành công !");
          toast.success('Thêm mới sản phẩm thành công !')
          navigate(routes.product)
        }, ({ message }) => {
          console.log({ message });

        })
      } else {
        onUpdateProduct(product._id, newData, () => {
          console.log("Cập nhật thành công !");
          toast.success('Cập nhật sản phẩm thành công !')
          navigate(routes.product)
        }, ({ message }) => {
          console.log({ message });

        })
      }

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
        <Space direction="vertical">
          <Typography.Title level={3}>Thêm mới sản phẩm</Typography.Title>
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
                disabled: slug ? false : current < 1,
              },
              {
                title: 'Step 3',
                description: 'Pricing & Variants',
                disabled: slug ? false : current < 2,
              },
              {
                title: 'Step 4',
                description: 'Medias',
                disabled: slug ? false : current < 3,
              },
              {
                title: 'Step 5',
                description: 'Inventory',
                disabled: slug ? false : current < 4,
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
              {current === 4 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Space>
      </form>
    </FormProvider>
  );
};

export default FormProduct;
