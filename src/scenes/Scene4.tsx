import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {DadiRoom} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {ChestIcon, SmellWaves, SareeStack, PanBox, JewelBox} from '../components/Icons';
import {Pop, LocationPill} from '../components/Ui';
import {mk, CharLayer, FEET, S} from './util';

export const START = 43.1;
export const Scene4: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  // chest slides in from under the bed (43.2 → 46.4)
  const slide = interpolate(fr, [o(43.2), o(46.4)], [1000, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const open = fr >= o(52.9);
  return (
    <AbsoluteFill>
      <DadiRoom />
      <CharLayer>
        <Character kind="boroChacha" x={400} y={FEET} scale={S} emotion="serious" pose="reach" seed={3} />
        <Character kind="sajjad" x={1480} y={FEET} scale={S} facing={-1} emotion="serious" pose="stand" seed={9} />
        <Character kind="fufu" x={1740} y={FEET} scale={S} facing={-1} emotion="serious" pose={fr >= o(63) ? 'reach' : 'stand'} seed={30} />
      </CharLayer>
      <div style={{position: 'absolute', left: 960 + slide, top: 995, transform: 'translate(-50%,-100%)'}}>
        <ChestIcon size={560} open={open} />
      </div>
      <Pop from={o(54.9)} to={o(58.4)} x={880} y={640}><SmellWaves size={230} /></Pop>
      <Pop from={o(57.9)} x={760} y={560} float><SareeStack size={210} /></Pop>
      <Pop from={o(59.5)} x={960} y={540} float><PanBox size={190} /></Pop>
      <Pop from={o(61.5)} x={1160} y={560} float><JewelBox size={230} open={false} empty={false} /></Pop>
      <LocationPill from={o(43.4)} to={o(50)} text="দাদির ঘর" icon="🏠" />
    </AbsoluteFill>
  );
};
