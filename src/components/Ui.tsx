import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {loadFont} from '@remotion/google-fonts/HindSiliguri';
import {INK} from '../theme';

const {fontFamily} = loadFont('normal', {weights: ['400', '600', '700'], subsets: ['bengali', 'latin']});
export const FF = fontFamily;

/** 0→1 spring pop starting at `from`; returns 0 before, fades out between to-8..to */
export const usePop = (from: number, to?: number) => {
  const fr = useCurrentFrame();
  const s = spring({frame: fr - from, fps: 30, config: {damping: 12, stiffness: 160}});
  const vis = fr >= from && (to === undefined || fr < to);
  const out = to === undefined ? 1 : interpolate(fr, [to - 8, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {vis, scale: Math.max(0, s), opacity: out};
};

type BaseP = {from: number; to?: number; children?: React.ReactNode};

export const Pop: React.FC<BaseP & {x: number; y: number; rot?: number; origin?: string; float?: boolean}> = ({
  from, to, x, y, rot = 0, origin = 'center bottom', float = false, children,
}) => {
  const fr = useCurrentFrame();
  const {vis, scale, opacity} = usePop(from, to);
  if (!vis) return null;
  const fy = float ? Math.sin(fr / 10) * 8 : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y + fy, transform: `translate(-50%, -100%) scale(${scale}) rotate(${rot}deg)`, transformOrigin: origin, opacity}}>
      {children}
    </div>
  );
};

/** Speech bubble; (x,y) = tip of the tail (points at speaker's head) */
export const SpeechBubble: React.FC<BaseP & {
  x: number; y: number; text: string; w?: number; color?: string; angry?: boolean; hl?: string[]; size?: number;
}> = ({from, to, x, y, text, w = 620, color = '#FFFFFF', angry = false, size = 46}) => {
  const fr = useCurrentFrame();
  const shake = angry ? Math.sin(fr * 2.1) * 2.5 : 0;
  return (
    <Pop from={from} to={to} x={x + shake} y={y} origin="50% 100%">
      <div style={{position: 'relative', marginBottom: 34}}>
        <div style={{
          width: w, padding: '22px 30px', background: color, border: `4px solid ${INK}`, borderRadius: 34, fontFamily: FF, fontWeight: 700,
          fontSize: size, lineHeight: 1.35, color: INK, textAlign: 'center', boxShadow: '0 8px 0 rgba(0,0,0,0.18)',
          ...(angry ? {borderColor: '#8B1E1E'} : {}),
        }}>{text}</div>
        <div style={{position: 'absolute', left: '50%', bottom: -26, width: 38, height: 38, background: color, borderRight: `4px solid ${angry ? '#8B1E1E' : INK}`,
          borderBottom: `4px solid ${angry ? '#8B1E1E' : INK}`, transform: 'translateX(-50%) rotate(45deg)'}} />
      </div>
    </Pop>
  );
};

export const ThoughtBubble: React.FC<BaseP & {x: number; y: number}> = ({from, to, x, y, children}) => (
  <Pop from={from} to={to} x={x} y={y} origin="50% 100%">
    <div style={{position: 'relative', marginBottom: 54}}>
      <div style={{minWidth: 150, minHeight: 110, padding: 18, background: '#fff', border: `4px solid ${INK}`, borderRadius: 70, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </div>
      <div style={{position: 'absolute', left: '50%', bottom: -30, width: 26, height: 26, borderRadius: 13, background: '#fff', border: `3px solid ${INK}`}} />
      <div style={{position: 'absolute', left: '46%', bottom: -52, width: 14, height: 14, borderRadius: 7, background: '#fff', border: `3px solid ${INK}`}} />
    </div>
  </Pop>
);

export const NameBadge: React.FC<BaseP & {x: number; y: number; text: string; color: string}> = ({from, to, x, y, text, color}) => (
  <Pop from={from} to={to} x={x} y={y}>
    <div style={{background: color, color: '#fff', fontFamily: FF, fontWeight: 700, fontSize: 36, padding: '6px 28px', borderRadius: 40, border: `3px solid ${INK}`, whiteSpace: 'nowrap', boxShadow: '0 5px 0 rgba(0,0,0,0.2)'}}>
      {text}
    </div>
  </Pop>
);

/** Floating location/time pill at the top of the screen */
export const LocationPill: React.FC<BaseP & {text: string; icon?: string}> = ({from, to, text, icon = '📍'}) => {
  const fr = useCurrentFrame();
  const {vis, opacity} = usePop(from, to);
  if (!vis) return null;
  const y = interpolate(fr - from, [0, 14], [-90, 44], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: y, right: 56, opacity, background: 'rgba(34,34,34,0.88)', color: '#fff', fontFamily: FF, fontWeight: 600, fontSize: 36, padding: '10px 30px', borderRadius: 50, display: 'flex', gap: 12, alignItems: 'center'}}>
      <span>{icon}</span><span>{text}</span>
    </div>
  );
};

export const Stamp: React.FC<BaseP & {x: number; y: number; text: string; color?: string; rot?: number; size?: number}> = ({
  from, to, x, y, text, color = '#C0392B', rot = -8, size = 70,
}) => (
  <Pop from={from} to={to} x={x} y={y} rot={rot}>
    <div style={{fontFamily: FF, fontWeight: 700, fontSize: size, color, border: `7px solid ${color}`, borderRadius: 18, padding: '4px 30px', background: 'rgba(255,255,255,0.78)', letterSpacing: 2}}>{text}</div>
  </Pop>
);

export const NoteCard: React.FC<BaseP & {x: number; y: number; title?: string; text: string; color?: string; rot?: number; w?: number}> = ({
  from, to, x, y, title, text, color = '#FFF1A8', rot = -3, w = 420,
}) => (
  <Pop from={from} to={to} x={x} y={y} rot={rot}>
    <div style={{width: w, background: color, border: `4px solid ${INK}`, borderRadius: 18, padding: '18px 26px', fontFamily: FF, color: INK, textAlign: 'center', boxShadow: '0 8px 0 rgba(0,0,0,0.2)'}}>
      {title && <div style={{fontSize: 30, fontWeight: 600, opacity: 0.7}}>{title}</div>}
      <div style={{fontSize: 52, fontWeight: 700, lineHeight: 1.25}}>{text}</div>
    </div>
  </Pop>
);

export const Shake: React.FC<{from: number; to: number; amp?: number; children: React.ReactNode}> = ({from, to, amp = 8, children}) => {
  const fr = useCurrentFrame();
  const on = fr >= from && fr < to;
  const k = on ? interpolate(fr, [from, to], [1, 0]) : 0;
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translate(${Math.sin(fr * 3.1) * amp * k}px, ${Math.cos(fr * 4.3) * amp * k}px)`}}>
      {children}
    </div>
  );
};

export const CamZoom: React.FC<{from: number; to: number; scale: number; fx?: number; fy?: number; children: React.ReactNode}> = ({
  from, to, scale, fx = 50, fy = 50, children,
}) => {
  const fr = useCurrentFrame();
  const s = interpolate(fr, [from, to], [1, scale], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: `${fx}% ${fy}%`}}>{children}</div>;
};
