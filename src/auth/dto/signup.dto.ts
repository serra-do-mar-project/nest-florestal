import { IsNotEmpty } from "class-validator";


export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: number;
}