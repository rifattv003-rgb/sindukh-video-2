import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {DadiRoom} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {EnvelopeIcon, SareeStack} from '../components/Icons';
import {Pop, FF} from '../components/Ui';
import {mk, CharLayer, FEET, S} from './util';
import {INK} from '../theme';

export const START = 90.3;
const ENV = [
  {x: 700, label: 'বড় খোকা', at: 99.2, col: '#F6E7C1'},
  {x: 920, label: 'মেজো খোকা', at: 99.7, col: '#F2E0B0'},
  {x: 1140, label: 'ছোট খুকি', at: 100.2, col: '#F8EBCB'},
];
export const Scene6: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const lift = fr >= o(92.6) && fr < o(98.5);
  const reachPose = lift ? (Math.floor(fr / 18) % 2 === 0 ? 'reach' : 'hold') : 'reach';
  const labelsOn = fr >= o(105.66) && fr < o(109.4);
  return (
    <AbsoluteFill>
      <DadiRoom />
      <CharLayer>
        <Character kind="sajjad" x={330} y={FEET} scale={S} emotion={fr >= o(98.5) ? 'surprised' : 'serious'} pose={reachPose as any} seed={7} />
        <Character kind="fufu" x={1330} y={FEET} scale={1.4} facing={-1} emotion="serious" seed={21} />
        <Character kind="boroChacha" x={1580} y={FEET} scale={1.4} facing={-1} emotion="serious" seed={33} />
        <Character kind="baba" x={1810} y={FEET} scale={1.4} facing={-1} emotion="serious" seed={47} />
      </CharLayer>
      <Pop from={o(92.8)} to={o(98.6)} x={560} y={560} float><SareeStack size={210} /></Pop>
      {ENV.map((e, i) => (
        <React.Fragment key={i}>
          <Pop from={o(e.at)} x={e.x} y={640} float rot={(i - 1) * 6}><EnvelopeIcon size={230} color={e.col} ribbon /></Pop>
          {labelsOn && (
            <Pop from={o(105.66 + i * 0.9)} to={o(109.4)} x={e.x} y={800}>
              <div style={{fontFamily: FF, fontWeight: 700, fontSize: 40, background: '#FFF9E6', border: `3px solid ${INK}`, borderRadius: 10, padding: '4px 22px', color: '#5a3a1e', transform: 'rotate(-2deg)', whiteSpace: 'nowrap'}}>{e.label}</div>
            </Pop>
          )}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};
