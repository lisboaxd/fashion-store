import { Seller } from "./seller.entity";

export interface Category {
	id: number;
	category: string;
	seller: Seller;
	created: Date;
}

export class CategoryConvert {
	public static toCategory(json: string): Category {
		return JSON.parse(json);
	}

	public static categoryToJson(value: Category): string {
		return JSON.stringify(value);
	}
}
