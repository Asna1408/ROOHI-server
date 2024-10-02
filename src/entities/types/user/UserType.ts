export type UserType = {
 name: string;
 email: string;
 password: string;
 phone: number;
 otp?: string;
 isBlocked?: boolean;
 ProfilePicture?:string;
 alreadyRegistered?: boolean;
 resetToken?: string;
 resetTokenExpiration?: Date;
 verified?: boolean;
 createdAt?: number;
 updatedAt?: number;

}



