type Adress = {
  country: string;
  city: string;
  street: string;
  house: string;
};

export type ReactHookFormFields = {
  email: string;
  name: string;
  address: Adress;
};

export type Options = {
  value: string;
  label: string;
};
