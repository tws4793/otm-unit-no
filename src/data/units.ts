/**
 * Unit directory for Optima @ Tanah Merah (78–88 Tanah Merah Kechil Avenue).
 *
 * Each block lists the unit stacks it contains and the levels those stacks run on.
 * Use `absent` for individual units that do not exist within that grid (e.g. a
 * penthouse that merges two stacks), and `extra` for units outside it.
 *
 * ⚠️ This is a best-effort layout. Verify it against the MCST unit register and set
 * `verified` to true; until then the app shows a "data not verified" notice.
 */

export interface BlockLayout {
  /** Block number as written on the building, e.g. "82". */
  block: string;
  /** Lowest and highest residential level, inclusive. */
  levels: { from: number; to: number };
  /** Unit (stack) numbers present on every level, e.g. ["09", "10"]. */
  stacks: string[];
  /** Units inside the grid that do not exist, as "LL-UU" (e.g. "14-10"). */
  absent?: string[];
  /** Units outside the grid that do exist, as "LL-UU". */
  extra?: string[];
}

export interface UnitDirectory {
  verified: boolean;
  blocks: BlockLayout[];
}

export const directory: UnitDirectory = {
  verified: false,
  blocks: [
    { block: '78', levels: { from: 1, to: 14 }, stacks: ['01', '02', '03', '04'] },
    { block: '80', levels: { from: 1, to: 14 }, stacks: ['05', '06', '07', '08'] },
    { block: '82', levels: { from: 1, to: 14 }, stacks: ['09', '10', '11', '12'] },
    { block: '84', levels: { from: 1, to: 14 }, stacks: ['13', '14', '15', '16'] },
    {
      block: '86',
      levels: { from: 1, to: 14 },
      stacks: ['17', '18', '19', '20', '21', '22', '23'],
    },
    { block: '88', levels: { from: 1, to: 14 }, stacks: ['24', '25', '26', '27'] },
  ],
};
