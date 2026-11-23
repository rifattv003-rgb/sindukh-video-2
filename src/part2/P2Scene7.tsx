import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {NightVeranda} from '../components/Backgrounds2';
import {Character} from '../components/Character';
import {Paper} from '../components/Icons';
import {SpeechBubble, Shake, CamZoom} from '../components/Ui';
import {mk, CharLayer, FEET} from './util2';

export const START = 80.5;
export const P2Scene7: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const sTalk = fr >= o(83.1) && fr < o(84.8);
  const bTalk = fr >= o(84.9) && fr < o(86.5);
  return (
    <AbsoluteFill>
      <Shake from={o(83.1)} to={o(84.2)} amp={6}>
        <CamZoom from={0} to={o(87)} scale={1.1} fx={50} fy={40}>
          <NightVeranda pillarX={90} lampX={960} />
          <CharLayer>
            <Character kind="sajjad" x={620} y={FEET} scale={1.6} emotion={fr >= o(83.0) ? 'surprised' : 'serious'} talking={sTalk} tremble={sTalk ? 1 : 0}
              pose="hold" holdSize={120} holdR={<Paper size={120} stamp={false} />} seed={60} />
            <Character kind="baba" x={1300} y={FEET} scale={1.6} facing={-1} emotion="sad" talking={bTalk} seed={40} />
          </CharLayer>
          <SpeechBubble from={o(83.1)} to={o(84.9)} x={620} y={228} w={520} text="বাবা, তুমি জানতে?" />
          <SpeechBubble from={o(84.9)} to={o(86.6)} x={1300} y={228} w={560} text="মা নিষেধ করেছিলেন।" />
        </CamZoom>
      </Shake>
    </AbsoluteFill>
  );
};
