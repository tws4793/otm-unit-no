import { useMemo, useRef, useState } from 'react';
import { directory } from './data/units';
import { checkUnit, normalise } from './lib/units';

const ANY = '';
const blocks = directory.blocks.map((b) => b.block);

export function App() {
  const [block, setBlock] = useState(ANY);
  const [level, setLevel] = useState('');
  const [unit, setUnit] = useState('');
  const levelRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);

  const complete = level !== '' && unit !== '';
  const result = useMemo(() => checkUnit(directory, { block, level, unit }), [block, level, unit]);
  const elsewhere = useMemo(
    () => (block && complete && !result.valid ? checkUnit(directory, { level, unit }).blocks : []),
    [block, complete, result.valid, level, unit],
  );

  function onLevelChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 2);
    setLevel(digits);
    if (digits.length === 2) unitRef.current?.focus();
  }

  function onUnitChange(value: string) {
    setUnit(value.replace(/\D/g, '').slice(0, 2));
  }

  function reset() {
    setBlock(ANY);
    setLevel('');
    setUnit('');
    levelRef.current?.focus();
  }

  const label = `#${normalise(level) || '__'}-${normalise(unit) || '__'}`;

  return (
    <div className="app">
      <header className="header">
        <h1>OTM Unit Check</h1>
      </header>

      <main className="main">
        {!directory.verified && (
          <p className="notice" role="note">
            Unit list not yet verified against the MCST register. Use with judgement.
          </p>
        )}

        <fieldset className="field">
          <legend>
            Block <span className="optional">(optional)</span>
          </legend>
          <div className="chips" role="radiogroup" aria-label="Block">
            {[ANY, ...blocks].map((b) => (
              <button
                key={b || 'any'}
                type="button"
                role="radio"
                aria-checked={block === b}
                className="chip"
                onClick={() => setBlock(b)}
              >
                {b || 'Any'}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="unit-row">
          <span className="hash" aria-hidden="true">
            #
          </span>
          <label className="unit-field">
            <span>Level</span>
            <input
              ref={levelRef}
              value={level}
              onChange={(e) => onLevelChange(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              placeholder="06"
              aria-label="Level"
              autoFocus
            />
          </label>
          <span className="dash" aria-hidden="true">
            –
          </span>
          <label className="unit-field">
            <span>Unit</span>
            <input
              ref={unitRef}
              value={unit}
              onChange={(e) => onUnitChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && unit === '') levelRef.current?.focus();
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              placeholder="12"
              aria-label="Unit"
            />
          </label>
        </div>

        <section
          className={`result ${complete ? (result.valid ? 'is-valid' : 'is-invalid') : 'is-idle'}`}
          aria-live="polite"
        >
          {complete ? (
            <>
              <p className="verdict">{result.valid ? '✓ Valid' : '✗ Invalid'}</p>
              <p className="detail">
                {result.valid
                  ? `Blk ${result.blocks.join(' / ')} ${label} exists`
                  : `${block ? `Blk ${block} ` : ''}${label} does not exist`}
              </p>
              {elsewhere.length > 0 && (
                <p className="detail">
                  {label} exists in Blk {elsewhere.join(' / ')} instead
                </p>
              )}
            </>
          ) : (
            <p className="detail">Enter level and unit</p>
          )}
        </section>

        <button type="button" className="reset" onClick={reset}>
          Clear
        </button>
      </main>
    </div>
  );
}
