import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { usePagination, useSearch } from '@/hooks/helpers';
import { productService } from '@/services';
import { columns } from './columns';

import { CustomHeader } from './components';
import { useCallback, useState } from 'react';
import { FilterProduct } from '@/types/commons';
import { PATTERN_NUMBER } from '@/utils';
const ProductTable = () => {

  const { onChangeSearch, debounceSearch, search } = useSearch()
  const [filter, setFilter] = useState<FilterProduct>({
    category: [],
    brand: [],
    gender: '',
    limit: 10
  })
  const { data } = usePagination(
    'ListProducts',
    {
      page: 1,
      limit: 10,
      offset: 0,
      search: debounceSearch,
      category: filter.category.join(','),
      brand: filter.brand.join(','),
      gender: filter.gender
    },
    productService.getAll,
  );

  const handleChangeFilter = useCallback((value: string[] | string, field: keyof FilterProduct) => {
    console.log(value);
    setFilter(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? PATTERN_NUMBER.test(value) ? parseInt(value, 10) : value : value,
    }))
  }, [])
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

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
        subHeaderComponent={<CustomHeader search={search} onChangeSearch={onChangeSearch} onChangeFilter={handleChangeFilter} />}
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

export default ProductTable;
