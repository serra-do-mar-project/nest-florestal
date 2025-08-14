import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should call authService.signup with correct dto', async () => {
      const dto: SignupDto = {
        name: 'John Doe',
        cpf: '90760947058',
        password: 'securePass123',
        type: 1,
      };

      const result = { message: 'User created' };
      mockAuthService.signup.mockResolvedValue(result);

      const response = await authController.signup(dto);
      expect(mockAuthService.signup).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('signin', () => {
    it('should call authService.signin with correct dto', async () => {
      const dto: SigninDto = {
        cpf: '12345678901',
        password: 'teste',
      };

      const result = { accessToken: 'jwt.token.here' };
      mockAuthService.signin.mockResolvedValue(result);

      const response = await authController.signin(dto);
      expect(mockAuthService.signin).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });
});
