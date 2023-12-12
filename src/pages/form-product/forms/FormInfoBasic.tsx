import { Card, Space, Typography, Input } from 'antd'
import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'

import { Editor } from 'react-draft-wysiwyg';
const FormInfoBasic = () => {
    const { control, formState: { errors } } = useFormContext<FormCreateProduct>()
    return (
        <Card bordered={false}>
            <Space direction="vertical" className='w-full'>
                <Typography.Text>Thông tin sản phẩm</Typography.Text>
                <div className='flex flex-col'>
                    <Typography.Text>Tên sản phẩm</Typography.Text>
                    <Controller
                        control={control}
                        name='name'
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập tên sản phẩm !'
                            }
                        }}
                        render={({ field }) => (
                            <Input size="large" placeholder="Nhập tên sản phẩm" status={errors.name && 'error'}  {...field} type='danger' />

                        )}
                    />
                    {errors.name && <Typography.Text type='danger'>{errors.name?.message}</Typography.Text>}
                </div>
                <div className='flex flex-col'>
                    <Typography.Text>Mô tả</Typography.Text>
                    <Controller
                        control={control}
                        name="description"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mô tả sản phẩm !'
                            }
                        }}
                        render={({ field }) => (

                            <Editor
                                editorState={field.value}
                                wrapperClassName="border rounded-md"
                                editorClassName="p-4"
                                toolbarClassName='bg-primary border-none'
                                onEditorStateChange={field.onChange}
                                toolbar={
                                    {
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                        inline: {
                                            inDropdown: false,
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                                            bold: { icon: 'bold', className: undefined },
                                            italic: { icon: "italic", className: undefined },
                                            underline: { icon: "underline", className: undefined },
                                            strikethrough: { icon: 'strikethrough', className: undefined },
                                            monospace: { icon: "monospace", className: undefined },
                                            superscript: { icon: 'superscript', className: undefined },
                                            subscript: { icon: 'subscript', className: undefined },
                                        },
                                        blockType: {
                                            inDropdown: true,
                                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                        },
                                        fontSize: {
                                            icon: 'fontSize',
                                            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                        },
                                        fontFamily: {
                                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                        },
                                        list: {
                                            inDropdown: false,
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                            options: ['unordered', 'ordered', 'indent', 'outdent'],
                                            unordered: { icon: "unordered", className: undefined },
                                            ordered: { icon: "ordered", className: undefined },
                                            indent: { icon: "indent", className: undefined },
                                            outdent: { icon: "outdent", className: undefined },
                                        },
                                        textAlign: {
                                            inDropdown: false,
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                            options: ['left', 'center', 'right', 'justify'],
                                            left: { icon: "left", className: undefined },
                                            center: { icon: "center", className: undefined },
                                            right: { icon: "right", className: undefined },
                                            justify: { icon: "justify", className: undefined },
                                        },
                                        colorPicker: {
                                            icon: "color",
                                            className: undefined,
                                            component: undefined,
                                            popupClassName: undefined,
                                            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                                        },
                                        link: {
                                            inDropdown: false,
                                            className: undefined,
                                            component: undefined,
                                            popupClassName: undefined,
                                            dropdownClassName: undefined,
                                            showOpenOptionOnHover: true,
                                            defaultTargetOption: '_self',
                                            options: ['link', 'unlink'],
                                            link: { icon: "link", className: undefined },
                                            unlink: { icon: "unlink", className: undefined },
                                            linkCallback: undefined
                                        },
                                        emoji: {
                                            icon: "emoji",
                                            className: undefined,
                                            component: undefined,
                                            popupClassName: undefined,
                                            emojis: [
                                                '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                                                '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                                                '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                                                '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                                                '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                                                '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                                                '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                                                '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                                                '✅', '❎', '💯',
                                            ],
                                        },
                                        embedded: {
                                            icon: "embedded",
                                            className: undefined,
                                            component: undefined,
                                            popupClassName: undefined,
                                            embedCallback: undefined,
                                            defaultSize: {
                                                height: 'auto',
                                                width: 'auto',
                                            },
                                        },
                                        image: {
                                            icon: "image",
                                            className: undefined,
                                            component: undefined,
                                            popupClassName: undefined,
                                            urlEnabled: true,
                                            uploadEnabled: true,
                                            alignmentEnabled: true,
                                            uploadCallback: undefined,
                                            previewImage: false,
                                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                            alt: { present: false, mandatory: false },
                                            defaultSize: {
                                                height: 'auto',
                                                width: 'auto',
                                            },
                                        },
                                        remove: { icon: "eraser", className: undefined, component: undefined },
                                        history: {
                                            inDropdown: false,
                                            className: undefined,
                                            component: undefined,
                                            dropdownClassName: undefined,
                                            options: ['undo', 'redo'],
                                            undo: { icon: "undo", className: undefined },
                                            redo: { icon: "redo", className: undefined },
                                        },
                                    }
                                }
                            />
                            // <Input size="large" placeholder="Nhập mô tả sản phẩm" status={errors.description && 'error'} {...field} />

                        )}
                    />
                    {errors.description && <Typography.Text type='danger'>{errors.description?.message}</Typography.Text>}
                </div>

                <div className='flex flex-col'>
                    <Typography.Text>Thông tin bảo quản</Typography.Text>
                    <Controller
                        control={control}
                        name="preserveInformation"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập thông tin bảo quản !'
                            }
                        }}
                        render={({ field }) => (
                            <Input size="large" placeholder="Nhập thông tin bảo quản" status={errors.preserveInformation && 'error'} {...field} />

                        )}
                    />
                    {errors.preserveInformation && <Typography.Text type='danger'>{errors.preserveInformation?.message}</Typography.Text>}
                </div>

                <div className='flex flex-col'>
                    <Typography.Text>Chính sách đổi trả</Typography.Text>
                    <Controller
                        control={control}
                        name="deliveryReturnPolicy"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập chính sách đổi trả !'
                            }
                        }}
                        render={({ field }) => (
                            <Input size="large" placeholder="Nhập chính sách đổi trả" status={errors.deliveryReturnPolicy && 'error'} {...field} />

                        )}
                    />
                    {errors.deliveryReturnPolicy && <Typography.Text type='danger'>{errors.deliveryReturnPolicy?.message}</Typography.Text>}
                </div>
                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
            </Space>
        </Card>
    )
}

export default memo(FormInfoBasic)