import { GenderCategory } from '@/types/commons/category.type';
import { EGenderCategory } from '@/types/enums/category.enum';

export const optionsGenderCategory: GenderCategory[] = [
  {
    label: EGenderCategory.Man,
    value: EGenderCategory.Man,
  },
  {
    label: EGenderCategory.Unisex,
    value: EGenderCategory.Unisex,
  },
  {
    label: EGenderCategory.Women,
    value: EGenderCategory.Women,
  },
];
