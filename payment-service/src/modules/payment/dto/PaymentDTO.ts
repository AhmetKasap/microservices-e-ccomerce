import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class PaymentDTO{
    @IsNotEmpty()
    @Length(3,50) 
    cardName : string

    @IsNotEmpty()
    @Length(16,16) 
    cardNumber : string

    @IsNotEmpty()
    @Length(3,3) 
    cardCvv : string

    @IsNotEmpty()
    @Length(2,2)
    cardMonthDate : string

    @IsNotEmpty()
    @Length(2,2)
    cardYearDate : string


   
}