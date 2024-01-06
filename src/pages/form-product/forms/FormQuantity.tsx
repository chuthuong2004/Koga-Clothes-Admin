import { Button, Card, Input, Select, Space, Typography } from 'antd';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';
import { usePagination } from '@/hooks/helpers';
import { repositoryService } from '@/services';
import { PATTERN_NUMBER } from '@/utils';

const FormQuantity = () => {
    const { data } = usePagination(
        'RepositoriesInFormProduct',
        {
            page: 1,
            limit: 1000,
            offset: 0,
        },
        repositoryService.getAll,
    );
    const {
        control,
        formState: { errors },
    } = useFormContext<FormCreateProduct>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'storedProducts',
    });

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    return (
        <Card className="flex-3">
            <Space direction="vertical" className="w-full">
                <div className="flex flex-col gap-8">
                    {fields.map((field, index) => (
                        <div className="flex flex-col gap-4">
                            <Typography.Text>Kho lưu trữ</Typography.Text>
                            <div className="flex gap-4">
                                <Controller
                                    control={control}
                                    name={`storedProducts.${index}.repository`}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng chọn kho lưu trữ !',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            className="flex-1"
                                            size="large"
                                            {...field}
                                            status={errors.repositories?.[index]?.repository && 'error'}
                                            placeholder="Chọn kho lưu trữ"
                                            options={
                                                data
                                                    ? data?.docs.map((repo) => ({
                                                        value: repo._id,
                                                        label: repo.name,
                                                    }))
                                                    : []
                                            }
                                            showSearch
                                            optionFilterProp="children"
                                            onSearch={onSearch}
                                            filterOption={filterOption}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                        />
                                    )}
                                />
                                <Button danger size="large" onClick={() => remove(index)}>
                                    Delete
                                </Button>
                            </div>
                            <Controller
                                control={control}
                                name={`storedProducts.${index}.colors`}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn kho lưu trữ !',
                                    },
                                }}
                                render={({ field: { value } }) => (
                                    <div className="grid grid-cols-2 gap-4">
                                        {value.map((color, indexColor) => (
                                            <Card className="shadow-card border" bordered={false}>
                                                <div className="flex gap-4">
                                                    <div className='flex-1'>
                                                        <Typography.Text>Màu sắc</Typography.Text>
                                                        <Input size="large" value={color.colorName} disabled />
                                                    </div>
                                                    <div className="flex flex-col flex-2 gap-4">
                                                        {color.sizes.map((size, indexSize) => (
                                                            <div className="flex gap-4">
                                                                <div className='flex-1'>
                                                                    <Typography.Text>Kích cỡ</Typography.Text>
                                                                    <Input size="large" value={size.size} disabled />
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <Typography.Text>Số lượng</Typography.Text>
                                                                    <Controller
                                                                        control={control}
                                                                        name={`storedProducts.${index}.colors.${indexColor}.sizes.${indexSize}.quantity`}
                                                                        rules={{
                                                                            required: {
                                                                                value: true,
                                                                                message: 'Vui lòng nhập số lượng',
                                                                            },

                                                                            pattern: {
                                                                                value: PATTERN_NUMBER,
                                                                                message: 'Số lượng không hợp lệ !'
                                                                            }
                                                                        }}
                                                                        render={({ field }) => (
                                                                            <Input
                                                                                size="large"
                                                                                {...field}

                                                                                onChange={e => PATTERN_NUMBER.test(e.target.value) ? field.onChange(e) : null}
                                                                                placeholder="Nhập số lượng"
                                                                                status={
                                                                                    errors.storedProducts?.[index]?.colors?.[indexColor]
                                                                                        ?.sizes?.[indexSize]?.quantity && 'error'
                                                                                }
                                                                                type="danger"
                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors.storedProducts?.[index]?.colors?.[indexColor]?.sizes?.[
                                                                        indexSize
                                                                    ]?.quantity && (
                                                                            <Typography.Text type="danger" className="text-lg">
                                                                                {
                                                                                    errors.storedProducts?.[index]?.colors?.[indexColor]
                                                                                        ?.sizes?.[indexSize]?.quantity?.message
                                                                                }
                                                                            </Typography.Text>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                    ))}
                </div>
            </Space>
        </Card>
    );
};

export default FormQuantity;
