import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { catchError } from 'src/lib/error';
import { ROOM_STATUS } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, description }: CreateCategoryDto) {
    try {
      await this.prisma.category.create({ data: { name, description } });
    } catch (err) {
      catchError(err);
    }
  }

  async findAll() {
    return await this.prisma.category.findMany({
      where: { isArchived: false },
    });
  }

  async edit(id: number, { name, description }: CreateCategoryDto) {
    try {
      await this.prisma.category.update({
        where: { id },
        data: { name, description },
      });
    } catch (err) {
      catchError(err);
    }
  }

  async deleteCategory(id: number) {
    try {
      const isCategoryExist = await this.prisma.room.findFirst({
        where: {
          categoryId: id,
          AND: {
            status: ROOM_STATUS.AVAILABLE,
          },
        },
      });

      if (isCategoryExist)
        throw new BadRequestException(
          'Category cannot be deleted as it is been used in rooms',
        );

      await this.prisma.category.update({
        where: { id },
        data: { isArchived: true },
      });
    } catch (err) {
      catchError(err);
    }
  }
}
