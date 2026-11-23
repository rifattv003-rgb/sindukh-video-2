import React from 'react';
import {useCurrentFrame} from 'remotion';
import {INK} from '../theme';
import {FF} from './Ui';

type P = {size?: number; style?: React.CSSProperties};
const Wrap: React.FC<P & {children: React.ReactNode; vb?: string}> = ({size = 120, style, children, vb = '0 0 100 100'}) => (
  <svg width={size} height={size} viewBox={vb} style={{overflow: 'visible', ...style}}>{children}</svg>
);
const s = {stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const KeyIcon: React.FC<P> = (p) => (
  <Wrap {...p}>
    <circle cx={30} cy={34} r={20} fill="#F4C430" {...s} /><circle cx={30} cy={34} r={8} fill="#fff" {...s} />
    <rect x={44} y={30} width={46} height={10} rx={4} fill="#F4C430" {...s} />
    <rect x={74} y={40} width={8} height={16} fill="#F4C430" {...s} /><rect x={62} y={40} width={8} height={11} fill="#F4C430" {...s} />
    <path d="M 20 24 Q 26 18 34 20" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} />
  </Wrap>
);

/** Bunch of keys on a ring (the key-bunch Fufu holds) */
export const KeyBunch: React.FC<P> = ({size = 90, style}) => (
  <Wrap size={size} style={style}>
    <circle cx={50} cy={22} r={16} fill="none" stroke={INK} strokeWidth={5} />
    {[-25, 0, 25].map((r, i) => (
      <g key={i} transform={`rotate(${r} 50 30)`}>
        <rect x={44} y={34} width={12} height={44} rx={5} fill="#E8B931" {...s} />
        <rect x={56} y={58} width={9} height={6} fill="#E8B931" {...s} /><rect x={56} y={70} width={9} height={6} fill="#E8B931" {...s} />
      </g>
    ))}
  </Wrap>
);

export const ClockIcon: React.FC<P & {spin?: boolean}> = ({spin = true, ...p}) => {
  const fr = useCurrentFrame();
  const a = spin ? fr * 6 : 0;
  return (
    <Wrap {...p}>
      <circle cx={50} cy={50} r={42} fill="#fff" {...s} strokeWidth={5} />
      {Array.from({length: 12}).map((_, i) => <line key={i} x1={50} y1={14} x2={50} y2={i % 3 === 0 ? 22 : 19} stroke={INK} strokeWidth={2.5} transform={`rotate(${i * 30} 50 50)`} />)}
      <line x1={50} y1={50} x2={50} y2={22} stroke={INK} strokeWidth={5} strokeLinecap="round" transform={`rotate(${a} 50 50)`} />
      <line x1={50} y1={50} x2={50} y2={32} stroke={INK} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a / 12} 50 50)`} />
      <circle cx={50} cy={50} r={4} fill={INK} />
    </Wrap>
  );
};

export const ChestIcon: React.FC<P & {open?: boolean}> = ({open = false, ...p}) => (
  <Wrap {...p}>
    <rect x={10} y={46} width={80} height={42} rx={4} fill="#3B2A22" {...s} />
    {open ? <path d="M 10 46 L 18 14 L 82 14 L 90 46 Z" fill="#4A362C" {...s} /> : <path d="M 10 46 Q 50 10 90 46 Z" fill="#4A362C" {...s} />}
    {[10, 90].map((x) => <rect key={x} x={x - 5} y={46} width={10} height={42} fill="#C9A24A" {...s} />)}
    <rect x={43} y={44} width={14} height={16} rx={3} fill="#E8C76A" {...s} />
  </Wrap>
);

export const EnvelopeIcon: React.FC<P & {color?: string; ribbon?: boolean}> = ({color = '#F6E7C1', ribbon = false, ...p}) => (
  <Wrap {...p}>
    <rect x={8} y={24} width={84} height={56} rx={5} fill={color} {...s} />
    <path d="M 8 26 L 50 58 L 92 26" fill="none" {...s} />
    {ribbon && <rect x={46} y={24} width={8} height={56} fill="#C0392B" {...s} />}
  </Wrap>
);

export const QuestionIcon: React.FC<P & {color?: string}> = ({color = '#E8B931', ...p}) => (
  <Wrap {...p}>
    <circle cx={50} cy={50} r={42} fill={color} {...s} strokeWidth={4} />
    <text x={50} y={72} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight={900} fontSize={66} fill={INK}>?</text>
  </Wrap>
);

export const CalendarIcon: React.FC<P & {day?: string; month?: string}> = ({day = '৫', month = 'শুক্রবার', ...p}) => (
  <Wrap {...p}>
    <rect x={10} y={16} width={80} height={76} rx={8} fill="#fff" {...s} />
    <path d="M 10 24 Q 10 16 18 16 L 82 16 Q 90 16 90 24 L 90 40 L 10 40 Z" fill="#D64545" {...s} />
    <rect x={28} y={6} width={7} height={18} rx={3} fill="#555" {...s} /><rect x={65} y={6} width={7} height={18} rx={3} fill="#555" {...s} />
    <text x={50} y={34} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={13} fill="#fff">{month}</text>
    <text x={50} y={80} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={40} fill={INK}>{day}</text>
  </Wrap>
);

export const JewelBox: React.FC<P & {open?: boolean; empty?: boolean}> = ({open = true, empty = true, ...p}) => (
  <Wrap {...p}>
    <rect x={14} y={50} width={72} height={36} rx={5} fill="#B3202A" {...s} />
    {open ? <path d="M 14 50 L 22 20 L 78 20 L 86 50 Z" fill="#8F1820" {...s} /> : <rect x={14} y={36} width={72} height={16} rx={5} fill="#8F1820" {...s} />}
    {open && <rect x={20} y={50} width={60} height={10} rx={3} fill="#F7F1E6" {...s} strokeWidth={2} />}
    {!empty && <circle cx={50} cy={52} r={7} fill="#E8B931" {...s} />}
  </Wrap>
);

export const SareeStack: React.FC<P> = (p) => (
  <Wrap {...p}>
    {['#C2559B', '#3FA66B', '#E8B931'].map((c, i) => <rect key={i} x={12} y={64 - i * 18} width={76} height={22} rx={6} fill={c} {...s} />)}
    {[0, 1, 2].map((i) => <line key={i} x1={20} x2={80} y1={74 - i * 18} y2={74 - i * 18} stroke="#fff" strokeWidth={2} opacity={0.6} strokeDasharray="4 4" />)}
  </Wrap>
);

export const PanBox: React.FC<P> = (p) => (
  <Wrap {...p}>
    <ellipse cx={50} cy={64} rx={40} ry={14} fill="#C9A24A" {...s} /><path d="M 10 64 L 14 44 Q 50 30 86 44 L 90 64 Q 50 80 10 64 Z" fill="#D9B45C" {...s} />
    <ellipse cx={50} cy={42} rx={34} ry={9} fill="#3FA66B" {...s} />
  </Wrap>
);

/** Naphthalene / mustard-oil smell waves rising */
export const SmellWaves: React.FC<P> = ({size = 150, style}) => {
  const fr = useCurrentFrame();
  return (
    <Wrap size={size} style={style}>
      {[0, 1, 2].map((i) => {
        const dy = -((fr * 1.2 + i * 22) % 66);
        const o = 1 - ((fr * 1.2 + i * 22) % 66) / 66;
        return <path key={i} transform={`translate(${i * 28 + 10} ${90 + dy})`} d="M 0 0 q 10 -12 0 -24 q -10 -12 0 -24" fill="none" stroke="#7D8F5A" strokeWidth={5} strokeLinecap="round" opacity={o} />;
      })}
    </Wrap>
  );
};

export const BagIcon: React.FC<P> = (p) => (
  <Wrap {...p}>
    <rect x={12} y={34} width={76} height={54} rx={12} fill="#4A6FA5" {...s} />
    <path d="M 34 34 Q 34 12 50 12 Q 66 12 66 34" fill="none" {...s} strokeWidth={5} />
    <rect x={20} y={52} width={60} height={18} rx={6} fill="#3B5A88" {...s} /><rect x={44} y={56} width={12} height={10} rx={2} fill="#E8B931" {...s} />
  </Wrap>
);

export const Umbrella: React.FC<P> = (p) => (
  <Wrap {...p} vb="0 0 100 140">
    <path d="M 6 60 Q 50 -10 94 60 Q 80 50 70 60 Q 60 50 50 60 Q 40 50 30 60 Q 20 50 6 60 Z" fill="#2b2b2b" {...s} />
    <line x1={50} y1={58} x2={50} y2={125} stroke={INK} strokeWidth={5} />
    <path d="M 50 125 q 0 12 -14 10" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
  </Wrap>
);

export const Ledger: React.FC<P> = (p) => (
  <Wrap {...p}>
    <rect x={14} y={14} width={72} height={76} rx={6} fill="#B3202A" {...s} />
    <rect x={14} y={14} width={12} height={76} fill="#8F1820" {...s} />
    <rect x={36} y={30} width={40} height={26} rx={3} fill="#F7F1E6" {...s} strokeWidth={2} />
    {[38, 46].map((y) => <line key={y} x1={42} x2={70} y1={y} y2={y} stroke={INK} strokeWidth={2} />)}
  </Wrap>
);

/** Mortgage paper with fingerprint */
export const Paper: React.FC<P & {stamp?: boolean}> = ({stamp = true, ...p}) => (
  <Wrap {...p}>
    <path d="M 18 8 L 70 8 L 84 22 L 84 92 L 18 92 Z" fill="#FFF8E5" {...s} />
    <path d="M 70 8 L 70 22 L 84 22" fill="#EAD9AA" {...s} />
    {[30, 40, 50, 60].map((y) => <line key={y} x1={28} x2={72} y1={y} y2={y} stroke={INK} strokeWidth={2} opacity={0.5} />)}
    {stamp && (
      <g transform="translate(56 74)">
        <ellipse rx={13} ry={10} fill="#27408B" opacity={0.85} />
        {[3, 6, 9].map((r) => <ellipse key={r} rx={r + 1} ry={r * 0.78} fill="none" stroke="#fff" strokeWidth={1.2} opacity={0.7} />)}
      </g>
    )}
  </Wrap>
);

export const Exclaim: React.FC<P & {color?: string}> = ({color = '#D64545', ...p}) => (
  <Wrap {...p}>
    <path d="M 50 8 L 94 86 L 6 86 Z" fill={color} {...s} strokeWidth={4} />
    <rect x={46} y={34} width={8} height={30} rx={4} fill="#fff" /><circle cx={50} cy={74} r={5} fill="#fff" />
  </Wrap>
);

export const Hourglass: React.FC<P> = (p) => (
  <Wrap {...p}>
    <path d="M 24 10 L 76 10 L 76 18 Q 76 40 56 50 Q 76 60 76 82 L 76 90 L 24 90 L 24 82 Q 24 60 44 50 Q 24 40 24 18 Z" fill="#BFE6FF" {...s} />
    <path d="M 34 20 L 66 20 Q 62 34 50 44 Q 38 34 34 20 Z" fill="#E8B931" /><path d="M 40 84 Q 50 60 60 84 Z" fill="#E8B931" />
  </Wrap>
);
