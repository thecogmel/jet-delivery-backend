import { Address } from 'src/address/entities/address.entity';

export class User {
  id?: number;
  username: string;
  name: string;
  password: string;
  phone?: string;
  addresses: Address[];
}
