import React, { memo, useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateBlog } from './FormBlog';
import { theme, InputRef, Typography, Tag, Input } from 'antd';
import { cn } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';

const FormTagsBlog = () => {
    const { control, formState: {errors}, setValue, clearErrors} = useFormContext<FormCreateBlog>()


    const { token } = theme.useToken();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = (tags: string[]) => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setValue('tags', [...tags, inputValue]);
            clearErrors('tags');
        } else {
            setInputVisible(false);
        }
        setInputValue('');
    };
    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
    };
    return (
        <div className="flex flex-col gap-2">
            <Typography.Text>Thẻ</Typography.Text>
            <Controller
                control={control}
                name="tags"
                rules={{
                    required: {
                        value: true,
                        message: 'Vui lòng nhập từ khoá !',
                    },
                }}
                render={({ field }) => (
                    <>
                        <div className="flex flex-wrap gap-2">
                            {field.value.map((tag) => {
                                return (
                                    <span key={tag} style={{ display: 'inline-block' }}>
                                        <Tag
                                            closable
                                            onClose={(e) => {
                                                e.preventDefault();
                                                setValue(
                                                    'tags',
                                                    field.value.filter((item) => item !== tag),
                                                );
                                            }}
                                        >
                                            {tag}
                                        </Tag>
                                    </span>
                                );
                            })}
                        </div>
                        {inputVisible ? (
                            <Input
                                ref={inputRef}
                                type="text"
                                size="large"
                                style={{ width: '100%' }}
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={() => handleInputConfirm(field.value)}
                                onPressEnter={() => handleInputConfirm(field.value)}
                            />
                        ) : (
                            <Tag
                                onClick={showInput}
                                style={tagPlusStyle}
                                className={cn(
                                    'p-4 w-full',
                                    'border-dashed',
                                    errors.tags && 'border-error',
                                )}
                            >
                                <PlusOutlined rev size={20} /> New Tag
                            </Tag>
                        )}
                    </>
                )}
            />
            {errors.tags && (
                <Typography.Text type="danger" className="text-lg">{errors.tags?.message}</Typography.Text>
            )}
        </div>
    )
}

export default memo(FormTagsBlog)