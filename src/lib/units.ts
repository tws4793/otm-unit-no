import type { BlockLayout, UnitDirectory } from '../data/units';

export interface UnitQuery {
  /** Optional; when blank every block is searched. */
  block?: string;
  level: string;
  unit: string;
}

export interface UnitResult {
  valid: boolean;
  /** Blocks in which the level/unit exists. */
  blocks: string[];
}

/** Strips non-digits and leading zeros, then pads to two digits ("6" → "06"). */
export function normalise(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  return digits === '' ? '' : digits.padStart(2, '0');
}

function hasUnit(layout: BlockLayout, level: string, unit: string): boolean {
  const key = `${level}-${unit}`;
  if (layout.extra?.includes(key)) return true;
  if (layout.absent?.includes(key)) return false;
  const n = Number(level);
  return n >= layout.levels.from && n <= layout.levels.to && layout.stacks.includes(unit);
}

export function checkUnit(directory: UnitDirectory, query: UnitQuery): UnitResult {
  const level = normalise(query.level);
  const unit = normalise(query.unit);
  const block = query.block?.trim() ?? '';
  if (!level || !unit) return { valid: false, blocks: [] };

  const candidates = block ? directory.blocks.filter((b) => b.block === block) : directory.blocks;
  const blocks = candidates.filter((b) => hasUnit(b, level, unit)).map((b) => b.block);
  return { valid: blocks.length > 0, blocks };
}
