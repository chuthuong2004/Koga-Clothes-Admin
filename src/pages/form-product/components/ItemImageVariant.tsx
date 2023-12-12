import { Button, Card, Image, Space, Typography } from 'antd'
import React, { memo } from 'react'

const ItemImageVariant = () => {
  return (
    <Card  className='bg-white flex-1 ju'>
        <div  className='flex flex-col items-center gap-4'>
            <Image src='https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/images/avatars/avatar-1.png' className='h-60 w-full object-cover'/>
            <Typography.Text className="text-slate-500">avatar.png</Typography.Text>
            <Typography.Text className="text-slate-500">781.136KB</Typography.Text>
            <Button danger className='w-full'>Remove File</Button>
        </div>
    </Card>
  )
}

export default memo(ItemImageVariant)