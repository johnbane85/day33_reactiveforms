export interface Item {
  item: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  name: string;
  address: string;
  email: string;
  phone: string;
  express: boolean;
  delivery: string;
  Items: Item[];
}
