import { TestingModule, Test } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/user.dto';

// const createUserDto: CreateUserDto = {
//   name: 'knight',
//   email: 'email1',
//   password: 'test123'
// };

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue([
              {
                id: 10,
                name: 'Sumit',
                email: 'szmith1119245@gmais4l.com',
                password:
                  '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
              }
            ]),
            getUserById: jest.fn().mockImplementation((id: string) => {
              Promise.resolve({
                id: Number(id),
                name: 'Sumit',
                email: 'szmith1119245@gmais4l.com',
                password:
                  '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
              });
            }),
            createUser: jest.fn()
          }
        }
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.getAllUsers();
      expect(usersService.getAllUsers).toHaveBeenCalled();
    });
  });

  // describe('getById', () => {
  //   it('get user by id', () => {
  //     expect(usersController.getUserById('10')).resolves.toEqual({
  //       id: 10,
  //       name: 'Sumit',
  //       email: 'szmith1119245@gmais4l.com',
  //       password: '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
  //     });
  //     expect(usersService.getUserById).toHaveBeenCalled();
  //   });
  // });
});
