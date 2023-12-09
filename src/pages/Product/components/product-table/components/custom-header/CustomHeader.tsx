import { routes } from '@/config';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CustomHeader = () => {
    const navigate = useNavigate()
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangeCategory = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    const options: SelectProps['options'] = [
        {
            label: 'China',
            value: 'china',
            emoji: '🇨🇳',
            desc: 'China (中国)',
        },
        {
            label: 'USA',
            value: 'usa',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
        },
        {
            label: 'Japan',
            value: 'japan',
            emoji: '🇯🇵',
            desc: 'Japan (日本)',
        },
        {
            label: 'Korea',
            value: 'korea',
            emoji: '🇰🇷',
            desc: 'Korea (韩国)',
        },
    ];
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex flex-col border-b-slate-100'>
                <div className='w-full flex flex-1 items-start'>
                    <Typography.Title level={4}>Filters</Typography.Title>
                </div>
                <div className="flex gap-4 " >
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'
                        placeholder="select one country"
                        defaultValue={['china']}
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {option.data.desc}
                            </Space>
                        )}
                    />
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'
                        placeholder="select one country"
                        defaultValue={['china']}
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {option.data.desc}
                            </Space>
                        )}
                    />
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'
                        placeholder="select one country"
                        defaultValue={['china']}
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {option.data.desc}
                            </Space>
                        )}
                    />
                </div>

            </div>
            <Divider />
            <div className='flex w-full justify-between items-center'>
                <div>

                    <Input size='large' placeholder='Search' />
                </div>
                <Space>
                    <Select
                        size='large'
                        defaultValue="10"
                        style={{ width: 80 }}
                        onChange={handleChange}
                        options={[
                            { value: '5', label: '5' },
                            { value: '10', label: '10' },
                            { value: '20', label: '20' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                        ]}
                    />
                    <Button type="primary" disabled size="large" icon={<UploadOutlined size={20} rev />}>
                        Export
                    </Button>
                    <Button onClick={() => navigate(routes.createProduct)} type="primary" size="large" icon={<PlusOutlined size={20} rev />}>
                        Thêm mới
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default CustomHeader