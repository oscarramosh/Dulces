export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[]; // 👈 AGREGAR ESTO
  category: "alfajores" | "empolvados" | "chilenitos" | "packs";
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};