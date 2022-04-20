import {User} from "./user.entity"

export interface Seller {
  id: number;
  user: User;
  created: Date;
}

export class SellerConvert {
  public static toSeller(json: string): Seller {
    return JSON.parse(json);
  }

  public static sellerToJson(value: Seller): string {
    return JSON.stringify(value);
  }
}
