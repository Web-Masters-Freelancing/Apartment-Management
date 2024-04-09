import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { SeedRoomProps } from './seed-rooms';
import { faker } from '@faker-js/faker';
import { CategoryService } from 'src/category/category.service';
export type SeedCategoryProps = Pick<SeedRoomProps, 'app'>;

export const seedCategory = async (props: SeedCategoryProps) => {
  const { app } = props;

  const payload: CreateCategoryDto = {
    name: faker.animal.bear(),
    description: faker.lorem.sentence(),
  };

  const categoryService = app.get(CategoryService);

  await categoryService.create({ ...payload });
};
