// API route test for /api/public/hypnosis
import { GET } from '../app/api/public/hypnosis/route';

describe('/api/public/hypnosis API', () => {
  it('should return hypnosis scripts', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
