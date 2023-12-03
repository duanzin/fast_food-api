export type Product  = {
  name: string;
  quantity: number;
}

export type CreateMealParams = {
  customer: string;
  products: Product[];
}
