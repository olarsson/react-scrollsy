import { expect, test } from 'vitest';

import { calcOffset } from './elementVisibility';

test('calculate offset (top, %, vp)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData: {
      scrollTop: 200,
      scrollHeight: 1000,
      containerHeight: 300,
      percentProgress: -1,
      element: undefined
    },
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: '%',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(150);
});
