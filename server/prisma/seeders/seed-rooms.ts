import { INestApplicationContext } from '@nestjs/common';
import { RoomService } from '../../src/room/room.service';
import { faker } from '@faker-js/faker/locale/en';
import { CategoryService } from 'src/category/category.service';

export interface SeedRoomProps {
  app: INestApplicationContext;
  count: number;
}

const rooms = [
  {
    type: 'standard',
    description: faker.lorem.paragraph(),
    amount: 1500,
  },
];

const getFakeRoom = () => {
  const roomInfo = faker.helpers.arrayElement(rooms);
  return roomInfo;
};

export const seedRooms = async (props: SeedRoomProps) => {
  const { app, count } = props;

  const roomService = app.get(RoomService);

  const categoryService = app.get(CategoryService);

  const [category] = await categoryService.findAll();

  console.log(`Starting to seed ${count} rooms...`);
  for (let i = 0; i < count; i++) {
    const room = getFakeRoom();

    await roomService.create({
      ...room,
      roomNumber: i + 1,
      categoryId: category.id,
    });
  }
  console.log(`Done seeding ${count} rooms...`);
};
