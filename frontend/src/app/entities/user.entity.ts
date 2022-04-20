export interface User {
  id: number;
  first_name: string;
  last_name: string;
  created: Date;
}

export class UserConvert {
  public static toUser(json: string): User {
    return JSON.parse(json);
  }

  public static userToJson(value: User): string {
    return JSON.stringify(value);
  }
}
