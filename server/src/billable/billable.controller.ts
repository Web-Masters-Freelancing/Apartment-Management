import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BillableService } from './billable.service';
import { FindAllBillableResponseDto } from './dto/find-all.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('billable')
export class BillableController {
  constructor(private readonly billableService: BillableService) {}

  @ApiExtraModels(FindAllBillableResponseDto)
  @ApiResponse({
    status: 200,
    type: FindAllBillableResponseDto,
    isArray: true,
  })
  @Get('/')
  async findAll(): Promise<FindAllBillableResponseDto[]> {
    return await this.billableService.findAll();
  }

  @Post('pay')
  async processPayment(@Body() body: ProcessPaymentDto) {
    await this.billableService.processPayment(body);
  }
}
