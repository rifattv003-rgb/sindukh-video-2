import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {VillageYard, CleanBg} from '../components/Backgrounds';
import {Character} from '../components/Character';
import {KeyBunch, EnvelopeIcon, Umbrella, Ledger, Paper, CalendarIcon, Hourglass} from '../components/Icons';
import {SpeechBubble, NameBadge, Pop, CamZoom, NoteCard} from '../components/Ui';
import {CHARS} from '../data/characters';
import {mk, CharLayer, Spot, FEET, S, HEAD_Y} from './util';

export const START = 130.34;
export const Scene8: React.FC = () => {
  const fr = useCurrentFrame();
  const o = mk(START);
  const nx = interpolate(fr, [o(135), o(146)], [2150, 1560], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const walking = fr < o(146);
  const talking = fr >= o(146.4) && fr < o(156.6);
  const dropped = fr >= o(157.7);
  const fall = interpolate(fr, [o(157.7), o(158.5)], [720, FEET + 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lookBack = fr >= o(135.4) && fr < o(138) ? 1 : 0;
  const cardOn = fr >= o(170.9) && fr < o(173.2);
  const fade = interpolate(fr, [o(176.9), o(178)], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <CamZoom from={o(146)} to={o(176)} scale={1.14} fx={80} fy={45}>
        <VillageYard />
        <CharLayer>
          <Character kind="sajjad" x={260} y={FEET} scale={S} emotion={fr >= o(135.4) ? 'surprised' : 'sad'} look={lookBack} seed={7} />
          <Character kind="baba" x={560} y={FEET} scale={S} emotion={fr >= o(135.4) ? 'surprised' : 'serious'} look={1} seed={47} />
          <Character kind="boroChacha" x={850} y={FEET} scale={S} emotion={fr >= o(135.4) ? 'surprised' : 'sad'} look={1} pose="hold" holdSize={120} holdR={<EnvelopeIcon size={120} ribbon />} seed={3} />
          <Character kind="fufu" x={1140} y={FEET} scale={S} emotion={fr >= o(135.4) ? 'surprised' : 'sad'} look={1} pose="hold" holdR={dropped ? undefined : <KeyBunch size={100} />} tremble={dropped ? 1.4 : 0} seed={21} />
          <Character kind="nasir" x={nx} y={FEET} scale={S} facing={-1} emotion={talking ? 'serious' : 'serious'} talking={talking} pose="reach" holdSize={150} holdR={<Umbrella size={150} />} holdL={<Ledger size={90} />} seed={13} />
        </CharLayer>
        {/* falling key bunch */}
        {dropped && <Spot x={1140 + 130} y={fall}><KeyBunch size={110} /></Spot>}
        {/* page A / B / C bubbles */}
        <SpeechBubble from={o(146.4)} to={o(149.8)} x={nx} y={HEAD_Y + 10} w={640} text="মায়ের শোকে সবাই আছ, তাই আজ আসতাম না।" />
        <SpeechBubble from={o(149.8)} to={o(152.4)} x={nx} y={HEAD_Y + 10} w={640} text="কিন্তু শুক্রবার আসতে আর পাঁচ দিন বাকি।" />
        <SpeechBubble from={o(152.4)} to={o(156.6)} x={nx} y={HEAD_Y + 10} w={660} text="এই বাড়ি আর উঠানসহ জমি তোমাদের মা আমার কাছে বন্ধক রেখে গেছেন।" />
        <Pop from={o(150.2)} to={o(152.4)} x={nx - 380} y={560} float><CalendarIcon size={170} day="৫" month="শুক্রবার" /></Pop>
        <Pop from={o(166.4)} to={o(170.9)} x={nx - 330} y={620} float rot={-6}><Paper size={260} /></Pop>
        <NameBadge from={o(138.2)} to={o(146.2)} x={nx} y={HEAD_Y} text={CHARS.nasir.name} color={CHARS.nasir.badge} />
      </CamZoom>
      {/* countdown card: full-screen dark motion-graphic overlay */}
      {cardOn && (
        <AbsoluteFill>
          <CleanBg tone="dark" />
          <Pop from={o(170.95)} to={o(173.2)} x={640} y={760} float><CalendarIcon size={420} day="৫" month="দিন বাকি" /></Pop>
          <Pop from={o(171.2)} to={o(173.2)} x={1280} y={760} float><Hourglass size={340} /></Pop>
          <NoteCard from={o(171.4)} to={o(173.2)} x={960} y={300} text="পাঁচ দিনের মধ্যে" w={760} color="#FFE8A3" />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{background: '#000', opacity: fade}} />
    </AbsoluteFill>
  );
};
