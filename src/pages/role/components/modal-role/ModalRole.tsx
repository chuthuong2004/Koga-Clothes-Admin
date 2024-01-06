import { useRole } from '@/hooks/services';
import { ResponseMessage } from '@/types/commons';
import { StoreRole } from '@/types/entities';
import { DEFAULT_PERMISSIONS } from '@/utils';
import { Button, Checkbox, Input, Modal, ModalProps, Typography } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

type ModalRoleProps = ModalProps & {
  role?: StoreRole;
  onClose: () => void
};

type FormCreateRole = {
  name: string;
  permissions: string[];
};

const ModalRole = ({ role, onClose, ...passProps }: ModalRoleProps) => {
  const { mutate } = useSWRConfig()
  const { loading, onCreateRole, onUpdateRole } = useRole()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormCreateRole>({
    defaultValues: {
      name: '',
      permissions: [],
    },
  });
  useEffect(() => {
    if (role) {
      setValue('name', role.name);
      setValue('permissions', role.permissions);
    }
  }, [role, setValue]);
  const onSubmit = (data: FormCreateRole) => {
    console.log(data);
    const onSuccess = () => {
      toast.success(`${role ? 'Cập nhật' : "Tạo"} role thành công !`)
      mutate("ListRoles")
      onClose()
    }
    const onError = ({ message }: ResponseMessage) => {
      console.log(message);

    }
    if (role) {
      onUpdateRole(role._id, data, onSuccess, onError)
    } else {
      onCreateRole(data, onSuccess, onError)
    }

  };
  console.log('ROLE: ', role);

  return (
    <Modal
      {...passProps}
      title="Chỉnh sửa vai trò"
      onOk={handleSubmit(onSubmit)}
      // centered
      width={'50vw'}
      onCancel={passProps.onCancel}
      // width={890}
      footer={
        <div className=" flex justify-center">
          <Button key="submit" type="primary" loading={loading} disabled={loading} size="large" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          <Button key="back" size="large">
            Cancel
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <Typography.Text>Tên vai trò</Typography.Text>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              placeholder="Tên vai trò"
              size="large"
              {...field}
              status={errors.name ? 'error' : undefined}
            />
          )}
        />
        {errors.name && <Typography.Text type="danger" className="text-lg">{errors.name?.message}</Typography.Text>}
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <Typography.Text className="text-2xl  font-medium">Role permissions</Typography.Text>
        <Controller
          control={control}
          name="permissions"
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              {DEFAULT_PERMISSIONS.map((per) => (
                <div className="flex gap-4" key={per._id}>
                  <div className="min-w-[20rem]">
                    <Typography.Text>{per.name}</Typography.Text>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-4 justify-end items-end">
                    {per.permissions.map((item) =>
                      item ? (
                        <div key={item} className="flex-1 flex justify-end">
                          <Checkbox
                            className=""
                            checked={field.value.includes(item)}
                            value={item}
                            onChange={(e) =>
                              setValue(
                                'permissions',
                                field.value.includes(e.target.value)
                                  ? field.value.filter((item) => item !== e.target.value)
                                  : [...field.value, e.target.value],
                              )
                            }
                          >
                            {item.replace(per._id, '')}
                          </Checkbox>
                        </div>
                      ) : (
                        <div key={item}></div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </Modal>
  );
};

export default ModalRole;
