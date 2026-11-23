import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {VillageYard, CleanBg} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {QuestionIcon} from '../components/Icons';
import {OpenLedger, UmbrellaFolded, CoinStack} from '../components/Icons2';
import {CalendarIcon, Ledger} from '../components/Icons';
import {ThoughtBubble, Stamp, NameBadge, Pop, NoteCard, CamZoom} from '../components/Ui';
import {CHARS} from '../data/characters';
import {mk, CharLayer, FEET, S} from './util2';

export const START = 118.0;
export const P2Scene9: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const nx = interpolate(fr, [o(145.76), o(148.0)], [1700, 1590], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const talking = (fr >= o(136.9) && fr < o(138.4)) || (fr >= o(149.2) && fr < o(156.2));
  const final = fr >= o(156.4);
  const fade = interpolate(fr, [o(160.0), o(160.6)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <CamZoom from={o(130)} to={o(156)} scale={1.05} fx={80} fy={45}>
        <VillageYard night />
        <CharLayer>
          <Character kind="sajjad" x={260} y={FEET} scale={S} emotion="serious" look={1} seed={60} />
          <Character kind="baba" x={560} y={FEET} scale={S} emotion={fr >= o(146.8) ? 'surprised' : 'sad'} look={1} seed={40} />
          <Character kind="boroChacha" x={850} y={FEET} scale={S} emotion={fr >= o(119.5) ? 'serious' : 'sad'} look={1} seed={3} />
          <Character kind="fufu" x={1140} y={FEET} scale={S} emotion="sad" look={1} seed={20} />
          <Character kind="nasir" x={nx} y={FEET} scale={S} facing={-1} emotion="serious" talking={talking} pose="reach" holdSize={150}
            holdR={<UmbrellaFolded size={150} />} holdL={<Ledger size={90} />} seed={13} />
        </CharLayer>
        <ThoughtBubble from={o(119.52)} to={o(129.24)} x={850} y={268}><QuestionIcon size={120} /></ThoughtBubble>
        <Stamp from={o(129.24)} to={o(130.8)} x={850} y={300} text="গেল কোথায়?" size={64} />
        <Pop from={o(141.88)} to={o(145.76)} x={1370} y={700} float><OpenLedger size={300} marks={8} /></Pop>
        <NameBadge from={o(142.4)} to={o(145.76)} x={1370} y={770} text={CHARS.boroChacha.name} color={CHARS.boroChacha.badge} />
        <NameBadge from={o(143.1)} to={o(145.76)} x={1370} y={850} text={CHARS.baba.name} color={CHARS.baba.badge} />
        <NameBadge from={o(143.8)} to={o(145.76)} x={1370} y={930} text={CHARS.fufu.name} color={CHARS.fufu.badge} />
      </CamZoom>
      {final && (
        <AbsoluteFill>
          <CleanBg tone="dark" />
          <NoteCard from={o(156.4)} to={o(158.72)} x={960} y={300} text="পাঁচ দিনের মধ্যে" w={760} color="#FFE8A3" />
          <Pop from={o(156.5)} x={620} y={820} float><CalendarIcon size={420} day="৫" month="দিন" /></Pop>
          <Pop from={o(158.72)} x={1300} y={820} float><CoinStack size={420} /></Pop>
          <Stamp from={o(158.72)} x={960} y={330} text="৫ লক্ষ টাকা" size={100} rot={-4} />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{background: '#000', opacity: fade}} />
    </AbsoluteFill>
  );
};
