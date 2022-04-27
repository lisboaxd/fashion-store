export interface Product {
	id: number;
	category: string;
	created: Date;
	product: string;
	price: number;
	description: string;
	total_price: number | any;
	discount: number;
	price_with_discount: number;
}

export class ProductConvert {
	public static toProduct(json: string): Product {
		return JSON.parse(json);
	}

	public static categoryToJson(value: Product): string {
		return JSON.stringify(value);
	}
}
