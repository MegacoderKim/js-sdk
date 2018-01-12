import { TimeStringPipe } from './time-string.pipe';

describe('TimeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
