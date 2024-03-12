import React from 'react';
import { RepositoryTable, StatsRepository } from './components';
const Repository = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsRepository />
      <RepositoryTable />
    </div>
  );
};

export default Repository;
