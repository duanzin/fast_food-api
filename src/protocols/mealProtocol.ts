export type MealParams = {
  id: number;
  product: string;
  quantity: number;
  customer: string;
  status: boolean;
};

export type CreateMealParams = Omit<MealParams, "id" | "status">;
