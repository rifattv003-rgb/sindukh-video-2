import React from 'react';
import {useCurrentFrame, random} from 'remotion';
import {INK} from '../theme';
import {Vignette} from './Backgrounds';

const W = 1920, H = 1080;

/** Night veranda: dark wall, wooden pillar(s), floor, warm yellow hanging bulb with glow + moths */
export const NightVeranda: React.FC<{pillarX?: number; lampX?: number}> = ({pillarX = 560, lampX = 1000}) => {
  const fr = useCurrentFrame();
  const flick = 0.92 + Math.sin(fr / 5) * 0.04 + Math.sin(fr / 2.3) * 0.02;
  return (
    <>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1C2140" /><stop offset="1" stopColor="#3A3350" /></linearGradient>
          <linearGradient id="nfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5E4630" /><stop offset="1" stopColor="#3B2B1E" /></linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFE38A" stopOpacity={0.85} /><stop offset="0.5" stopColor="#FFC94D" stopOpacity={0.28} /><stop offset="1" stopColor="#FFC94D" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#nwall)" />
        {Array.from({length: 9}).map((_, i) => <line key={i} x1={i * 240} y1={80} x2={i * 240} y2={800} stroke={INK} strokeWidth={1.5} opacity={0.25} />)}
        <rect x={1280} y={260} width={240} height={540} rx={8} fill="#4A3426" stroke={INK} strokeWidth={2.5} />
        <line x1={1400} y1={260} x2={1400} y2={800} stroke={INK} strokeWidth={2.5} />
        <circle cx={1370} cy={540} r={8} fill="#B8923A" stroke={INK} strokeWidth={2} />
        <rect x={0} y={0} width={W} height={90} fill="#2E2018" stroke={INK} strokeWidth={2.5} />
        <rect x={0} y={800} width={W} height={280} fill="url(#nfloor)" />
        <line x1={0} y1={800} x2={W} y2={800} stroke={INK} strokeWidth={2.5} />
        {Array.from({length: 8}).map((_, i) => <line key={i} x1={i * 270} y1={800} x2={i * 270 - 170} y2={1080} stroke={INK} strokeWidth={1.5} opacity={0.25} />)}
        {/* pillar (khuti) */}
        <rect x={pillarX - 34} y={90} width={68} height={720} rx={10} fill="#7A5232" stroke={INK} strokeWidth={2.5} />
        <rect x={pillarX - 34} y={90} width={20} height={720} rx={10} fill="#fff" opacity={0.08} />
        <rect x={pillarX - 50} y={780} width={100} height={30} rx={8} fill="#5C3D24" stroke={INK} strokeWidth={2.5} />
        {/* hanging bulb */}
        <circle cx={lampX} cy={300} r={420 * flick} fill="url(#glow)" />
        <line x1={lampX} y1={90} x2={lampX} y2={250} stroke={INK} strokeWidth={3} />
        <rect x={lampX - 12} y={246} width={24} height={26} rx={4} fill="#666" stroke={INK} strokeWidth={2.5} />
        <ellipse cx={lampX} cy={296} rx={30} ry={36} fill="#FFE57A" stroke={INK} strokeWidth={2.5} />
        <ellipse cx={lampX - 9} cy={286} rx={8} ry={12} fill="#fff" opacity={0.7} />
        {/* moths */}
        {Array.from({length: 7}).map((_, i) => {
          const a = fr / (12 + i * 3) + i * 2, r = 60 + i * 18;
          const x = lampX + Math.cos(a) * r, y = 300 + Math.sin(a * 1.3) * r * 0.6;
          return <ellipse key={i} cx={x} cy={y} rx={4 + (i % 2)} ry={2} fill="#F5E9C8" opacity={0.85} transform={`rotate(${Math.sin(fr / 2 + i) * 30} ${x} ${y})`} />;
        })}
        {Array.from({length: 14}).map((_, i) => (
          <circle key={'s' + i} cx={random('ns' + i) * W} cy={random('nt' + i) * 80 + 100} r={1.5} fill="#fff" opacity={0.35} />
        ))}
      </svg>
      <Vignette strength={0.62} />
    </>
  );
};
