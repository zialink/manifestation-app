// Validation test for userSchema
import { userSchema } from '../lib/validations/user';

describe('userSchema validation', () => {
  it('should validate a correct user', () => {
    const result = userSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('should fail for short password', () => {
    const result = userSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: '123',
    });
    expect(result.success).toBe(false);
  });
});
