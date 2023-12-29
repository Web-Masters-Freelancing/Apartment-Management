import { INestApplicationContext } from '@nestjs/common';
import { RoomService } from '../../src/room/room.service';
import { faker } from '@faker-js/faker/locale/en';

export interface SeedRoomProps {
  app: INestApplicationContext;
  count: number;
}

const rooms = [
  {
    type: 'deluxe',
    description: faker.lorem.paragraph(),
    amount: 5000,
  },
  {
    type: 'family',
    description: faker.lorem.paragraph(),
    amount: 3000,
  },
  {
    type: 'bedspacer',
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

  for (let i = 0; i < count; i++) {
    const room = getFakeRoom();

    await roomService.create({ ...room });
  }
};
