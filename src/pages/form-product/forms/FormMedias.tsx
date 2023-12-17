import { Typography, Card } from 'antd';
import FormImage from '../components/FormImage';
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';
import { memo } from 'react';
const FormMedias = () => {
    const { control } = useFormContext<FormCreateProduct>()
    return (
        <Card>
            <Typography.Text >Medias</Typography.Text>
            <Controller
                control={control}
                name="medias"
                render={({ field: { value } }) => (
                    <div className='flex flex-col gap-12'>
                        {Object.entries(value).map(([colorName, media]) => {
                            return (
                                <FormImage colorName={colorName} media={media} />
                            )
                        })}
                    </div>
                )}
            />

        </Card>
    )
}

export default memo(FormMedias)