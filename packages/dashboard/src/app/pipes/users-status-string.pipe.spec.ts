import { UsersStatusStringPipe } from './users-status-string.pipe';

describe('UsersStatusStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UsersStatusStringPipe();
    expect(pipe).toBeTruthy();
  });
});
