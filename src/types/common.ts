export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type IResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// brand name export interface

export interface IBrand {
  brandName: string;
  brandPhoto: string;
  _id: string;
}

// product type

export interface ISubcategory {
  subcategoryName: string;
  subcategoryId: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  categoryPhoto: string;
  categoryId: string;
  subcategory?: ISubcategory;
}

export interface IVariant {
  variantName: string;
  variantId: string;
  _id: string;
  discountPercentage: number;
  discountedPrice: number;
  inStock: number;
  isDefault: boolean;
  sellingPrice: number;
  stockAlert: number;
}

export interface IBlock {
  title: string;
  description: string;
  _id: string;
}

export interface ISpecification {
  sectionName: string;
  blocks: IBlock[];
  _id: string;
}

export interface ISeo {
  metaTitle: string;
  metaDescription: string;
  metaPhoto: string;
}

export interface IDefaultVariant {
  _id: string;
  variantName: string;
  variantPhotos: string[];
  inStock: number;
  stockAlert: number;
  buyingPrice: number;
  sellingPrice: number;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
  __v: number;
  soldQuantity: number;
}

export interface IBulk {
  minOrder: number;
  discount: number;
}

export interface IProduct {
  _id: string;
  productName: string;
  brand: IBrand;
  category: ICategory;
  defaultVariant: IDefaultVariant;
  productPhotos: string[];
  variants: IVariant[];
  series: string;
  model: string;
  specifications: ISpecification[];
  shortDescription: string;
  description: string;
  isQuickOrderActive: boolean;
  bulk?: IBulk;
  seo: ISeo;
  reviews: any[]; // Define review export interface if needed
  __v: number;
}

// Product type end
