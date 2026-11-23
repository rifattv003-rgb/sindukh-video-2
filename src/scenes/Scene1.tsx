import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {VillageYard} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {KeyBunch, BagIcon} from '../components/Icons';
import {SpeechBubble, NameBadge, LocationPill, CamZoom} from '../components/Ui';
import {CHARS} from '../data/characters';
import {mk, CharLayer, Spot, FEET, S, HEAD_Y} from './util';

export const START = 0;
export const Scene1: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const talking = fr >= o(0.28) && fr < o(5.12);
  const wipe = fr >= o(20.6) && fr < o(22.4);
  return (
    <AbsoluteFill>
      <CamZoom from={0} to={o(11)} scale={1.07} fx={30} fy={45}>
        <VillageYard />
        <CharLayer>
          <Character kind="boroChacha" x={430} y={FEET} scale={S} emotion={talking ? 'angry' : 'serious'} talking={talking} pose={talking ? 'angry' : 'stand'} tremble={talking ? 1.2 : 0} />
          <Character kind="fufu" x={860} y={FEET} scale={S} emotion="serious" pose="hold" holdR={<KeyBunch size={100} />} seed={20} />
          <Character kind="baba" x={1290} y={FEET} scale={S} facing={-1} emotion="serious" pose={wipe ? 'wipe' : 'stand'} seed={40} />
          <Character kind="sajjad" x={1690} y={FEET} scale={S} facing={-1} emotion="sad" seed={60} />
        </CharLayer>
        <Spot x={1860} y={FEET + 30}><BagIcon size={120} /></Spot>
      </CamZoom>
      <LocationPill from={o(0.5)} to={o(6)} text="গ্রামের টিনের ঘর • দাদির মৃত্যুর তৃতীয় দিন" />
      <SpeechBubble from={o(0.28)} to={o(5.2)} x={470} y={HEAD_Y} w={720} angry text="চাবি আমার কাছে থাকবে। আমি বড় ছেলে, মায়ের সিন্দুক আমিই খুলব।" />
      <NameBadge from={o(0.5)} to={o(5.2)} x={430} y={FEET + 70} text={CHARS.boroChacha.name} color={CHARS.boroChacha.badge} />
      <NameBadge from={o(6.5)} to={o(10.8)} x={860} y={HEAD_Y} text={CHARS.fufu.name} color={CHARS.fufu.badge} />
      <NameBadge from={o(7.5)} to={o(10.8)} x={1290} y={HEAD_Y} text={CHARS.baba.name} color={CHARS.baba.badge} />
      <NameBadge from={o(8.5)} to={o(10.8)} x={1690} y={HEAD_Y} text={CHARS.sajjad.name} color={CHARS.sajjad.badge} />
    </AbsoluteFill>
  );
};
