import { JwtDecodeMiddleware } from './jwt-decode.middleware';

describe('JwtDecodeMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtDecodeMiddleware()).toBeDefined();
  });
});
