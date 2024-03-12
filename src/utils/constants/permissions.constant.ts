type StoreDefaultPermission = {
  _id: string;
  name: string;
  permissions: string[];
};
export const DEFAULT_PERMISSIONS: StoreDefaultPermission[] = [
  {
    _id: 'Category',
    name: 'Quản Lý Danh Mục',
    permissions: ['', 'ReadCategory', 'CreateCategory', 'UpdateCategory', 'DeleteCategory'],
  },
  {
    _id: 'Product',
    name: 'Quản Lý Sản Phẩm',
    permissions: ['', 'ReadProduct', 'CreateProduct', 'UpdateProduct', 'DeleteProduct'],
  },

  {
    _id: 'CategoryBlog',
    name: 'Quản Lý Danh Mục Bài Viết',
    permissions: [
      '',
      'ReadCategoryBlog',
      'CreateCategoryBlog',
      'UpdateCategoryBlog',
      'DeleteCategoryBlog',
    ],
  },
  {
    _id: 'Blog',
    name: 'Quản Lý Bài Viết',
    permissions: ['', 'ReadBlog', 'CreateBlog', 'UpdateBlog', 'DeleteBlog'],
  },

  {
    _id: 'Customer',
    name: 'Quản Lý Khách Hàng',
    permissions: ['BlockCustomer', 'ReadCustomer', '', 'UpdateCustomer', 'DeleteCustomer'],
  },

  {
    _id: 'Order',
    name: 'Quản Lý Đơn Hàng',
    permissions: ['', 'ReadOrder', 'CreateOrder', 'UpdateOrder', 'DeleteOrder'],
  },
  {
    _id: 'Brand',
    name: 'Quản Lý Thương Hiệu',
    permissions: ['', 'ReadBrand', 'CreateBrand', 'UpdateBrand', 'DeleteBrand'],
  },
  {
    _id: 'Review',
    name: 'Quản Lý Đánh Giá',
    permissions: ['', 'ReadReview', 'CreateReview', 'UpdateReview', 'DeleteReview'],
  },
];
