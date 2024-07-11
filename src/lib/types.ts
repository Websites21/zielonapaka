export type TProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
};

export type TUser = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
};

export type TCartItem = {
  id: string;
  cartID: string;
  productID: string;
  quantity: number;
};

export type TCartItemWithProductDetails = TCartItem & {
  product: TProduct;
};

export type TCheckoutForm = {
  clientSecret: string;
  totalPrice: number;
  email: string;
};

export type TPaymentInputs = {
  totalPrice: number;
  email: string;
};
