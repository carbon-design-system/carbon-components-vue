import { splitSlotArgs } from '../';

describe('splitSlotArgs', () => {
  it('Should cope with null', () => {
    expect(splitSlotArgs()).toEqual({
      args: {},
      slotArgs: {},
    });
  });

  it('shold split args and slot args', () => {
    expect(
      splitSlotArgs({
        abc: 'abc',
        def: 'def',
        'slotArgs.ghi': 'ghi',
        'slotArgs.jkl': 'jkl',
      })
    ).toEqual({
      args: {
        abc: 'abc',
        def: 'def',
      },
      slotArgs: {
        ghi: 'ghi',
        jkl: 'jkl',
      },
    });
  });
});
