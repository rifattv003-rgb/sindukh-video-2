import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {DadiRoom} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {EnvelopeIcon, QuestionIcon, CalendarIcon} from '../components/Icons';
import {Pop, NoteCard, CamZoom, Stamp} from '../components/Ui';
import {mk, CharLayer, FEET, S} from './util';

export const START = 110;
export const Scene7: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const sat = fr >= o(117.4);
  const grip = fr >= o(124);
  return (
    <AbsoluteFill>
      <CamZoom from={o(116)} to={o(128)} scale={1.55} fx={46} fy={50}>
        <DadiRoom dim />
        <CharLayer>
          <Character kind="sajjad" x={300} y={FEET} scale={S} emotion="serious" seed={7} />
          <Character kind="fufu" x={1420} y={FEET} scale={S} facing={-1} emotion="sad" seed={21} />
          <Character kind="baba" x={1720} y={FEET} scale={S} facing={-1} emotion="serious" seed={47} />
          <Character kind="boroChacha" x={860} y={FEET} scale={S} emotion={sat ? 'sad' : 'serious'} pose="hold" sitting={sat}
            tremble={grip ? 1.2 : 0} holdSize={150} holdR={<EnvelopeIcon size={150} color="#F6E7C1" ribbon />} seed={3} />
        </CharLayer>
        <Pop from={o(119.4)} to={o(123.9)} x={1230} y={600} float><CalendarIcon size={210} day="?" month="তারিখ" /></Pop>
        <Pop from={o(119.6)} to={o(123.9)} x={520} y={620} float><QuestionIcon size={180} /></Pop>
        <NoteCard from={o(119.4)} to={o(123.9)} x={860} y={330} text="একমাত্র তিনিই জানতেন" w={780} color="#FFE8A3" />
      </CamZoom>
    </AbsoluteFill>
  );
};
