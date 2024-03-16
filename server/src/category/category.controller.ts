import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllCategoryResponseDto } from './dto/fetch-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() payload: CreateCategoryDto) {
    await this.categoryService.create(payload);
  }

  @ApiExtraModels(FindAllCategoryResponseDto)
  @ApiResponse({
    status: 200,
    type: FindAllCategoryResponseDto,
    isArray: true,
  })
  @Get('/')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Put('edit/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateCategoryDto,
  ) {
    return await this.categoryService.edit(id, { ...payload });
  }

  @Delete('/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
