import React from 'react';
import {useCurrentFrame, random} from 'remotion';
import {INK} from '../theme';

const W = 1920, H = 1080;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}} preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
);

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.45}) => (
  <div style={{position: 'absolute', inset: 0, pointerEvents: 'none',
    background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(20,10,0,${strength}) 100%)`}} />
);

const Dust: React.FC<{n?: number; color?: string}> = ({n = 26, color = '#fff6d8'}) => {
  const fr = useCurrentFrame();
  return (
    <>
      {Array.from({length: n}).map((_, i) => {
        const x = (random('dx' + i) * W + fr * (0.3 + random('ds' + i) * 0.6)) % W;
        const y = (random('dy' + i) * H + Math.sin((fr + i * 20) / 40) * 20) % H;
        return <circle key={i} cx={x} cy={y} r={1.5 + random('dr' + i) * 2.5} fill={color} opacity={0.3 + random('do' + i) * 0.3} />;
      })}
    </>
  );
};

const Tree: React.FC<{x: number; y: number; s?: number; c?: string}> = ({x, y, s = 1, c = '#4E9A5B'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-120} width={28} height={130} rx={8} fill="#8A5A36" stroke={INK} strokeWidth={2.5} />
    <circle cx={0} cy={-190} r={95} fill={c} stroke={INK} strokeWidth={2.5} />
    <circle cx={-70} cy={-140} r={65} fill={c} stroke={INK} strokeWidth={2.5} />
    <circle cx={70} cy={-140} r={65} fill={c} stroke={INK} strokeWidth={2.5} />
    <circle cx={-25} cy={-215} r={34} fill="#fff" opacity={0.14} />
  </g>
);

const Bamboo: React.FC<{x: number; w: number}> = ({x, w}) => (
  <g>
    {Array.from({length: Math.floor(w / 46)}).map((_, i) => (
      <g key={i}>
        <rect x={x + i * 46} y={700} width={20} height={230} rx={9} fill="#C79A5A" stroke={INK} strokeWidth={2.5} />
        <line x1={x + i * 46} y1={780} x2={x + i * 46 + 20} y2={780} stroke={INK} strokeWidth={2} opacity={0.5} />
      </g>
    ))}
    <rect x={x - 10} y={760} width={w + 20} height={16} rx={7} fill="#A87B3F" stroke={INK} strokeWidth={2.5} />
    <rect x={x - 10} y={850} width={w + 20} height={16} rx={7} fill="#A87B3F" stroke={INK} strokeWidth={2.5} />
  </g>
);

/** Village yard: sky, trees, tin-roof house with veranda, bamboo fence, dirt ground (scenes 1, 2, 8) */
export const VillageYard: React.FC<{dusk?: boolean; showHouse?: boolean; night?: boolean}> = ({dusk = false, showHouse = true, night = false}) => {
  const top = night ? '#141B3D' : dusk ? '#8F9FC4' : '#8FD0F0';
  const bot = night ? '#3A4A7A' : dusk ? '#F6D6A8' : '#FFF1C9';
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bot} /></linearGradient>
          <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B88A56" /><stop offset="1" stopColor="#8E6539" /></linearGradient>
          <linearGradient id="tin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9AA5AD" /><stop offset="1" stopColor="#6E7A83" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sky)" />
        <circle cx={1560} cy={170} r={70} fill={night ? '#EEF1FF' : '#FFF3B0'} opacity={0.9} />
        <g opacity={0.9}>
          <ellipse cx={380} cy={160} rx={130} ry={38} fill="#fff" /><ellipse cx={470} cy={140} rx={90} ry={34} fill="#fff" />
          <ellipse cx={1180} cy={240} rx={110} ry={30} fill="#fff" opacity={0.85} />
        </g>
        <path d={`M 0 640 Q 300 560 620 640 T 1300 630 T 1920 620 L 1920 760 L 0 760 Z`} fill="#7FBF6E" stroke={INK} strokeWidth={2.5} />
        <Tree x={1640} y={760} s={1.25} /><Tree x={1840} y={780} s={0.9} c="#3F8A52" /><Tree x={150} y={760} s={1.1} c="#3F8A52" />
        {showHouse && (
          <g>
            <rect x={380} y={380} width={1160} height={420} fill="#D9B98A" stroke={INK} strokeWidth={2.5} />
            {Array.from({length: 12}).map((_, i) => <line key={i} x1={380 + i * 97} y1={380} x2={380 + i * 97} y2={800} stroke={INK} strokeWidth={1.5} opacity={0.18} />)}
            <path d="M 330 400 L 960 250 L 1590 400 Z" fill="url(#tin)" stroke={INK} strokeWidth={2.5} />
            {Array.from({length: 14}).map((_, i) => <line key={i} x1={330 + i * 45 + 30} y1={398 - i * 2 > 300 ? 398 : 398} x2={960 + (i - 7) * 30} y2={262} stroke="#fff" strokeWidth={2} opacity={0.22} />)}
            <rect x={330} y={398} width={1260} height={22} rx={6} fill="#5C666E" stroke={INK} strokeWidth={2.5} />
            <rect x={860} y={470} width={200} height={330} rx={8} fill="#6B4630" stroke={INK} strokeWidth={2.5} />
            <line x1={960} y1={470} x2={960} y2={800} stroke={INK} strokeWidth={2.5} />
            <circle cx={940} cy={650} r={7} fill="#E8B931" stroke={INK} strokeWidth={2} />
            <rect x={500} y={480} width={170} height={150} rx={6} fill="#FFE9A8" stroke={INK} strokeWidth={2.5} />
            <line x1={585} y1={480} x2={585} y2={630} stroke={INK} strokeWidth={2.5} /><line x1={500} y1={555} x2={670} y2={555} stroke={INK} strokeWidth={2.5} />
            <rect x={1250} y={480} width={170} height={150} rx={6} fill="#FFE9A8" stroke={INK} strokeWidth={2.5} />
            <line x1={1335} y1={480} x2={1335} y2={630} stroke={INK} strokeWidth={2.5} /><line x1={1250} y1={555} x2={1420} y2={555} stroke={INK} strokeWidth={2.5} />
            {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={360 + i * 232} y={420} width={22} height={390} fill="#8A5A36" stroke={INK} strokeWidth={2.5} />)}
            <rect x={340} y={796} width={1240} height={28} rx={6} fill="#A6794A" stroke={INK} strokeWidth={2.5} />
          </g>
        )}
        <rect x={0} y={820} width={W} height={260} fill="url(#grd)" />
        <path d={`M 0 820 L ${W} 820`} stroke={INK} strokeWidth={2.5} />
        {[[200, 960], [560, 1010], [980, 975], [1400, 1020], [1750, 965]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={60} ry={9} fill="#6E4C2A" opacity={0.35} />)}
        <Bamboo x={0} w={320} /><Bamboo x={1620} w={300} />
        <Dust n={18} />
        {night && <rect width={W} height={H} fill="#0B1230" opacity={0.42} />}
      </Svg>
      <Vignette />
    </>
  );
};

/** Dadi's room: mud wall, window light shafts, wooden bed, floor (scenes 4, 5, 6, 7) */
export const DadiRoom: React.FC<{dim?: boolean; showBed?: boolean}> = ({dim = false, showBed = true}) => (
  <>
    <Svg>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E6C698" /><stop offset="1" stopColor="#C99F6B" /></linearGradient>
        <linearGradient id="flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8D6540" /><stop offset="1" stopColor="#6B4A2C" /></linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF4C2" stopOpacity={0.55} /><stop offset="1" stopColor="#FFF4C2" stopOpacity={0} /></linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#wall)" />
      {Array.from({length: 10}).map((_, i) => <line key={i} x1={i * 200} y1={0} x2={i * 200} y2={780} stroke={INK} strokeWidth={1.5} opacity={0.1} />)}
      <rect x={0} y={0} width={W} height={60} fill="#6B4630" stroke={INK} strokeWidth={2.5} />
      <rect x={1340} y={170} width={300} height={340} rx={10} fill="#BFE6FF" stroke={INK} strokeWidth={4} />
      <line x1={1490} y1={170} x2={1490} y2={510} stroke={INK} strokeWidth={4} /><line x1={1340} y1={340} x2={1640} y2={340} stroke={INK} strokeWidth={4} />
      <polygon points="1340,510 1640,510 1250,900 700,900" fill="url(#beam)" />
      <rect x={140} y={200} width={220} height={300} rx={8} fill="#7A5236" stroke={INK} strokeWidth={2.5} />
      <rect x={160} y={220} width={180} height={120} fill="#E8D6A8" stroke={INK} strokeWidth={2} />
      <circle cx={250} cy={280} r={30} fill="#B8553A" stroke={INK} strokeWidth={2} />
      <rect x={0} y={780} width={W} height={300} fill="url(#flr)" />
      <line x1={0} y1={780} x2={W} y2={780} stroke={INK} strokeWidth={2.5} />
      {Array.from({length: 8}).map((_, i) => <line key={i} x1={i * 260} y1={780} x2={i * 260 - 160} y2={1080} stroke={INK} strokeWidth={1.5} opacity={0.18} />)}
      {showBed && (
        <g>
          <rect x={1060} y={560} width={780} height={60} rx={12} fill="#9A6A40" stroke={INK} strokeWidth={2.5} />
          <rect x={1060} y={620} width={780} height={30} fill="#E9D8B4" stroke={INK} strokeWidth={2.5} />
          <rect x={1080} y={650} width={36} height={170} rx={8} fill="#7A5236" stroke={INK} strokeWidth={2.5} />
          <rect x={1790} y={650} width={36} height={170} rx={8} fill="#7A5236" stroke={INK} strokeWidth={2.5} />
          <rect x={1100} y={500} width={150} height={64} rx={26} fill="#fff" stroke={INK} strokeWidth={2.5} />
        </g>
      )}
      <Dust n={30} />
    </Svg>
    <Vignette strength={dim ? 0.7 : 0.5} />
  </>
);

/** Clean motion-graphics background (scene 3, cards) */
export const CleanBg: React.FC<{tone?: 'warm' | 'dark'}> = ({tone = 'warm'}) => {
  const fr = useCurrentFrame();
  const dark = tone === 'dark';
  return (
    <>
      <div style={{position: 'absolute', inset: 0,
        background: dark ? 'radial-gradient(circle at 50% 40%, #3A2E4D 0%, #1B1626 80%)' : 'radial-gradient(circle at 50% 40%, #FFF3D6 0%, #F0D7A5 100%)'}} />
      <Svg>
        {Array.from({length: 14}).map((_, i) => {
          const x = random('cx' + i) * W, y = (random('cy' + i) * H + fr * 0.4 * (1 + (i % 3))) % H;
          return <circle key={i} cx={x} cy={y} r={6 + random('cr' + i) * 16} fill={dark ? '#fff' : '#C98B3C'} opacity={0.08} />;
        })}
      </Svg>
      <Vignette strength={0.4} />
    </>
  );
};
