import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CleanBg} from '../components/Backgrounds';
import {EnvelopeIcon} from '../components/Icons';
import {BankIcon, Necklace, HeartIcon, CoinStack, CompareCard} from '../components/Icons2';
import {Pop} from '../components/Ui';
import {LetterCard} from '../components/Letter';
import {mk} from './util2';

export const START = 66.9;
export const L3 = 'মেজ খোকা, সাজ্জাদের ভর্তির টাকা তুই ব্যাংকের ধার বলেছিলি। ব্যাংক ধার দেয়নি, আমার হার দিয়েছে। নাতি জানলে সংকোচে পড়বে, তাই তুইও বলিস না।';
export const P2Scene6: React.FC = () => {
  const o = mk(START);
  return (
    <AbsoluteFill>
      <CleanBg />
      <Pop from={o(67.0)} to={o(69.1)} x={960} y={820} float rot={-4}><EnvelopeIcon size={520} ribbon /></Pop>
      <LetterCard from={o(69.1)} to={o(80.5)} x={600} y={940} w={860} text={L3} size={44} sender="দাদির চিঠি" />
      <Pop from={o(71.74)} to={o(80.5)} x={1300} y={300} float><CoinStack size={170} /></Pop>
      <CompareCard from={o(72.94)} to={o(80.5)} x={1480} y={620} label="ব্যাংকের ধার" ok={false}><BankIcon size={100} /></CompareCard>
      <CompareCard from={o(75.02)} to={o(80.5)} x={1480} y={880} label="আমার হার" ok><Necklace size={100} /></CompareCard>
      <Pop from={o(77.84)} to={o(80.5)} x={1700} y={330} float><HeartIcon size={130} /></Pop>
    </AbsoluteFill>
  );
};
