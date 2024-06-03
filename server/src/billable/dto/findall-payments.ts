import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Billable as BillableEntity } from './../../_gen-prisma-classes/billable';
import { Room as RoomEntity } from './../../_gen-prisma-classes/room';
import { Payments as PaymentsEntity } from './../../_gen-prisma-classes/payments';
import { User as UserEntity } from './../../_gen-prisma-classes/user';
import { Category as CategoryEntity } from './../../_gen-prisma-classes/category';
import { FindAllPaymentsForFindAllBillableResponseDto } from './find-all.dto';

export class FindAllPaymentsDto extends PickType(
  IntersectionType(BillableEntity, PaymentsEntity, RoomEntity, CategoryEntity),
  ['id', 'dueDate', 'roomNumber', 'description', 'amountDue'],
) {
  @ApiProperty({ type: String })
  @IsString()
  userName: UserEntity['name'];

  @ApiProperty({ type: String })
  @IsString()
  contact: UserEntity['contact'];

  @ApiProperty({ type: String })
  @IsString()
  address: UserEntity['address'];

  @ApiProperty({ type: String })
  @IsString()
  categoryName: CategoryEntity['name'];

  @ApiProperty({
    type: FindAllPaymentsForFindAllBillableResponseDto,
    isArray: true,
  })
  @IsArray({ each: true })
  payments: FindAllPaymentsForFindAllBillableResponseDto[];
}
