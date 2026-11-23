import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {DadiRoom} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {ChestIcon, EnvelopeIcon, Exclaim} from '../components/Icons';
import {ChestSection, KnockWaves, RingPull, Magnifier} from '../components/Icons2';
import {Pop} from '../components/Ui';
import {LetterCard} from '../components/Letter';
import {mk, CharLayer, FEET, S} from './util2';

export const START = 87.0;
export const LAST = 'আমার সবচেয়ে দামি জিনিস সিন্দুকের তলায় রাখা আছে। খুঁজে নিস, তবে একসাথে।';
export const P2Scene8: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const slide = interpolate(fr, [o(96.0), o(97.0)], [900, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bx = interpolate(fr, [o(113.0), o(115.4)], [2150, 1640], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pose = fr >= o(108.2) && fr < o(111.2) ? 'point' : fr >= o(96.5) ? 'reach' : 'stand';
  const hasChest = fr >= o(96.0);
  return (
    <AbsoluteFill>
      <DadiRoom showBed={false} />
      <CharLayer>
        <Character kind="sajjad" x={fr >= o(96.5) ? 620 : 260} y={FEET} scale={S} emotion={fr >= o(112.1) ? 'surprised' : 'serious'} pose={pose as any} seed={60} />
        {fr >= o(113.0) && <Character kind="boroChacha" x={bx} y={FEET} scale={S} facing={-1} emotion="serious" seed={3} />}
      </CharLayer>
      {[640, 960, 1280].map((x, i) => (
        <Pop key={i} from={o(87.3 + i * 0.4)} to={o(96.5)} x={x} y={470} float rot={(i - 1) * 6}><EnvelopeIcon size={210} ribbon /></Pop>
      ))}
      <LetterCard from={o(90.5)} to={o(96.5)} x={960} y={900} w={1100} text={LAST} size={54} sender="তিনটা চিঠির শেষ লাইন" tail={20} />
      {hasChest && (
        <div style={{position: 'absolute', left: 1000 + slide, top: 995, transform: 'translate(-50%,-100%)'}}>
          <ChestIcon size={540} open />
        </div>
      )}
      <Pop from={o(99.1)} to={o(103.9)} x={1560} y={900}><ChestSection from={o(99.1)} size={540} /></Pop>
      <Pop from={o(103.9)} to={o(108.2)} x={816} y={805}><KnockWaves size={230} /></Pop>
      <Pop from={o(108.2)} to={o(113.0)} x={1560} y={780} float>
        <Magnifier size={340}><RingPull size={250} /></Magnifier>
      </Pop>
      <Pop from={o(112.1)} to={o(113.6)} x={620} y={250}><Exclaim size={130} /></Pop>
    </AbsoluteFill>
  );
};
