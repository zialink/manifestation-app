// API route test for /api/public/affirmations
import { GET } from '../app/api/public/affirmations/route';

describe('/api/public/affirmations API', () => {
  it('should return affirmations', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
