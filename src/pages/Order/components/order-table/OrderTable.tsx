import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { usePagination } from '@/hooks/helpers';
import { orderService, productService } from '@/services';
import { columns } from './columns';
import { CustomHeader } from './components';

const ProductTable = () => {
  const { data } = usePagination(
    'ListOrders',
    {
      page: 1,
      limit: 10,
      offset: 0,
    },
    orderService.getAll,
  );

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  // const columns: TableColumn<StoreProduct>[] = [
  //     {
  //         id: 'name',
  //         name: 'PRODUCT',
  //         selector: row => row.name,
  //         cell: (row, index, column, id) => {
  //             return <div className='w-28'>
  //                 <Image className="rounded-lg"  src={process.env.REACT_APP_API_URL + row.storedProducts[0].colors[0].images[0]} />
  //             </div>
  //         }
  //     },
  //     {
  //         id: 'category',
  //         name: 'CATEGORY',
  //         selector: row => row.category.name,
  //         cell: (row, index, column, id) => {
  //             return <div>
  //                 <Typography>{row.category.name}</Typography>
  //             </div>
  //         }
  //     },
  //     {
  //         name: 'PRICE',
  //         selector: row => row.price,
  //         cell: (row, index, column, id) => {
  //             return <div>
  //                 <Typography className="font-bold">{row.price.toLocaleString('VN')} đ</Typography>
  //             </div>
  //         }
  //     },
  // ];

  console.log(data);

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
        subHeaderComponent={<CustomHeader />}
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
