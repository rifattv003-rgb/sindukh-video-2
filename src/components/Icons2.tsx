import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {INK} from '../theme';
import {FF, Pop} from './Ui';

type P = {size?: number; style?: React.CSSProperties};
const Wrap: React.FC<P & {children: React.ReactNode; vb?: string}> = ({size = 120, style, children, vb = '0 0 100 100'}) => (
  <svg width={size} height={size} viewBox={vb} style={{overflow: 'visible', ...style}}>{children}</svg>
);
const s = {stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const HeartIcon: React.FC<P> = (p) => (
  <Wrap {...p}><path d="M 50 86 C 6 54 14 14 38 18 C 46 19 50 26 50 30 C 50 26 54 19 62 18 C 86 14 94 54 50 86 Z" fill="#E8546B" {...s} />
    <path d="M 24 34 Q 26 24 36 25" stroke="#fff" strokeWidth={4} fill="none" opacity={0.7} strokeLinecap="round" /></Wrap>
);

export const CoinStack: React.FC<P> = (p) => (
  <Wrap {...p}>
    {[0, 1, 2].map((i) => <g key={i}><ellipse cx={34} cy={78 - i * 14} rx={24} ry={9} fill="#F4C430" {...s} /><rect x={10} y={64 - i * 14} width={48} height={14} fill="#F4C430" stroke="none" /><line x1={10} y1={64 - i * 14} x2={10} y2={78 - i * 14} stroke={INK} strokeWidth={3} /><line x1={58} y1={64 - i * 14} x2={58} y2={78 - i * 14} stroke={INK} strokeWidth={3} /><ellipse cx={34} cy={64 - i * 14} rx={24} ry={9} fill="#FFD95A" {...s} /></g>)}
    <circle cx={72} cy={66} r={20} fill="#F4C430" {...s} /><text x={72} y={74} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={22} fill={INK}>৳</text>
  </Wrap>
);

export const Bangles: React.FC<P> = (p) => (
  <Wrap {...p}>
    <ellipse cx={42} cy={58} rx={30} ry={30} fill="none" stroke={INK} strokeWidth={13} />
    <ellipse cx={42} cy={58} rx={30} ry={30} fill="none" stroke="#E8B931" strokeWidth={8} />
    <ellipse cx={62} cy={46} rx={28} ry={28} fill="none" stroke={INK} strokeWidth={13} />
    <ellipse cx={62} cy={46} rx={28} ry={28} fill="none" stroke="#F4C430" strokeWidth={8} />
    <path d="M 24 44 Q 30 34 40 32" stroke="#fff" strokeWidth={3} fill="none" opacity={0.8} strokeLinecap="round" />
  </Wrap>
);

export const ClothRoll: React.FC<P> = (p) => (
  <Wrap {...p}>
    <rect x={14} y={30} width={62} height={46} rx={6} fill="#C2559B" {...s} />
    <ellipse cx={76} cy={53} rx={12} ry={23} fill="#E48AC3" {...s} /><ellipse cx={76} cy={53} rx={4} ry={9} fill="#fff" {...s} strokeWidth={2} />
    {[40, 52, 64].map((y) => <line key={y} x1={18} x2={70} y1={y} y2={y} stroke="#fff" strokeWidth={2} opacity={0.5} strokeDasharray="5 4" />)}
  </Wrap>
);

export const RiceBowl: React.FC<P> = (p) => (
  <Wrap {...p}>
    <ellipse cx={50} cy={80} rx={34} ry={8} fill="#000" opacity={0.18} />
    <path d="M 12 46 Q 14 82 50 82 Q 86 82 88 46 Z" fill="#E8E2D0" {...s} />
    <path d="M 16 46 Q 22 18 50 16 Q 78 18 84 46 Z" fill="#FFFFFF" {...s} />
    {[[36, 32], [50, 26], [64, 33], [44, 40], [58, 40]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={4} ry={2} fill="#E9E4D4" transform={`rotate(${i * 30} ${x} ${y})`} />)}
  </Wrap>
);

export const Necklace: React.FC<P> = (p) => (
  <Wrap {...p}>
    <path d="M 12 20 Q 50 100 88 20" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    <path d="M 12 20 Q 50 100 88 20" fill="none" stroke="#F4C430" strokeWidth={5} strokeLinecap="round" strokeDasharray="1 7" />
    <path d="M 50 74 l 10 12 l -10 14 l -10 -14 Z" fill="#D64545" {...s} />
    <path d="M 12 20 Q 50 100 88 20" fill="none" stroke="#F4C430" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
  </Wrap>
);

export const BankIcon: React.FC<P> = (p) => (
  <Wrap {...p}>
    <path d="M 8 38 L 50 10 L 92 38 Z" fill="#6A8CC7" {...s} />
    {[18, 36, 54, 72].map((x) => <rect key={x} x={x} y={42} width={12} height={36} fill="#E8EEF8" {...s} />)}
    <rect x={8} y={80} width={84} height={12} rx={3} fill="#6A8CC7" {...s} /><circle cx={50} cy={28} r={5} fill="#fff" {...s} strokeWidth={2} />
  </Wrap>
);

export const CrossMark: React.FC<P & {color?: string}> = ({color = '#D64545', ...p}) => (
  <Wrap {...p}><circle cx={50} cy={50} r={42} fill={color} {...s} strokeWidth={4} /><path d="M 32 32 L 68 68 M 68 32 L 32 68" stroke="#fff" strokeWidth={10} strokeLinecap="round" /></Wrap>
);
export const CheckMark: React.FC<P & {color?: string}> = ({color = '#3FA66B', ...p}) => (
  <Wrap {...p}><circle cx={50} cy={50} r={42} fill={color} {...s} strokeWidth={4} /><path d="M 28 52 L 44 68 L 74 34" stroke="#fff" strokeWidth={10} strokeLinecap="round" fill="none" /></Wrap>
);

export const GoldMelt: React.FC<P> = ({size = 160, style}) => {
  const fr = useCurrentFrame();
  const f1 = 1 + Math.sin(fr / 3) * 0.1, f2 = 1 + Math.cos(fr / 4) * 0.12;
  return (
    <Wrap size={size} style={style}>
      <path d="M 28 86 Q 50 10 72 86 Z" fill="#FF8A1F" {...s} transform={`scale(1 ${f1})`} style={{transformOrigin: '50px 86px'}} />
      <path d="M 40 86 Q 50 40 60 86 Z" fill="#FFD23F" stroke="none" transform={`scale(1 ${f2})`} style={{transformOrigin: '50px 86px'}} />
      <path d="M 16 50 L 84 50 L 76 72 L 24 72 Z" fill="#555" {...s} />
      <ellipse cx={50} cy={50} rx={34} ry={7} fill="#F4C430" {...s} />
    </Wrap>
  );
};

export const OpenLedger: React.FC<P & {marks?: number}> = ({size = 400, marks = 6, style}) => {
  const fr = useCurrentFrame();
  return (
    <Wrap size={size} style={style} vb="0 0 200 140">
      <path d="M 100 20 Q 60 4 10 14 L 10 120 Q 60 110 100 128 Z" fill="#FFF8E5" {...s} />
      <path d="M 100 20 Q 140 4 190 14 L 190 120 Q 140 110 100 128 Z" fill="#FFF3D6" {...s} />
      {[34, 50, 66, 82, 98].map((y, i) => <g key={i}><line x1={22} x2={90} y1={y} y2={y + 2} stroke={INK} strokeWidth={2} opacity={0.35} /><line x1={110} x2={178} y1={y + 2} y2={y} stroke={INK} strokeWidth={2} opacity={0.35} /></g>)}
      {Array.from({length: marks}).map((_, i) => {
        const on = fr > 14 + i * 8;
        return on ? <g key={i} opacity={Math.min(1, (fr - 14 - i * 8) / 8)}><line x1={30 + i * 10} y1={26} x2={30 + i * 10} y2={44} stroke="#8F1820" strokeWidth={3} strokeLinecap="round" /></g> : null;
      })}
      <rect x={96} y={16} width={8} height={116} fill="#B3202A" {...s} strokeWidth={2} />
    </Wrap>
  );
};

export const KnockWaves: React.FC<P> = ({size = 200, style}) => {
  const fr = useCurrentFrame();
  return (
    <Wrap size={size} style={style}>
      {[0, 1, 2].map((i) => {
        const t = ((fr + i * 10) % 30) / 30;
        return <circle key={i} cx={30} cy={50} r={10 + t * 46} fill="none" stroke="#7D5A3A" strokeWidth={5} opacity={1 - t} />;
      })}
      <rect x={14} y={42} width={30} height={16} rx={8} fill="#E3B08A" {...s} transform={`translate(${Math.sin(fr * 0.9) * 4} 0)`} />
    </Wrap>
  );
};

export const RingPull: React.FC<P> = (p) => (
  <Wrap {...p}>
    <rect x={10} y={30} width={80} height={44} rx={6} fill="#6B4A2C" {...s} />
    {[18, 36, 54, 72].map((x) => <line key={x} x1={x + 6} y1={30} x2={x + 6} y2={74} stroke={INK} strokeWidth={1.8} opacity={0.4} />)}
    <rect x={40} y={46} width={20} height={9} rx={4} fill="#2a1a10" {...s} strokeWidth={2} />
    <circle cx={50} cy={52} r={11} fill="none" stroke={INK} strokeWidth={7} /><circle cx={50} cy={52} r={11} fill="none" stroke="#C9A24A" strokeWidth={3.5} />
  </Wrap>
);

export const Magnifier: React.FC<{size?: number; children?: React.ReactNode}> = ({size = 360, children}) => (
  <div style={{position: 'relative', width: size, height: size + 70}}>
    <div style={{width: size, height: size, borderRadius: '50%', border: `10px solid ${INK}`, background: '#FFF6DD', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 0 rgba(0,0,0,0.25)'}}>{children}</div>
    <div style={{position: 'absolute', left: size * 0.74, top: size * 0.86, width: 24, height: 130, background: INK, borderRadius: 12, transform: 'rotate(-40deg)', transformOrigin: 'top'}} />
  </div>
);

/** Side-section diagram of the chest: outside height vs inside depth with a one-span gap */
export const ChestSection: React.FC<{from: number; size?: number}> = ({from, size = 560}) => {
  const fr = useCurrentFrame();
  const k = (a: number, b: number) => interpolate(fr, [from + a, from + b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 400 360" style={{overflow: 'visible'}}>
      <rect x={70} y={60} width={220} height={240} rx={10} fill="#6B4A2C" stroke={INK} strokeWidth={4} />
      <rect x={90} y={60} width={180} height={150} fill="#2a1a10" stroke={INK} strokeWidth={3} opacity={k(10, 26)} />
      <rect x={90} y={210} width={180} height={70} fill="#8D6540" stroke={INK} strokeWidth={3} strokeDasharray="8 6" opacity={k(30, 44)} />
      <g opacity={k(0, 14)}>
        <line x1={44} y1={60} x2={44} y2={300} stroke="#3C7BD9" strokeWidth={5} /><path d="M 36 70 L 44 58 L 52 70 M 36 290 L 44 302 L 52 290" fill="none" stroke="#3C7BD9" strokeWidth={5} strokeLinecap="round" />
      </g>
      <g opacity={k(14, 28)}>
        <line x1={316} y1={60} x2={316} y2={210} stroke="#3FA66B" strokeWidth={5} /><path d="M 308 70 L 316 58 L 324 70 M 308 200 L 316 212 L 324 200" fill="none" stroke="#3FA66B" strokeWidth={5} strokeLinecap="round" />
      </g>
      <g opacity={k(32, 46)}>
        <line x1={316} y1={210} x2={316} y2={300} stroke="#D64545" strokeWidth={5} strokeDasharray="6 5" />
        <rect x={296} y={236} width={40} height={38} rx={8} fill="#D64545" opacity={0.9} />
        <text x={316} y={263} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={24} fill="#fff">?</text>
      </g>
      <text x={10} y={190} fontFamily={FF} fontWeight={700} fontSize={22} fill="#3C7BD9" opacity={k(2, 14)} transform="rotate(-90 28 190)">বাইরের উচ্চতা</text>
      <text x={344} y={140} fontFamily={FF} fontWeight={700} fontSize={22} fill="#3FA66B" opacity={k(16, 28)} transform="rotate(90 344 140)">ভেতরের গভীরতা</text>
      <text x={180} y={338} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={30} fill="#D64545" opacity={k(34, 46)}>এক বিঘত ফারাক</text>
    </svg>
  );
};

export const CompareCard: React.FC<{from: number; to?: number; x: number; y: number; label: string; ok: boolean; children: React.ReactNode; w?: number}> = ({
  from, to, x, y, label, ok, children, w = 520,
}) => (
  <Pop from={from} to={to} x={x} y={y} rot={ok ? 2 : -2}>
    <div style={{width: w, padding: '18px 26px', background: ok ? '#E8F7EC' : '#FDECEC', border: `5px solid ${ok ? '#3FA66B' : '#D64545'}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 22, boxShadow: '0 8px 0 rgba(0,0,0,0.2)'}}>
      {children}
      <div style={{fontFamily: FF, fontWeight: 700, fontSize: 50, color: INK, flex: 1}}>{label}</div>
      {ok ? <CheckMark size={80} /> : <CrossMark size={80} />}
    </div>
  </Pop>
);

export const UmbrellaFolded: React.FC<P> = ({size = 150, style}) => (
  <Wrap size={size} style={style} vb="0 0 100 140">
    <path d="M 50 4 Q 62 30 54 84 L 46 84 Q 38 30 50 4 Z" fill="#2b2b2b" {...s} />
    <line x1={50} y1={84} x2={50} y2={124} stroke={INK} strokeWidth={5} />
    <path d="M 50 124 q 0 12 -14 10" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
    <path d="M 47 16 Q 44 44 47 78" stroke="#fff" strokeWidth={2} fill="none" opacity={0.3} />
  </Wrap>
);
