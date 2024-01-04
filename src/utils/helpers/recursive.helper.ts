import { StoreCategory, StoreCategoryBlog } from "@/types/entities"
import { DefaultOptionType } from "antd/es/select"

export const recursiveOptionTree = (categories: StoreCategory[] | StoreCategoryBlog[]): DefaultOptionType[]  => {
    return categories.length > 0  ? categories.map(cate => ({
      label: cate.name,
      value: cate._id,
      children: recursiveOptionTree(cate.children)
    })) : []
  }