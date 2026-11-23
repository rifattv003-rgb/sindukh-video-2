import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {DadiRoom} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {JewelBox, Exclaim} from '../components/Icons';
import {SpeechBubble, Stamp, Pop, Shake, CamZoom} from '../components/Ui';
import {mk, CharLayer, FEET, S, HEAD_Y} from './util';

export const START = 63.14;
export const Scene5: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const boroTalk = fr >= o(73.12) && fr < o(77.7);
  const fufuTalk = fr >= o(77.7) && fr < o(80.7);
  const shaking = fr >= o(69.2) && fr < o(72.6);
  const wipe = fr >= o(84.4) && fr < o(89.2);
  return (
    <AbsoluteFill>
      <Shake from={o(69.2)} to={o(72.8)} amp={7}>
        <CamZoom from={o(84)} to={o(89)} scale={1.2} fx={78} fy={42}>
          <DadiRoom />
          <CharLayer>
            <Character kind="boroChacha" x={420} y={FEET} scale={S} emotion={boroTalk || fr >= o(72) ? 'angry' : 'neutral'} talking={boroTalk} pose={boroTalk ? 'angry' : 'stand'} tremble={boroTalk ? 1.4 : 0} seed={3} />
            <Character kind="fufu" x={900} y={FEET} scale={S} emotion={fufuTalk ? 'angry' : fr >= o(65.3) ? 'surprised' : 'neutral'} talking={fufuTalk}
              pose={shaking ? 'angry' : 'hold'} tremble={shaking || fufuTalk ? 1.6 : 0} seed={15} />
            <Character kind="baba" x={1480} y={FEET} scale={S} facing={-1} emotion="sad" pose={wipe ? 'wipe' : 'stand'} seed={40} />
            <Character kind="sajjad" x={1760} y={FEET} scale={S} facing={-1} emotion="sad" seed={60} />
          </CharLayer>
          {/* empty jewellery box held up by Fufu */}
          <Pop from={o(63.9)} x={905} y={735} float={!shaking} rot={shaking ? 14 : 0}><JewelBox size={190} open empty /></Pop>
          <Pop from={o(71.6)} to={o(73.1)} x={640} y={420}><Exclaim size={130} /></Pop>
          <SpeechBubble from={o(73.12)} to={o(77.7)} x={420} y={HEAD_Y} w={700} angry text="কে সরিয়েছে? গত ঈদে মায়ের ঘরে কে একা ঢুকেছিল, সবাই জানে।" />
          <SpeechBubble from={o(77.7)} to={o(80.8)} x={900} y={HEAD_Y} w={680} angry text="ভাইয়া, তুমি আমার চোখের দিকে তাকিয়ে এ কথা বলছ?" />
          <Stamp from={o(88.1)} to={o(90.2)} x={1480} y={250} text="×৩" color="#C0392B" size={90} />
        </CamZoom>
      </Shake>
    </AbsoluteFill>
  );
};
