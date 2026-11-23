import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {VillageYard} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {KeyBunch, BagIcon, KeyIcon} from '../components/Icons';
import {SpeechBubble, Pop, CamZoom} from '../components/Ui';
import {mk, CharLayer, Spot, FEET, S, HEAD_Y} from './util';

export const START = 11;
export const Scene2: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const fufuTalk = fr >= o(26.7) && fr < o(31.54);
  const wipe = fr >= o(20.6) && fr < o(26.5);
  return (
    <AbsoluteFill>
      <CamZoom from={o(24)} to={o(30)} scale={1.18} fx={45} fy={40}>
        <VillageYard />
        <CharLayer>
          <Character kind="boroChacha" x={430} y={FEET} scale={S} emotion="angry" pose="angry" tremble={0.8} seed={5} />
          <Character kind="fufu" x={860} y={FEET} scale={S} emotion={fufuTalk ? 'angry' : 'serious'} talking={fufuTalk} pose="hold" holdR={<KeyBunch size={100} />} tremble={fufuTalk ? 1.2 : 0} seed={20} />
          <Character kind="baba" x={1290} y={FEET} scale={S} facing={-1} emotion="serious" pose={wipe ? 'wipe' : 'stand'} seed={40} />
          <Character kind="sajjad" x={1690} y={FEET} scale={S} facing={-1} emotion="sad" seed={60} />
        </CharLayer>
        <Spot x={1860} y={FEET + 30}><BagIcon size={120} /></Spot>
        {/* key icon pulse near Fufu while the keys are described */}
        <Pop from={o(12.3)} to={o(19.4)} x={1060} y={470} float><KeyIcon size={150} /></Pop>
        <SpeechBubble from={o(26.7)} to={o(31.6)} x={860} y={HEAD_Y} w={720} angry text="ভাইয়া, মা চাবিটা আমার হাতেই দিয়েছিলেন! তুমি শুধু পাশে দাঁড়িয়ে দেখো।" />
      </CamZoom>
    </AbsoluteFill>
  );
};
