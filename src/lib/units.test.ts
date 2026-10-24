import { describe, expect, it } from 'vitest';
import type { UnitDirectory } from '../data/units';
import { checkUnit, normalise } from './units';

const fixture: UnitDirectory = {
  verified: true,
  blocks: [
    { block: '80', levels: { from: 1, to: 14 }, stacks: ['05', '06'], absent: ['14-06'] },
    { block: '82', levels: { from: 2, to: 14 }, stacks: ['10', '12'], extra: ['15-12'] },
  ],
};

describe('normalise', () => {
  it('pads single digits and strips noise', () => {
    expect(normalise('6')).toBe('06');
    expect(normalise('#06')).toBe('06');
    expect(normalise('006')).toBe('06');
    expect(normalise('12')).toBe('12');
    expect(normalise('')).toBe('');
    expect(normalise('0')).toBe('00');
  });
});

describe('checkUnit', () => {
  it('accepts a unit that exists in the given block', () => {
    expect(checkUnit(fixture, { block: '82', level: '06', unit: '12' })).toEqual({
      valid: true,
      blocks: ['82'],
    });
  });

  it('rejects a unit stack the block does not have', () => {
    expect(checkUnit(fixture, { block: '82', level: '06', unit: '13' }).valid).toBe(false);
  });

  it('rejects a unit that exists only in a different block', () => {
    expect(checkUnit(fixture, { block: '82', level: '06', unit: '05' }).valid).toBe(false);
  });

  it('searches every block when block is omitted', () => {
    expect(checkUnit(fixture, { level: '6', unit: '5' })).toEqual({ valid: true, blocks: ['80'] });
    expect(checkUnit(fixture, { block: ' ', level: '6', unit: '12' }).blocks).toEqual(['82']);
  });

  it('rejects levels outside the block range', () => {
    expect(checkUnit(fixture, { block: '82', level: '01', unit: '12' }).valid).toBe(false);
    expect(checkUnit(fixture, { block: '80', level: '15', unit: '05' }).valid).toBe(false);
    expect(checkUnit(fixture, { block: '80', level: '00', unit: '05' }).valid).toBe(false);
  });

  it('honours absent and extra units', () => {
    expect(checkUnit(fixture, { block: '80', level: '14', unit: '06' }).valid).toBe(false);
    expect(checkUnit(fixture, { block: '82', level: '15', unit: '12' }).valid).toBe(true);
  });

  it('rejects unknown blocks and incomplete input', () => {
    expect(checkUnit(fixture, { block: '99', level: '06', unit: '12' }).valid).toBe(false);
    expect(checkUnit(fixture, { level: '', unit: '12' }).valid).toBe(false);
    expect(checkUnit(fixture, { level: '06', unit: '' }).valid).toBe(false);
  });
});
