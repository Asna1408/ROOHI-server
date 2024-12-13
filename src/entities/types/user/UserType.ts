export type UserType = {
    _id?:string;
 name: string;
 email: string;
 password: string;
 phone: number;
 otp?: string;
 isBlocked?: boolean;
 verified?: boolean;
 stripeAccountId?:String;
 createdAt?: number;
 updatedAt?: number;

}



