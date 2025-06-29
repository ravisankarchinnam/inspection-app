export type Address = {
  street: string;
  number: string;
  city: string;
  postalCode: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Property = {
  _id?: string;
  name: string;
  address: Address;
  createdAt?: string;
  updatedAt?: string;
};
