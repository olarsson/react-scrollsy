import { expect, test } from 'vitest';

import { calcDurationInPx, calcOffset } from './elementVisibility';
import { IScrollDataBase } from '../types';

const scrollData: IScrollDataBase = {
  scrollTop: 200,
  scrollHeight: 1000,
  containerHeight: 300,
  percentProgress: -1
};

// top

test('calculate offset (top, %, vp)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: '%',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(150);
});

test('calculate offset (top, px, vp)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: 'px',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(50);
});

test('calculate offset (top, %, elem)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: '%',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(250);
});

test('calculate offset (top, px, elem)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: 'px',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(50);
});

test('calculate offset (top, %, doc)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: '%',
      basedOn: 'doc'
    }
  });

  expect(data).toBe(500);
});

test('calculate offset (top, px, doc)', () => {
  const data = calcOffset({
    mode: 'top',
    scrollData,
    elementScrollHeight: 500,
    offsetTop: {
      distance: 50,
      unit: 'px',
      basedOn: ''
    }
  });

  expect(data).toBe(50);
});

// bottom

test('calculate offset (bottom, %, vp)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: '%',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(150);
});

test('calculate offset (bottom, px, vp)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: 'px',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(50);
});

test('calculate offset (bottom, %, elem)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: '%',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(250);
});

test('calculate offset (bottom, px, elem)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: 'px',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(50);
});

test('calculate offset (bottom, %, doc)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: '%',
      basedOn: 'doc'
    }
  });

  expect(data).toBe(500);
});

test('calculate offset (bottom, px, doc)', () => {
  const data = calcOffset({
    mode: 'bottom',
    scrollData,
    elementScrollHeight: 500,
    offsetBottom: {
      distance: 50,
      unit: 'px',
      basedOn: ''
    }
  });

  expect(data).toBe(50);
});

// duration

test('duration in px (%, vp)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: '%',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(100);
});

test('duration in px (px, vp)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: 'px',
      basedOn: 'vp'
    }
  });

  expect(data).toBe(50);
});

test('duration in px (%, elem)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: '%',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(100);
});

test('duration in px (px, elem)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: 'px',
      basedOn: 'elem'
    }
  });

  expect(data).toBe(50);
});

test('duration in px (%, doc)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: '%',
      basedOn: 'doc'
    }
  });

  expect(data).toBe(100);
});

test('duration in px (px, doc)', () => {
  const data = calcDurationInPx({
    heightDuration: 200,
    duration: {
      distance: 50,
      unit: 'px',
      basedOn: 'doc'
    }
  });

  expect(data).toBe(50);
});
