import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CleanBg} from '../components/Backgrounds';
import {OpenLedger, CoinStack, HeartIcon, ClothRoll} from '../components/Icons2';
import {QuestionIcon} from '../components/Icons';
import {Pop} from '../components/Ui';
import {MemoryCircle} from '../components/Letter';
import {mk} from './util2';

export const START = 0;
export const P2Scene1: React.FC = () => {
  const o = mk(START);
  return (
    <AbsoluteFill>
      <CleanBg />
      <Pop from={o(0.3)} x={960} y={840} float><OpenLedger size={700} marks={9} /></Pop>
      <Pop from={o(2.9)} to={o(8.1)} x={640} y={470} float><HeartIcon size={150} /></Pop>
      <Pop from={o(3.5)} to={o(8.1)} x={1290} y={440} float><CoinStack size={170} /></Pop>
      <Pop from={o(4.1)} to={o(8.1)} x={960} y={330} float><HeartIcon size={120} /></Pop>
      <Pop from={o(4.6)} to={o(8.1)} x={1480} y={640} float rot={8}><ClothRoll size={140} /></Pop>
      <MemoryCircle from={o(4.0)} to={o(8.2)} x={380} y={820} size={340} />
      <Pop from={o(6.8)} to={o(8.2)} x={1560} y={470} float><QuestionIcon size={210} /></Pop>
    </AbsoluteFill>
  );
};
