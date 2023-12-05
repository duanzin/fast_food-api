export interface Product {
  name: string;
  quantity: number;
}

export interface CreateMealParams {
  customer: string;
  observation?: string;
  products: Product[];
}

export interface ReceiveMealParams extends CreateMealParams {
  id: number;
  status: boolean;
}
