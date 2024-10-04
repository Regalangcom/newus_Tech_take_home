export interface ProductsData {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image : string;
}



export interface ProductState {
  products : ProductsData[];
  loading : boolean;
  error: string | null;
}



export interface UserAllData {
  users : TopLevel[],
  loading : boolean;
  error : string | null;
}

export interface TopLevel {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address;
  phone:    string;
  website:  string;
  company:  Company;
}

export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}

















