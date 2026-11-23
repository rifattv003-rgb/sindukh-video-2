import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {NightVeranda} from '../components/Backgrounds2';
import {Character} from '../components/Character';
import {EnvelopeIcon, ClockIcon} from '../components/Icons';
import {RiceBowl} from '../components/Icons2';
import {Pop, LocationPill, CamZoom} from '../components/Ui';
import {mk, CharLayer, Spot, FEET, S} from './util2';

export const START = 8.2;
export const P2Scene2: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const t = interpolate(fr, [o(14.84), o(16.6)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const handing = fr >= o(14.6) && fr < o(16.8);
  const ex = 1010 + (1190 - 1010) * t, ey = 700 + 20 * t;
  return (
    <AbsoluteFill>
      <CamZoom from={0} to={o(18.8)} scale={1.06} fx={50} fy={45}>
        <NightVeranda pillarX={150} lampX={960} />
        <CharLayer>
          <Character kind="fufu" x={470} y={FEET} scale={S} emotion="sad" seed={20} />
          <Character kind="boroChacha" x={860} y={FEET} scale={S} emotion="serious" pose={handing ? 'reach' : 'stand'} seed={3} />
          <Character kind="sajjad" x={1250} y={FEET} scale={S} facing={-1} emotion="sad" pose={fr >= o(16.6) ? 'hold' : 'stand'} seed={60} />
          <Character kind="baba" x={1640} y={FEET} scale={S} facing={-1} emotion="sad" seed={40} />
        </CharLayer>
        {[670, 1055, 1440].map((x, i) => (
          <Pop key={i} from={o(10.6 + i * 0.4)} x={x} y={1060} ><RiceBowl size={120} /></Pop>
        ))}
        {fr >= o(14.6) && (
          <div style={{position: 'absolute', left: ey > 0 ? ex : 0, top: ey, transform: 'translate(-50%,-100%)'}}>
            <EnvelopeIcon size={140} ribbon />
          </div>
        )}
      </CamZoom>
      <LocationPill from={o(8.5)} to={o(15)} text="সেদিন রাতে • বারান্দা" icon="🌙" />
      <Pop from={o(8.6)} to={o(13)} x={1760} y={330}><ClockIcon size={130} /></Pop>
    </AbsoluteFill>
  );
};
