import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {CleanBg} from '../components/Backgrounds';
import {ClockIcon, KeyIcon, ChestIcon} from '../components/Icons';
import {Pop, NoteCard, ThoughtBubble, FF} from '../components/Ui';
import {mk} from './util';

export const START = 31.6;
const KEYS = [
  {x: 420, y: 560, c: 'hue-rotate(0deg)'},
  {x: 960, y: 330, c: 'hue-rotate(150deg)'},
  {x: 1500, y: 560, c: 'hue-rotate(300deg)'},
];
export const Scene3: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const merge = interpolate(fr, [o(35.2), o(36.4)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <CleanBg />
      {/* half-hour clock */}
      <Pop from={o(31.8)} to={o(35.0)} x={960} y={700} float><ClockIcon size={440} /></Pop>
      {/* three keys that merge into one at the chest */}
      {fr >= o(35.2) && KEYS.map((k, i) => {
        const x = k.x + (960 - k.x) * merge, y = k.y + (640 - k.y) * merge;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-100%)', filter: k.c, opacity: merge > 0.97 && i > 0 ? 0 : 1}}>
            <KeyIcon size={200} />
          </div>
        );
      })}
      <Pop from={o(36.4)} to={o(43)} x={960} y={900}><ChestIcon size={420} /></Pop>
      <NoteCard from={o(35.78)} to={o(38.24)} x={960} y={250} text="তিনজনে মিলেই খুলতে হবে" w={760} />
      <ThoughtBubble from={o(38.4)} to={o(42.2)} x={420} y={700}><span style={{fontFamily: FF, fontSize: 70, fontWeight: 700}}>…</span></ThoughtBubble>
      <ThoughtBubble from={o(39.0)} to={o(42.2)} x={1500} y={700}><span style={{fontFamily: FF, fontSize: 70, fontWeight: 700}}>…</span></ThoughtBubble>
    </AbsoluteFill>
  );
};
