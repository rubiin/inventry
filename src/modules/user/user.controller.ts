import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return { message: 'success', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);

    return { message: 'success', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {


    
    const data = await this.userService.update(+id, updateUserDto);

     return { message: 'success', data };
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    const data = await this.userService.remove(+id);

     return { message: 'success', data };
  }
}
