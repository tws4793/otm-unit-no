/**
 * Unit directory for Optima @ Tanah Merah (78–88 Tanah Merah Kechil Avenue).
 *
 * Each block is described as a list of level ranges and the unit (stack) numbers
 * that exist on every level within that range.
 *
 * Transcribed from the developer's elevation chart. There is no residential Block 84.
 * Set `verified` to false to show the "not verified" notice if the data is in doubt.
 */

export interface LevelRange {
  /** Lowest and highest level of this range, inclusive. */
  from: number;
  to: number;
  /** Unit (stack) numbers present on every level in the range, e.g. ["09", "10"]. */
  units: string[];
}

export interface BlockLayout {
  /** Block number as written on the building, e.g. "82". */
  block: string;
  ranges: LevelRange[];
}

export interface UnitDirectory {
  verified: boolean;
  blocks: BlockLayout[];
}

const range = (from: number, to: number, ...units: string[]): LevelRange => ({ from, to, units });

export const directory: UnitDirectory = {
  verified: true,
  blocks: [
    {
      block: '78',
      ranges: [range(1, 1, '01'), range(2, 3, '01', '02'), range(4, 14, '01', '02', '03', '04')],
    },
    {
      block: '80',
      ranges: [
        range(1, 3, '05', '06'),
        range(4, 13, '05', '06', '07', '08'),
        // Penthouse #14-08 spans stacks 07 and 08.
        range(14, 14, '05', '06', '08'),
      ],
    },
    {
      block: '82',
      ranges: [
        range(1, 1, '10'),
        range(2, 3, '09', '10'),
        range(4, 13, '09', '10', '11', '12'),
        // Penthouse #14-12 spans stacks 11 and 12.
        range(14, 14, '09', '10', '12'),
      ],
    },
    {
      block: '86',
      ranges: [
        range(1, 13, '13', '14', '15', '16', '17', '18', '19'),
        // Penthouses each span two stacks.
        range(14, 14, '13', '15', '17', '19'),
      ],
    },
    {
      block: '88',
      ranges: [range(1, 14, '20', '21', '22', '23')],
    },
  ],
};
