import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
