import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '邮箱为字符串格式' })
  @IsEmail({}, { message: '邮箱格式不规范' })
  readonly email: string;

  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 18, { message: '密码长度必须在 6 到 18 位之间' })
  @Matches(/^[A-Za-z0-9\-./]+$/, {
    message: '密码只能包含字母、数字、-、.、/ 这些字符',
  })
  readonly password: string;
}
