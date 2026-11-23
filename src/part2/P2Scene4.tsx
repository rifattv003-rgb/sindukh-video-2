import React from 'react';
import {AbsoluteFill} from 'remotion';
import {NightVeranda} from '../components/Backgrounds2';
import {Character} from '../components/Character';
import {CalendarIcon} from '../components/Icons';
import {ThoughtBubble, CamZoom} from '../components/Ui';
import {mk, CharLayer, FEET, S} from './util2';

export const START = 36.66;
export const P2Scene4: React.FC = () => {
  const o = mk(START);
  return (
    <AbsoluteFill>
      <CamZoom from={o(39)} to={o(46.5)} scale={1.15} fx={30} fy={30}>
        <NightVeranda pillarX={470} lampX={1050} />
        <CharLayer style={{filter: 'blur(3px)', opacity: 0.8}}>
          <Character kind="fufu" x={1080} y={FEET} scale={1.3} emotion="sad" seed={20} />
          <Character kind="baba" x={1360} y={FEET} scale={1.3} emotion="sad" seed={40} />
          <Character kind="sajjad" x={1640} y={FEET} scale={1.3} facing={-1} emotion="sad" seed={60} />
        </CharLayer>
        <CharLayer>
          <Character kind="boroChacha" x={335} y={FEET} scale={S} emotion="sad" pose="fist" tremble={0.8} seed={3} />
        </CharLayer>
        <ThoughtBubble from={o(41.44)} to={o(47.9)} x={335} y={268}>
          <CalendarIcon size={110} day="১২" month="বছর" />
        </ThoughtBubble>
      </CamZoom>
    </AbsoluteFill>
  );
};
