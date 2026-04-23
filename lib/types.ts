export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "alfajores" | "empolvados" | "chilenitos" | "packs";
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};
