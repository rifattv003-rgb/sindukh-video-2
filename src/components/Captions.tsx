import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CAPTIONS, HIDE_CAPTION} from '../data/overlays';
import {FF} from './Ui';
import {FPS} from '../data/timing';

const hl = (text: string) =>
  text.split('**').map((part, i) =>
    i % 2 === 1 ? <span key={i} style={{color: '#FFD84D', fontWeight: 700}}>{part}</span> : <span key={i}>{part}</span>
  );

/** Floating bottom caption overlay; auto-hides while a bubble/card is on screen */
type CapP = {captions?: typeof CAPTIONS; hide?: typeof HIDE_CAPTION};
export const Captions: React.FC<CapP> = ({captions = CAPTIONS, hide = HIDE_CAPTION}) => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const cap = captions.find((c) => t >= c.from && t < c.to);
  if (!cap) return null;
  if (hide.some((w) => t >= w.from && t < w.to)) return null;
  const local = (t - cap.from) * FPS;
  const op = interpolate(local, [0, 6], [0, 1], {extrapolateRight: 'clamp'});
  const y = interpolate(local, [0, 8], [24, 0], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 64, display: 'flex', justifyContent: 'center', opacity: op, transform: `translateY(${y}px)`}}>
      <div style={{fontFamily: FF, fontWeight: 600, fontSize: 60, color: '#fff', padding: '10px 44px', borderRadius: 22,
        background: 'rgba(20,16,12,0.72)', whiteSpace: 'nowrap', textShadow: '0 3px 0 rgba(0,0,0,0.4)'}}>
        {hl(cap.text)}
      </div>
    </div>
  );
};
