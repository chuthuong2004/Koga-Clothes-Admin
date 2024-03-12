import { routes } from '@/config';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomHeader = () => {
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col border-b-slate-100" />
      <div className="flex w-full justify-between items-center mt-8">
        <div>
          <Input size="large" placeholder="Search" />
        </div>
        <Space>
          <Select
            size="large"
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
        </Space>
      </div>
    </div>
  );
};

export default CustomHeader;
