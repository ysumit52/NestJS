import { TestingModule, Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';

const oneUser = {
  id: 10,
  name: 'Sumit',
  email: 'szmith1119245@gmais4l.com',
  password: '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
};

// const oneUserRemove = {
//   name: 'Sumit',
//   email: 'szmith1119245@gmais4l.com',
//   password: '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
// };

const findAllUser = [
  {
    id: 10,
    name: 'Sumit',
    email: 'szmith1119245@gmais4l.com',
    password: '$2a$10$gTB0sRieWoW7KQJFs3LHFuhx4ouhd3GnKjRf8F66CsmApnyixFJT2'
  }
];

describe('UsersController', () => {
  let usersService: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(findAllUser),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn().mockResolvedValue(oneUser),
            delete: jest.fn()
          }
        }
      ]
    }).compile();
    usersService = app.get<UsersService>(UsersService);
    repository = app.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should find all users ', async () => {
      const users = await usersService.getAllUsers();
      expect(users).toEqual(findAllUser);
    });
  });

  describe('getUserById', () => {
    it('get user by id', () => {
      const spyRepo = jest.spyOn(repository, 'findOneBy');
      expect(usersService.getUserById(10)).resolves.toEqual(oneUser);
      expect(spyRepo).toBeCalledWith({ id: 10 });
    });
  });

  describe('createUser', () => {
    it('create user', () => {
      expect(usersService.createUser(oneUser)).resolves.toEqual(oneUser);
    });
  });

  describe('deleteById', () => {
    it('remove the user', async () => {
      const repoSpy = jest.spyOn(repository, 'remove');
      const returnValue = await usersService.deleteById(10);
      expect(repoSpy).toBeCalledWith(oneUser);
      expect(returnValue).toEqual(oneUser);
    });
  });
});
