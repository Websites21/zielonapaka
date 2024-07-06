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
