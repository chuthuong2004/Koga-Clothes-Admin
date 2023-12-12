import { UploadOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import React from 'react'
import { ItemImageVariant } from '../components'

const FormVariants = () => {
    return (
        <Card bordered={false} >
            <Space direction='vertical' className='w-full h-full'>

                <Typography.Text >Variants</Typography.Text>
                <div className='flex flex-col gap-4'>
                    <Typography.Text >Medias</Typography.Text>
                    <div className='border border-dashed p-4 rounded-md'>
                        <div className='flex flex-col justify-center items-center gap-4 border-dashed border-spacing-1'>
                            <span className='w-16 h-16 items-center justify-center flex bg-[#eaeaec] p-4 rounded-md'>
                                <UploadOutlined size={40} rev />
                            </span>
                            <Typography.Text>Drag and Drop Your Image Here</Typography.Text>
                            <Typography.Text className="text-slate-400">Or</Typography.Text>
                            <Button className='bg-danger text-primary hover:bg-danger-hover'>Browse Images</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                    <ItemImageVariant />
                    <ItemImageVariant />
                    <ItemImageVariant />
                    <ItemImageVariant />
                    </div>
                    </div>
                    
                </div>
            </Space>

        </Card>
    )
}

export default FormVariants