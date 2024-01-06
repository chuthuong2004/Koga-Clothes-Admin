import { TinyEditor } from '@/components/shares';
import { BASE_URL } from '@/config';
import { useAddress } from '@/hooks/helpers';
import { useRepository } from '@/hooks/services';
import { ParamCreateRepository } from '@/services/types';
import { StoreProvinceAddress, StoreRepository } from '@/types/entities';
import { cn, getBase64, uploadMultipleImage } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Typography, Upload, UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormCreateRepository = {
    name: string;
    code: string;
    images: UploadFile<File>[];
    description: string;
    address: StoreProvinceAddress;
};
const defaultValues: FormCreateRepository = {
    name: '',
    images: [],
    description: '',
    code: '',
    address: {
        district: '',
        province: '',
        specific: '',
        ward: '',
    },
};

type FormRepositoryProps = {
    onClose: () => void;
    open: boolean;
    type?: 'Edit' | 'Add';
    repository?: StoreRepository;
};
const FormRepository = ({ open, onClose, repository, type = 'Add' }: FormRepositoryProps) => {
    const { loading, onCreateRepository, onUpdateRepository } = useRepository();
    const { provinces, districts, wards, handleSelectDistrict, handleSelectProvince } = useAddress(repository?.address || null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FormCreateRepository>({
        defaultValues,
    });
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [previewTitle, setPreviewTitle] = useState<string>('');

    useEffect(() => {
        if (type === 'Edit' && repository && open) {
            reset({
                name: repository?.name,
                description: repository.description,
                code: repository.code,
                address: repository.address,
                images: repository.images.map((item, index) => ({
                    uid: `${index + 1}`,
                    name: 'image.webp',
                    status: 'done',
                    url: BASE_URL + item,
                }
                ))

            });
        }
    }, [open, repository, type, reset]);

    const handleCancel = useCallback(() => setPreviewOpen(false), []);

    const handlePreviewImages = useCallback(async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    }, []);

    const onSubmit = async (data: FormCreateRepository) => {
        const newData: ParamCreateRepository = {
            ...data,
            images: repository ? repository.images : [],
        };
        if (data.images.length > 0) {
            const filterImages = data.images.filter(item => {
                if (repository) {
                    return !repository.images.includes(item.url?.replace(BASE_URL, '') || "")
                }
                return true
            })
            if (filterImages.length > 0) {
                const uploadedImage = await uploadMultipleImage(
                    data.images.map((item) => item.originFileObj),
                    'stores',
                );
                console.log('image: ', uploadedImage);
                if (uploadedImage && uploadedImage.length > 0) {
                    newData.images = [...uploadedImage];
                }
            }
        }
        if (type === 'Add') {
            onCreateRepository(
                newData,
                () => {
                    onClose();
                    reset(defaultValues);
                    toast.success('Thêm mới kho thành công !');
                },
                ({ message }) => {
                    console.log(message);
                },
            );
        } else {
            onUpdateRepository(
                repository?._id || '',
                newData,
                () => {
                    onClose();
                    reset(defaultValues);
                    toast.success('Cập nhật kho thành công !');
                },
                ({ message }) => {
                    console.log(message);
                    toast.error(message);
                },
            );
        }
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = (value: string) => {
        console.log('search:', value);
    };


    return (
        <Modal
            open={open}
            title={`${type === 'Add' ? 'Thêm mới' : 'Cập nhật'} kho`}
            onOk={handleSubmit(onSubmit)}
            centered
            width={'50vw'}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit(onSubmit)}>
                    Submit
                </Button>,
            ]}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <Typography.Text>Tên kho</Typography.Text>
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập tên kho !',
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    size="large"
                                    placeholder="Nhập tên kho"
                                    {...field}
                                    status={errors.name && 'error'}
                                />
                            )}
                        />
                        {errors.name && (
                            <Typography.Text type="danger" className="text-lg">
                                {errors.name.message}
                            </Typography.Text>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Typography.Text>Mã kho</Typography.Text>
                        <Controller
                            control={control}
                            name="code"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập mã kho !',
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    size="large"
                                    placeholder="Nhập mã kho"
                                    {...field}
                                    status={errors.code && 'error'}
                                />
                            )}
                        />
                        {errors.code && (
                            <Typography.Text type="danger" className="text-lg">
                                {errors.code.message}
                            </Typography.Text>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Typography.Text>Mô tả</Typography.Text>
                        <Controller
                            control={control}
                            name="description"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập mô tả kho !',
                                },
                            }}
                            render={({ field }) => (
                                <TinyEditor
                                    value={field.value}
                                    onEditorChange={(a) => field.onChange(a)}
                                    init={{
                                        placeholder: 'Nhập mô tả kho'
                                    }}
                                    error={!!errors.description}
                                />
                            )}
                        />
                        {errors.description && (
                            <Typography.Text type="danger" className="text-lg">
                                {errors.description?.message}
                            </Typography.Text>
                        )}
                    </div>
                    <div>
                        <div>
                            <Typography.Text>Địa chỉ kho</Typography.Text>
                        </div>
                        <div className='flex gap-4'>
                            <div className="flex flex-col flex-1 ">
                                <Controller
                                    control={control}
                                    name="address.province"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng chọn tỉnh / thành phố !',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            size="large"
                                            {...field}
                                            value={field.value ? field.value : undefined}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                setValue('address.district', '')
                                                setValue('address.ward', '')
                                                handleSelectProvince(value)
                                            }}
                                            status={errors.address?.province && 'error'}
                                            placeholder="Chọn tỉnh / thành phố"
                                            options={
                                                provinces.map((item) => ({
                                                    value: item.name,
                                                    label: item.name,
                                                }))
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
                                {errors.address?.province && (
                                    <Typography.Text type="danger" className="text-lg">{errors.address?.province?.message}</Typography.Text>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 ">
                                <Controller
                                    control={control}
                                    name="address.district"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng chọn quận /huyện !',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            size="large"
                                            {...field}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                setValue('address.ward', '')
                                                handleSelectDistrict(value)
                                            }}
                                            value={field.value ? field.value : undefined}
                                            status={errors.address?.district && 'error'}
                                            placeholder="Chọn quận /huyện"
                                            options={
                                                districts.map((item) => ({
                                                    value: item.name,
                                                    label: item.name,
                                                }))
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
                                {errors.address?.district && (
                                    <Typography.Text type="danger" className="text-lg">{errors.address?.district?.message}</Typography.Text>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className='flex gap-4'>
                        <div className="flex flex-col flex-1 ">
                            <Controller
                                control={control}
                                name="address.ward"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn phường / xã !',
                                    },
                                }}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        {...field}
                                        value={field.value ? field.value : undefined}
                                        status={errors.address?.ward && 'error'}
                                        placeholder="Chọn phường / xã"
                                        options={
                                            wards.map((item) => ({
                                                value: item.name,
                                                label: item.name,
                                            }))
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
                            {errors.address?.ward && (
                                <Typography.Text type="danger" className="text-lg">{errors.address?.ward?.message}</Typography.Text>
                            )}
                        </div>
                        <div className="flex flex-col flex-1">
                            <Controller
                                control={control}
                                name="address.specific"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập địa chỉ cụ thể !',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        placeholder="Nhập địa chỉ cụ thể"
                                        {...field}
                                        status={errors.address?.specific && 'error'}
                                    />
                                )}
                            />
                            {errors.address?.specific && (
                                <Typography.Text type="danger" className="text-lg">
                                    {errors.address.specific.message}
                                </Typography.Text>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <Typography.Text>Hình ảnh</Typography.Text>
                            <Controller
                                control={control}
                                name="images"
                                rules={{
                                    required: {
                                        value: type === 'Add',
                                        message: `Vui lòng chọn hình ảnh thương hiệu !`,
                                    },
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <div
                                        className={cn(
                                            'border border-dashed p-4 rounded-md',
                                            errors.images && 'border-error',
                                        )}
                                    >
                                        <Upload
                                            multiple
                                            listType="picture-card"
                                            accept="image/*"
                                            fileList={value}
                                            onPreview={(file) => handlePreviewImages(file)}
                                            onChange={(info) => onChange(info.fileList)}
                                        >
                                            <div>
                                                <PlusOutlined rev />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        </Upload>
                                        <Modal
                                            open={previewOpen}
                                            title={previewTitle}
                                            footer={null}
                                            onCancel={handleCancel}
                                        >
                                            <img alt="" className="w-full" src={previewImage} />
                                        </Modal>
                                    </div>
                                )}
                            />
                            {errors.images && (
                                <Typography.Text type="danger" className="text-lg">{errors.images?.message}</Typography.Text>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default FormRepository;
