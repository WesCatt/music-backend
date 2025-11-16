import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString({
    message: '用户名必须是字符串',
  })
  @MaxLength(15, {
    message: '用户名称最长为 15 个字符',
  })
  @IsOptional()
  username?: string;

  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  @IsOptional()
  email?: string;
}
