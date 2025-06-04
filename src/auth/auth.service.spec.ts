import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should throw error if user already exists', async () => {
      jest.spyOn(service['prisma'].fiscal, 'findUnique').mockResolvedValueOnce({
        CPF: '545.434.343-43',
        Nome: 'Test User',
        Senha: 'hashedpassword',
        Tipo: 0,
      });

      await expect(
        service.signup({
          cpf: '545.434.343-43',
          password: '123456',
          name: 'Test User',
          type: 0,
        }),
      ).rejects.toThrowError('Usuário já existe');
    });

    it('should register a user', async () => {
      jest.spyOn(service['prisma'].fiscal, 'findUnique').mockResolvedValueOnce(null);
      jest.spyOn(service['prisma'].fiscal, 'create').mockResolvedValueOnce({
        CPF: '545.434.343-43',
        Nome: 'Test User',
        Senha: 'hashedpassword',
        Tipo: 0,
      });
      jest.spyOn(service['jwtService'], 'sign').mockReturnValue('fake-token');

      const result = await service.signup({
        cpf: '545.434.343-43',
        password: '123456',
        name: 'Test User',
        type: 0,
      });

      expect(result).toEqual({
        message: 'Usuário registrado com sucesso!',
        token: 'fake-token',
      });
    });
  });

  describe('signin', () => {
    it('should throw error if user not found', async () => {
      jest.spyOn(service['prisma'].fiscal, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.signin({ cpf: '545.434.343-43', password: '123456' }),
      ).rejects.toThrowError('Usuário não encontrado');
    });

    it('should throw error if password is invalid', async () => {
      jest.spyOn(service['prisma'].fiscal, 'findUnique').mockResolvedValueOnce({
        CPF: '545.434.343-43',
        Nome: 'Test User',
        Senha: 'hashedpassword', // senha errada simulada
        Tipo: 0,
      });

      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(false);

      await expect(
        service.signin({ cpf: '545.434.343-43', password: 'wrongpassword' }),
      ).rejects.toThrowError('Credenciais inválidas');
    });

    it('should login a user', async () => {
      jest.spyOn(service['prisma'].fiscal, 'findUnique').mockResolvedValueOnce({
        CPF: '545.434.343-43',
        Nome: 'Test User',
        Senha: 'hashedpassword',
        Tipo: 0,
      });

      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(true);
      jest.spyOn(service['jwtService'], 'sign').mockReturnValue('fake-token');

      const result = await service.signin({
        cpf: '545.434.343-43',
        password: '123456',
      });

      expect(result).toEqual({
        message: 'Login bem-sucedido!',
        token: 'fake-token',
      });
    });
  });
});
