import { PickType } from '@nestjs/swagger';
import { Category as CategoryEntity } from './../../_gen-prisma-classes/category';

export class CreateCategoryDto extends PickType(CategoryEntity, [
  'name',
  'description',
]) {}
