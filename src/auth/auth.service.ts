import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import User from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password } = signUpDto;

    const isEmail = await this.userService.findOneByEmail(email);

    if (isEmail) {
      throw new HttpException('User already existed', HttpStatus.BAD_REQUEST);
    }

    signUpDto.password = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser(signUpDto);
    console.log(user);
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
