/**
 * Unit directory for Optima @ Tanah Merah (78–88 Tanah Merah Kechil Avenue).
 *
 * Each block is described as a list of level ranges and the unit (stack) numbers
 * that exist on every level within that range.
 *
 * ⚠️ This is a best-effort layout. Verify it against the MCST unit register and set
 * `verified` to true; until then the app shows a "data not verified" notice.
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

export const directory: UnitDirectory = {
  verified: false,
  blocks: [
    { block: '78', ranges: [{ from: 1, to: 14, units: ['01', '02', '03', '04'] }] },
    { block: '80', ranges: [{ from: 1, to: 14, units: ['05', '06', '07', '08'] }] },
    { block: '82', ranges: [{ from: 1, to: 14, units: ['09', '10', '11', '12'] }] },
    { block: '84', ranges: [{ from: 1, to: 14, units: ['13', '14', '15', '16'] }] },
    {
      block: '86',
      ranges: [{ from: 1, to: 14, units: ['17', '18', '19', '20', '21', '22', '23'] }],
    },
    { block: '88', ranges: [{ from: 1, to: 14, units: ['24', '25', '26', '27'] }] },
  ],
};
