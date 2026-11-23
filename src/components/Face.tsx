import React from 'react';
import {INK, SW} from '../theme';
import {Cfg} from '../data/characters';

export type Emotion = 'neutral' | 'angry' | 'sad' | 'think' | 'surprised' | 'serious';

type Props = {
  cfg: Cfg; emotion: Emotion; mouth: 0 | 1 | 2; talking: boolean; blink: boolean;
  look?: number; // -1 left .. 1 right
};

const HY = -400; // head center y

export const Face: React.FC<Props> = ({cfg, emotion, mouth, talking, blink, look = 0}) => {
  const {headRx: rx, headRy: ry} = cfg;
  const ex = rx * 0.4;
  const ey = HY + 4;
  const big = emotion === 'surprised' ? 1.25 : 1;
  const eyeRy = (blink ? 1.5 : 15) * big;

  // eyebrows: [innerYOffset, outerYOffset] (negative = up)
  const brow: Record<Emotion, [number, number]> = {
    neutral: [-26, -28], angry: [-20, -36], sad: [-38, -24],
    think: [-26, -40], surprised: [-46, -46], serious: [-28, -28],
  };
  const [bi, bo] = brow[emotion];
  const browY = (side: number, inner: boolean) => ey + (inner ? bi : bo);

  const mY = HY + ry * 0.55;
  let mouthEl: React.ReactNode;
  if (talking && mouth > 0) {
    const h = mouth === 1 ? 9 : 18;
    const w = mouth === 1 ? 14 : 18;
    mouthEl = <ellipse cx={0} cy={mY + 4} rx={w} ry={h} fill="#7A2B2B" stroke={INK} strokeWidth={SW} />;
  } else if (emotion === 'surprised') {
    mouthEl = <ellipse cx={0} cy={mY + 4} rx={10} ry={13} fill="#7A2B2B" stroke={INK} strokeWidth={SW} />;
  } else if (emotion === 'sad' || emotion === 'angry') {
    mouthEl = <path d={`M -18 ${mY + 8} Q 0 ${mY - 6} 18 ${mY + 8}`} fill="none" stroke={INK} strokeWidth={SW + 1} strokeLinecap="round" />;
  } else if (emotion === 'think') {
    mouthEl = <path d={`M -12 ${mY + 2} Q 4 ${mY - 4} 16 ${mY - 2}`} fill="none" stroke={INK} strokeWidth={SW + 1} strokeLinecap="round" />;
  } else if (emotion === 'serious') {
    mouthEl = <path d={`M -14 ${mY} L 14 ${mY}`} stroke={INK} strokeWidth={SW + 1} strokeLinecap="round" />;
  } else {
    mouthEl = <path d={`M -16 ${mY - 2} Q 0 ${mY + 10} 16 ${mY - 2}`} fill="none" stroke={INK} strokeWidth={SW + 1} strokeLinecap="round" />;
  }

  const Eye = ({x}: {x: number}) => (
    <g>
      <ellipse cx={x} cy={ey} rx={12 * big} ry={eyeRy} fill="#fff" stroke={INK} strokeWidth={SW} />
      {!blink && (
        <>
          <circle cx={x + look * 4} cy={ey + 1} r={7 * big} fill="#3a2a22" />
          <circle cx={x + look * 4 + 2.5} cy={ey - 3} r={2.4} fill="#fff" />
        </>
      )}
    </g>
  );

  const glassY = ey;
  return (
    <g>
      {/* cheeks */}
      <ellipse cx={-rx * 0.62} cy={HY + ry * 0.32} rx={11} ry={7} fill="#E8736B" opacity={0.28} />
      <ellipse cx={rx * 0.62} cy={HY + ry * 0.32} rx={11} ry={7} fill="#E8736B" opacity={0.28} />
      {/* nose */}
      <path d={`M 0 ${HY + 14} Q 7 ${HY + 30} -1 ${HY + 33}`} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.55} />
      <Eye x={-ex} />
      <Eye x={ex} />
      <path d={`M ${-ex - 15} ${browY(-1, false)} L ${-ex + 13} ${browY(-1, true)}`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d={`M ${ex + 15} ${browY(1, false)} L ${ex - 13} ${browY(1, true)}`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      {emotion === 'sad' && (
        <path d={`M ${ex + 6} ${ey + 16} q 5 12 0 18 q -6 -6 0 -18 z`} fill="#7CC8F0" stroke={INK} strokeWidth={1.8} />
      )}
      {cfg.wrinkles && (
        <g stroke={INK} strokeWidth={1.8} fill="none" opacity={0.4} strokeLinecap="round">
          <path d={`M ${-ex - 14} ${HY - 38} q 14 -6 28 0`} /><path d={`M ${ex - 14} ${HY - 38} q 14 -6 28 0`} />
          <path d={`M ${-rx * 0.7} ${HY + 18} q 6 12 -2 22`} /><path d={`M ${rx * 0.7} ${HY + 18} q -6 12 2 22`} />
        </g>
      )}
      {cfg.beard && beardEl(cfg, mY)}
      {cfg.mustache && (
        <path d={`M -26 ${mY - 12} Q -12 ${mY - 22} 0 ${mY - 12} Q 12 ${mY - 22} 26 ${mY - 12} Q 12 ${mY - 6} 0 ${mY - 9} Q -12 ${mY - 6} -26 ${mY - 12} Z`}
          fill="#9a9a9f" stroke={INK} strokeWidth={1.8} />
      )}
      {mouthEl}
      {cfg.glasses && (
        <g fill="none" strokeLinecap="round">
          <circle cx={-ex} cy={glassY} r={cfg.glasses === 'gold' ? 20 : 19} fill="#BFE3FF" fillOpacity={0.28}
            stroke={cfg.glasses === 'gold' ? '#C9A227' : INK} strokeWidth={cfg.glasses === 'gold' ? 5 : 3.5} />
          <circle cx={ex} cy={glassY} r={cfg.glasses === 'gold' ? 20 : 19} fill="#BFE3FF" fillOpacity={0.28}
            stroke={cfg.glasses === 'gold' ? '#C9A227' : INK} strokeWidth={cfg.glasses === 'gold' ? 5 : 3.5} />
          <path d={`M ${-ex + 19} ${glassY} Q 0 ${glassY - 6} ${ex - 19} ${glassY}`}
            stroke={cfg.glasses === 'gold' ? '#C9A227' : INK} strokeWidth={3} />
          <path d={`M ${-ex - 10} ${glassY - 10} l 8 -3`} stroke="#fff" strokeWidth={3} opacity={0.8} />
        </g>
      )}
    </g>
  );
};

function beardEl(cfg: Cfg, mY: number) {
  const {headRx: rx, headRy: ry} = cfg;
  const bot = HY + ry;
  if (cfg.beard === 'stubble') {
    return <path d={`M ${-rx + 6} ${HY + 20} Q ${-rx} ${bot} 0 ${bot + 2} Q ${rx} ${bot} ${rx - 6} ${HY + 20} Q ${rx - 14} ${mY + 14} 0 ${mY + 18} Q ${-rx + 14} ${mY + 14} ${-rx + 6} ${HY + 20} Z`}
      fill="#222" opacity={0.22} />;
  }
  const len = cfg.beard === 'grayLong' ? 36 : 14;
  return <path d={`M ${-rx + 4} ${HY + 18} Q ${-rx} ${bot + len} 0 ${bot + len + 4} Q ${rx} ${bot + len} ${rx - 4} ${HY + 18} Q ${rx - 12} ${mY + 12} 0 ${mY + 16} Q ${-rx + 12} ${mY + 12} ${-rx + 4} ${HY + 18} Z`}
    fill={cfg.beard === 'grayLong' ? '#A9A9AE' : '#8c8c90'} stroke={INK} strokeWidth={2} />;
}
