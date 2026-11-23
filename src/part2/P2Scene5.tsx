import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {NightVeranda} from '../components/Backgrounds2';
import {Character} from '../components/Character';
import {EnvelopeIcon} from '../components/Icons';
import {GoldMelt, Necklace, HeartIcon} from '../components/Icons2';
import {Pop} from '../components/Ui';
import {LetterCard, MemoryCircle} from '../components/Letter';
import {mk, CharLayer, FEET, S} from './util2';

export const START = 47.9;
export const L2 = 'ছোট খুকি, তোর বিয়ের গয়নাগুলো বাজার থেকে কেনা নয়, আমার নিজের গয়না গলিয়ে গড়া। তুই কিনে দেওয়া ভেবে হেসেছিলি, আমি তোর ওই হাসিটাই চেয়েছিলাম।';
export const P2Scene5: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const covering = fr >= o(64.7);
  const opening = fr >= o(49.8);
  return (
    <AbsoluteFill>
      <NightVeranda pillarX={90} lampX={1000} />
      <CharLayer>
        <Character kind="fufu" x={380} y={FEET} scale={S} emotion="sad" pose={covering ? 'wipe' : 'hold'} tremble={opening ? 1.8 : 0}
          holdSize={120} holdR={covering ? undefined : <EnvelopeIcon size={120} color="#F6E7C1" ribbon />} seed={20} />
        <Character kind="sajjad" x={830} y={FEET} scale={1.3} facing={-1} emotion="sad" seed={60} />
      </CharLayer>
      <MemoryCircle from={o(54.0)} to={o(64.7)} x={800} y={380} size={240} />
      <Pop from={o(56.34)} to={o(58.54)} x={1080} y={360} float><Necklace size={150} /></Pop>
      <Pop from={o(58.54)} to={o(62.1)} x={1080} y={380} float><GoldMelt size={170} /></Pop>
      <Pop from={o(62.16)} to={o(64.7)} x={1080} y={360} float><HeartIcon size={140} /></Pop>
      <LetterCard from={o(53.84)} to={o(64.7)} x={1460} y={990} w={720} text={L2} size={40} sender="দাদির চিঠি" />
    </AbsoluteFill>
  );
};
