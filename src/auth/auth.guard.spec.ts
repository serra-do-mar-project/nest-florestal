<<<<<<< HEAD
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
=======
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
>>>>>>> c2b7251945ffeef34e8f235c6ec501514ea14a81
  });
});
