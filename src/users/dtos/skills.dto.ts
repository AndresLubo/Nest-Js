import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}

export class UpdateSkillDto extends PartialType(CreateSkillsDto) {}
