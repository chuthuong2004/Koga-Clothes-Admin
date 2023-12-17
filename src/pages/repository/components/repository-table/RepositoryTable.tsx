import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { usePagination, useSearch } from '@/hooks/helpers';
import { brandService, repositoryService } from '@/services';
import { columns } from './columns';
import { RepositoryHeader } from './components';
import { useCallback, useState } from 'react';

export type FilterBrand ={
  creator: string[],
  limit: number;
}
const RepositoryTable = () => {
  const { onChangeSearch, debounceSearch, search } = useSearch()
  const [filter, setFilter] = useState<FilterBrand>({
    creator: [],
    limit: 10,
  })
  const { data, } = usePagination(
    'ListRepositoryManagement',
    {
      page: 1,
      limit: filter.limit,
      search: debounceSearch,
      creator: filter.creator.join(',')
    },
    repositoryService.getAll,
  );

  const handleChangeFilter = useCallback((value: string[] | string, field: keyof FilterBrand ) => {
    console.log(value);
    setFilter(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseInt(value, 10) : value, 
    }))
  }, [])

  const paginationComponentOptions = {
    rowsPerPageText: 'Số item trên trang',
    rangeSeparatorText: 'trong số',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tất cả',
  };
  console.log(filter);

  return (
    <div className="flex flex-col">
      <DataTable
        columns={columns}
        selectableRows
        data={data?.docs || []}
        pagination
        responsive
        noHeader
        subHeaderWrap
        subHeaderAlign={Alignment.CENTER}
        subHeader
        subHeaderComponent={<RepositoryHeader search={search} onChangeSearch={onChangeSearch} onChangeFilter={handleChangeFilter} />}
        direction={Direction.LTR}
        customStyles={{
          cells: {
            style: {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
          subHeader: {
            style: {
              // borderRadius: 20,
            },
          },
        }}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default RepositoryTable;
