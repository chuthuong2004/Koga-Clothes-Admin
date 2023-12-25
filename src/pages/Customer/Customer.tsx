import React from 'react';
import { StatsCustomer, CustomerTable } from './components';
const Customer = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsCustomer />
      <CustomerTable />
    </div>
  );
};

export default Customer;
