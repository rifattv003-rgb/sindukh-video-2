import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';
import {INK, SW} from '../theme';
import {CHARS, Kind} from '../data/characters';
import {Face, Emotion} from './Face';

export type Pose = 'stand' | 'angry' | 'hold' | 'wipe' | 'point' | 'shrug' | 'reach' | 'fist' | 'sitDown';
// [upper, forearm-bend] per arm, positive = outward
const POSES: Record<Pose, [[number, number], [number, number]]> = {
  stand: [[8, 4], [8, 4]],
  angry: [[30, -50], [30, -50]],
  hold: [[22, -70], [10, -80]],
  wipe: [[18, 2], [26, -150]],
  point: [[10, 2], [100, -10]],
  shrug: [[40, -40], [40, -40]],
  reach: [[10, 2], [55, -40]],
  fist: [[15, -90], [15, -90]],
  sitDown: [[10, -60], [10, -60]],
};

const UP = 74, FORE = 66;
const dir = (t: number) => [-Math.sin((t * Math.PI) / 180), Math.cos((t * Math.PI) / 180)];
export const handPos = (sideSign: 1 | -1, shoulderX: number, a: number, b: number) => {
  const s = -sideSign; // right arm (x>0) rotates negative for outward
  const t1 = s * a, t2 = t1 + s * b;
  const d1 = dir(t1), d2 = dir(t2);
  return {x: shoulderX + UP * d1[0] + FORE * d2[0], y: -310 + UP * d1[1] + FORE * d2[1]};
};

type Props = {
  kind: Kind; x: number; y: number; scale?: number; facing?: 1 | -1;
  emotion?: Emotion; talking?: boolean; pose?: Pose; tremble?: number;
  look?: number; seed?: number; holdL?: React.ReactNode; holdR?: React.ReactNode; holdSize?: number;
  sitting?: boolean; opacity?: number;
};

export const Character: React.FC<Props> = ({
  kind, x, y, scale = 1, facing = 1, emotion = 'neutral', talking = false, pose = 'stand',
  tremble = 0, look = 0, seed = 0, holdL, holdR, holdSize = 100, sitting = false, opacity = 1,
}) => {
  const frame = useCurrentFrame() + seed;
  const cfg = CHARS[kind];
  const uid = useId().replace(/:/g, '');
  const W = cfg.W;
  const float = Math.sin(frame / 14) * 4;
  const jitter = tremble ? Math.sin(frame * 2.3) * tremble : 0;
  const blink = frame % 96 > 91;
  const mouth = (talking ? [0, 1, 2, 1, 2, 0][Math.floor(frame / 3) % 6] : 0) as 0 | 1 | 2;
  const sit = sitting ? 90 : 0;
  const [armL, armR] = POSES[pose];
  const shX = W / 2 - 6;
  const hL = handPos(-1, -shX, armL[0], armL[1]);
  const hR = handPos(1, shX, armR[0], armR[1]);
  const upperCol = cfg.sleeve === 'long' ? cfg.top : cfg.top;
  const foreCol = cfg.sleeve === 'long' ? cfg.top : cfg.skin;

  const Arm = ({side, a}: {side: 1 | -1; a: [number, number]}) => {
    const s = -side;
    const w = kind === 'boroChacha' ? 32 : 26;
    return (
      <g transform={`translate(${side * shX} -310) rotate(${s * a[0]})`}>
        <line x1={0} y1={0} x2={0} y2={UP} stroke={INK} strokeWidth={w + 5} strokeLinecap="round" />
        <g transform={`translate(0 ${UP}) rotate(${s * a[1]})`}>
          <line x1={0} y1={0} x2={0} y2={FORE} stroke={INK} strokeWidth={w - 2 + 5} strokeLinecap="round" />
          <line x1={0} y1={0} x2={0} y2={FORE} stroke={foreCol} strokeWidth={w - 2} strokeLinecap="round" />
          <circle cx={0} cy={FORE + 4} r={(w - 2) / 2 + 4} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
          {kind === 'fufu' && (
            <>
              <rect x={-(w - 2) / 2 - 1} y={FORE - 14} width={w + 0} height={5} rx={2.5} fill="#E8B931" stroke={INK} strokeWidth={1.5} />
              <rect x={-(w - 2) / 2 - 1} y={FORE - 22} width={w + 0} height={5} rx={2.5} fill="#E8B931" stroke={INK} strokeWidth={1.5} />
              <rect x={-(w - 2) / 2 - 1} y={FORE - 30} width={w + 0} height={5} rx={2.5} fill="#8fd3ee" fillOpacity={0.7} stroke={INK} strokeWidth={1.5} />
              <rect x={-(w - 2) / 2 - 1} y={FORE - 38} width={w + 0} height={5} rx={2.5} fill="#8fd3ee" fillOpacity={0.7} stroke={INK} strokeWidth={1.5} />
            </>
          )}
        </g>
        <line x1={0} y1={0} x2={0} y2={UP} stroke={upperCol} strokeWidth={w} strokeLinecap="round" />
      </g>
    );
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`} opacity={opacity}>
      <defs>
        <linearGradient id={`g${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={cfg.top} />
          <stop offset="1" stopColor={cfg.topShade} />
        </linearGradient>
        <linearGradient id={`p${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={cfg.bottom} />
          <stop offset="1" stopColor={cfg.bottom} stopOpacity={0.82} />
        </linearGradient>
        <pattern id={`c${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill="#3F7A55" />
          <rect width="26" height="3" y="6" fill="#B9E3C8" opacity={0.8} />
          <rect width="3" height="26" x="6" fill="#B9E3C8" opacity={0.8} />
          <rect width="2" height="26" x="18" fill="#1d4a31" opacity={0.7} />
        </pattern>
      </defs>
      <clipPath id={`k${uid}`}><rect x={-400} y={-700} width={800} height={sitting ? 704 : 1000} /></clipPath>
      <ellipse cx={0} cy={4} rx={W * 0.7} ry={14} fill="#000" opacity={0.18} />
      <g transform={`translate(${jitter} ${float * 0.6})`} clipPath={sitting ? `url(#k${uid})` : undefined}>
        <g transform={`translate(0 ${sit})`}>
          <Legs kind={kind} W={W} uid={uid} sitting={sitting} />
          <Torso kind={kind} W={W} uid={uid} />
          <Arm side={-1} a={armL} />
          <Arm side={1} a={armR} />
          {holdL && <g transform={`translate(${hL.x - holdSize / 2} ${hL.y - holdSize * 0.3})`}>{holdL}</g>}
          {holdR && <g transform={`translate(${hR.x - holdSize / 2} ${hR.y - holdSize * 0.3})`}>{holdR}</g>}
          <g transform={`translate(0 ${float * 0.4})`}>
            {/* neck */}
            <rect x={-14} y={-340} width={28} height={30} rx={8} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
            {/* ears */}
            <ellipse cx={-cfg.headRx} cy={-396} rx={9} ry={14} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
            <ellipse cx={cfg.headRx} cy={-396} rx={9} ry={14} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
            {cfg.hairStyle === 'covered' && <Anchal back cfg={cfg} />}
            <ellipse cx={0} cy={-400} rx={cfg.headRx} ry={cfg.headRy} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
            <ellipse cx={-cfg.headRx * 0.4} cy={-430} rx={cfg.headRx * 0.35} ry={10} fill="#fff" opacity={0.18} />
            <Hair kind={kind} />
            <Face cfg={cfg} emotion={emotion} mouth={mouth} talking={talking} blink={blink} look={look} />
            {cfg.hairStyle === 'covered' && <Anchal cfg={cfg} />}
          </g>
        </g>
      </g>
    </g>
  );
};

const Anchal: React.FC<{back?: boolean; cfg: typeof CHARS[Kind]}> = ({back, cfg}) =>
  back ? (
    <path d="M -72 -380 C -90 -480 90 -480 72 -380 L 74 -320 L -74 -320 Z" fill={cfg.topShade} stroke={INK} strokeWidth={SW} />
  ) : (
    <g>
      <path d="M -66 -396 C -70 -478 70 -478 66 -396 C 58 -430 30 -452 0 -452 C -30 -452 -58 -430 -66 -396 Z" fill={cfg.top} stroke={INK} strokeWidth={SW} />
      <path d="M -50 -440 Q 0 -420 50 -440" fill="none" stroke="#fff" strokeWidth={3} opacity={0.35} />
      <path d="M -20 -452 Q -10 -480 10 -460" fill="none" stroke={cfg.hair} strokeWidth={4} opacity={0.7} />
    </g>
  );

const Hair: React.FC<{kind: Kind}> = ({kind}) => {
  const cfg = CHARS[kind];
  const rx = cfg.headRx, ry = cfg.headRy, t = -400 - ry;
  if (cfg.hairStyle === 'covered') return null;
  if (cfg.hairStyle === 'bald')
    return (
      <g>
        <path d={`M ${-rx + 2} -410 C ${-rx - 8} -440 ${-rx + 10} -452 ${-rx + 14} -430 C ${-rx + 10} -420 ${-rx + 8} -410 ${-rx + 2} -410 Z`} fill="#B8B8BC" stroke={INK} strokeWidth={2} />
        <path d={`M ${rx - 2} -410 C ${rx + 8} -440 ${rx - 10} -452 ${rx - 14} -430 C ${rx - 10} -420 ${rx - 8} -410 ${rx - 2} -410 Z`} fill="#B8B8BC" stroke={INK} strokeWidth={2} />
        <ellipse cx={-14} cy={t + 14} rx={16} ry={7} fill="#fff" opacity={0.3} />
      </g>
    );
  const fill = cfg.hair;
  const tall = kind === 'sajjad' ? 10 : 2;
  return (
    <g>
      <path d={`M ${-rx - 2} -410 C ${-rx - 6} ${t - 14 - tall} ${rx + 6} ${t - 14 - tall} ${rx + 2} -410 C ${rx - 6} -440 ${rx - 24} -446 ${rx - 44} -440 C ${rx - 80} -452 ${-rx + 20} -452 ${-rx + 30} -440 C ${-rx + 12} -440 ${-rx + 4} -426 ${-rx - 2} -410 Z`}
        fill={fill} stroke={INK} strokeWidth={SW} />
      <path d={`M ${-rx + 18} ${t + 6} Q 0 ${t - 8 - tall} ${rx - 18} ${t + 6}`} fill="none" stroke="#fff" strokeWidth={3} opacity={0.25} />
    </g>
  );
};

const Legs: React.FC<{kind: Kind; W: number; uid: string; sitting: boolean}> = ({kind, W, uid, sitting}) => {
  const cfg = CHARS[kind];
  const lx = W * 0.2;
  if (cfg.outfit === 'shirtLungi' || cfg.outfit === 'saree') {
    return (
      <g>
        {[-1, 1].map((s) => (
          <g key={s}>
            <rect x={s * lx - 11} y={-70} width={22} height={62} rx={10} fill={cfg.skin} stroke={INK} strokeWidth={SW} />
            <ellipse cx={s * lx + (s > 0 ? 6 : -6)} cy={-4} rx={22} ry={11} fill={kind === 'fufu' ? '#8a5a3a' : '#4a3a2a'} stroke={INK} strokeWidth={SW} />
          </g>
        ))}
      </g>
    );
  }
  const col = cfg.outfit === 'shirtJeans' ? '#2F5FB3' : '#F4F4F6';
  return (
    <g>
      {[-1, 1].map((s) => (
        <g key={s}>
          <rect x={s * lx - 16} y={-170} width={32} height={150} rx={15} fill={col} stroke={INK} strokeWidth={SW} />
          {cfg.outfit === 'shirtJeans' && <rect x={s * lx - 3} y={-160} width={5} height={120} fill="#fff" opacity={0.12} />}
          <ellipse cx={s * lx + (s > 0 ? 8 : -8)} cy={-8} rx={28} ry={13} fill={cfg.outfit === 'shirtJeans' ? '#F3F3F3' : '#5a4636'} stroke={INK} strokeWidth={SW} />
        </g>
      ))}
    </g>
  );
};

const Torso: React.FC<{kind: Kind; W: number; uid: string}> = ({kind, W, uid}) => {
  const cfg = CHARS[kind];
  const half = W / 2;
  if (cfg.outfit === 'panjabi')
    return (
      <g>
        <rect x={-half - 4} y={-335} width={W + 8} height={250} rx={34} fill={`url(#g${uid})`} stroke={INK} strokeWidth={SW} />
        <path d={`M -14 -335 L 0 -290 L 14 -335`} fill="#E8E8EE" stroke={INK} strokeWidth={SW} />
        {[-270, -240, -210].map((yy) => <circle key={yy} cx={0} cy={yy} r={3.5} fill="#B8B8C0" stroke={INK} strokeWidth={1.5} />)}
        <line x1={0} y1={-290} x2={0} y2={-90} stroke={INK} strokeWidth={1.5} opacity={0.3} />
        <rect x={half - 28} y={-210} width={26} height={30} rx={5} fill="none" stroke={INK} strokeWidth={1.5} opacity={0.35} />
      </g>
    );
  if (cfg.outfit === 'shirtLungi')
    return (
      <g>
        <path d={`M ${-half + 10} -170 L ${-half - 14} -22 L ${half + 14} -22 L ${half - 10} -170 Z`} fill={`url(#c${uid})`} stroke={INK} strokeWidth={SW} />
        <rect x={-half - 2} y={-335} width={W + 4} height={180} rx={32} fill={`url(#g${uid})`} stroke={INK} strokeWidth={SW} />
        <path d={`M -16 -335 L 0 -295 L 16 -335`} fill="#7c838a" stroke={INK} strokeWidth={SW} />
        <path d={`M ${-half + 20} -335 Q ${half} -250 ${half - 6} -170`} fill="none" stroke="#F1E7CF" strokeWidth={22} strokeLinecap="round" opacity={0.95} />
        <path d={`M ${-half + 20} -335 Q ${half} -250 ${half - 6} -170`} fill="none" stroke={INK} strokeWidth={1.5} opacity={0.4} />
        {[-290, -250, -210].map((yy) => <circle key={yy} cx={-20} cy={yy} r={3.5} fill="#5d646a" stroke={INK} strokeWidth={1.5} />)}
      </g>
    );
  if (cfg.outfit === 'saree')
    return (
      <g>
        <path d={`M ${-half} -335 Q ${-half - 6} -150 ${-half - 24} -26 L ${half + 24} -26 Q ${half + 6} -150 ${half} -335 Z`} fill={`url(#g${uid})`} stroke={INK} strokeWidth={SW} />
        {[-30, 0, 30].map((xx) => <path key={xx} d={`M ${xx} -150 Q ${xx + 4} -90 ${xx + 8} -30`} stroke={INK} strokeWidth={1.5} fill="none" opacity={0.3} />)}
        <path d={`M ${-half - 20} -330 L ${half + 6} -150 L ${half + 6} -120 L ${-half - 28} -300 Z`} fill="#A7ADB4" stroke={INK} strokeWidth={SW} />
        <path d={`M ${-half - 4} -22 L ${half + 4} -22`} stroke="#7E858D" strokeWidth={6} />
      </g>
    );
  // shirtJeans
  return (
    <g>
      <rect x={-half} y={-335} width={W} height={190} rx={30} fill={`url(#g${uid})`} stroke={INK} strokeWidth={SW} />
      <path d={`M -16 -335 L 0 -300 L 16 -335`} fill="#E4E8EE" stroke={INK} strokeWidth={SW} />
      <line x1={0} y1={-300} x2={0} y2={-150} stroke={INK} strokeWidth={1.5} opacity={0.3} />
      <rect x={-half} y={-160} width={W} height={18} rx={6} fill="#1f4a94" stroke={INK} strokeWidth={SW} />
    </g>
  );
};
