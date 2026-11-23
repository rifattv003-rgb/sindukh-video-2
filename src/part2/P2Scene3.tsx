import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {NightVeranda} from '../components/Backgrounds2';
import {Character} from '../components/Character';
import {EnvelopeIcon} from '../components/Icons';
import {Bangles, ClothRoll, HeartIcon, CoinStack} from '../components/Icons2';
import {SpeechBubble, Pop} from '../components/Ui';
import {LetterCard, MemoryCircle} from '../components/Letter';
import {mk, CharLayer, FEET} from './util2';

export const START = 18.8;
export const L1 = 'বড় খোকা, তোর কাপড়ের ব্যবসার জন্য যেদিন টাকা লাগল, আমার চুড়ি দুটো বেচে দিয়েছি। তুই ভেবেছিলি মহাজনের ধার, আমি ভাঙিনি। ব্যবসা চলেনি বলে নিজেকে দোষ দিস না।';
export const P2Scene3: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const reading = fr >= o(21.0) && fr < o(36.66);
  return (
    <AbsoluteFill>
      <NightVeranda pillarX={90} lampX={800} />
      <CharLayer>
        <Character kind="fufu" x={170} y={FEET} scale={1.3} emotion="sad" seed={20} />
        <Character kind="baba" x={430} y={FEET} scale={1.3} emotion="sad" seed={40} />
        <Character kind="boroChacha" x={690} y={FEET} scale={1.3} emotion={fr < o(21) ? 'serious' : 'sad'} talking={fr < o(21)} seed={3} />
        <Character kind="sajjad" x={960} y={FEET} scale={1.3} facing={-1} emotion="serious" talking={reading} pose="hold" holdSize={110} holdR={<EnvelopeIcon size={110} />} seed={60} />
      </CharLayer>
      <SpeechBubble from={o(18.8)} to={o(21.0)} x={690} y={372} w={560} text="জোরে পড়। সবাই শুনুক।" />
      <MemoryCircle from={o(24.4)} to={o(36.6)} x={1160} y={390} size={250} />
      <Pop from={o(25.8)} to={o(29.4)} x={1450} y={350} float><ClothRoll size={150} /></Pop>
      <Pop from={o(29.4)} to={o(33.2)} x={1450} y={350} float><Bangles size={150} /></Pop>
      <Pop from={o(31.0)} to={o(36.6)} x={1650} y={350} float><CoinStack size={150} /></Pop>
      <Pop from={o(34.4)} to={o(36.6)} x={1450} y={350} float><HeartIcon size={130} /></Pop>
      <LetterCard from={o(24.2)} to={o(36.66)} x={1500} y={990} w={760} text={L1} size={40} sender="দাদির চিঠি" />
    </AbsoluteFill>
  );
};
