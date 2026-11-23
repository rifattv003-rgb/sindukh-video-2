import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {INK} from '../theme';
import {FF, Pop} from './Ui';
import {Character} from './Character';

const split = (t: string): string[] => {
  try {
    const Seg = (Intl as any).Segmenter;
    if (Seg) return Array.from(new Seg('bn', {granularity: 'grapheme'}).segment(t), (x: any) => x.segment);
  } catch (e) { /* fall through */ }
  return Array.from(t);
};

/** Paper letter card. The text types in between `from` and `to - tail` (frames, local). */
export const LetterCard: React.FC<{
  from: number; to?: number; x: number; y: number; w?: number; text: string; size?: number;
  typed?: boolean; tail?: number; rot?: number; sender?: string; tint?: string;
}> = ({from, to, x, y, w = 760, text, size = 44, typed = true, tail = 12, rot = -1.5, sender, tint = '#FFF4D6'}) => {
  const fr = useCurrentFrame();
  const chars = React.useMemo(() => split(text), [text]);
  const end = (to ?? from + 240) - tail;
  const n = typed ? Math.round(interpolate(fr, [from + 6, end], [0, chars.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})) : chars.length;
  const shown = chars.slice(0, n).join('');
  const rest = chars.slice(n).join('');
  return (
    <Pop from={from} to={to} x={x} y={y} rot={rot}>
      <div style={{width: w, background: tint, border: `4px solid ${INK}`, borderRadius: 14, padding: '30px 38px 34px', boxShadow: '0 10px 0 rgba(0,0,0,0.25)',
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 66px, rgba(120,80,40,0.18) 66px, rgba(120,80,40,0.18) 68px)', position: 'relative'}}>
        <div style={{position: 'absolute', top: -22, left: 30, width: 90, height: 34, background: '#C0392B', border: `3px solid ${INK}`, borderRadius: 6}} />
        {sender && <div style={{fontFamily: FF, fontWeight: 600, fontSize: 28, color: '#7a5a35', marginBottom: 6}}>{sender}</div>}
        <div style={{fontFamily: FF, fontWeight: 600, fontSize: size, lineHeight: 1.5, color: '#3b2a1a', textAlign: 'left'}}>
          <span>{shown}</span><span style={{opacity: 0}}>{rest}</span>
        </div>
      </div>
    </Pop>
  );
};

/** Circular sepia memory flash with Dadi inside (hand-drawn character, sepia filtered) */
export const MemoryCircle: React.FC<{from: number; to?: number; x: number; y: number; size?: number; children?: React.ReactNode}> = ({
  from, to, x, y, size = 300, children,
}) => {
  const fr = useCurrentFrame();
  const flick = 0.92 + Math.sin(fr / 3) * 0.04;
  return (
    <Pop from={from} to={to} x={x} y={y} float>
      <div style={{width: size, height: size, borderRadius: '50%', border: `5px solid ${INK}`, overflow: 'hidden', position: 'relative',
        background: 'radial-gradient(circle at 50% 40%, #F3DDB0, #C79B62)', boxShadow: '0 0 0 10px rgba(255,255,255,0.6), 0 10px 0 rgba(0,0,0,0.2)', opacity: flick}}>
        <svg width={size} height={size} viewBox="0 0 400 400" style={{filter: 'sepia(0.75) saturate(0.9)'}}>
          <g transform="translate(200 470) scale(0.78)">
            <Character kind="dadi" x={0} y={0} scale={1} emotion="neutral" />
          </g>
          {children}
        </svg>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,0,0,0) 55%, rgba(60,30,0,0.45) 100%)'}} />
      </div>
    </Pop>
  );
};
