export type StoreSizeGuideSize  ={
    sizeNumber: number;
    sizeChar: string;
  }
  export type StoreSizeParam  ={
    name: string;
    value: number[];
  }
  export type StoreGuideSize  ={
    name: string;
    title: string;
    sizes: StoreSizeGuideSize[];
    sizeParameters: StoreSizeParam[];
  }
  