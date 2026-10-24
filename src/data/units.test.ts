import { describe, expect, it } from 'vitest';
import { checkUnit } from '../lib/units';
import { directory } from './units';

function count(block: string): number {
  const layout = directory.blocks.find((b) => b.block === block)!;
  return layout.ranges.reduce((sum, r) => sum + (r.to - r.from + 1) * r.units.length, 0);
}

const valid = (block: string, level: string, unit: string) =>
  checkUnit(directory, { block, level, unit }).valid;

describe('Optima @ Tanah Merah directory', () => {
  it('matches the published unit counts', () => {
    expect(count('78')).toBe(49);
    expect(count('80')).toBe(49);
    expect(count('82')).toBe(48);
    expect(count('86')).toBe(95);
    expect(count('88')).toBe(56);
    expect(directory.blocks.map((b) => count(b.block)).reduce((a, b) => a + b)).toBe(297);
  });

  it('has no Block 84', () => {
    expect(valid('84', '06', '13')).toBe(false);
  });

  it('accepts units from the elevation chart', () => {
    expect(valid('82', '06', '12')).toBe(true);
    expect(valid('82', '13', '10')).toBe(true);
    expect(valid('78', '11', '03')).toBe(true);
    expect(valid('78', '01', '01')).toBe(true);
    expect(valid('80', '01', '05')).toBe(true);
    expect(valid('80', '04', '07')).toBe(true);
    expect(valid('82', '01', '10')).toBe(true);
    expect(valid('86', '01', '18')).toBe(true);
    expect(valid('86', '14', '19')).toBe(true);
    expect(valid('88', '14', '23')).toBe(true);
    expect(valid('80', '14', '08')).toBe(true);
    expect(valid('82', '14', '12')).toBe(true);
  });

  it('rejects void and merged units', () => {
    expect(valid('82', '06', '13')).toBe(false);
    expect(valid('78', '01', '02')).toBe(false);
    expect(valid('78', '03', '03')).toBe(false);
    expect(valid('80', '02', '07')).toBe(false);
    expect(valid('80', '14', '07')).toBe(false);
    expect(valid('82', '01', '09')).toBe(false);
    expect(valid('82', '14', '11')).toBe(false);
    expect(valid('86', '14', '14')).toBe(false);
    expect(valid('88', '15', '20')).toBe(false);
  });
});
