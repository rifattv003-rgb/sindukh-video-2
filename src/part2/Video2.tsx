import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Captions} from '../components/Captions';
import {SCENES2, CAPTIONS2, HIDE2, f} from './data';
import {P2Scene1} from './P2Scene1';
import {P2Scene2} from './P2Scene2';
import {P2Scene3} from './P2Scene3';
import {P2Scene4} from './P2Scene4';
import {P2Scene5} from './P2Scene5';
import {P2Scene6} from './P2Scene6';
import {P2Scene7} from './P2Scene7';
import {P2Scene8} from './P2Scene8';
import {P2Scene9} from './P2Scene9';

const COMPONENTS = [P2Scene1, P2Scene2, P2Scene3, P2Scene4, P2Scene5, P2Scene6, P2Scene7, P2Scene8, P2Scene9];

export const Video2: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Audio src={staticFile('voice2.mp3')} volume={1} />
    {SCENES2.map((sc, i) => {
      const C = COMPONENTS[i];
      return (
        <Sequence key={sc.id} from={f(sc.from)} durationInFrames={f(sc.to) - f(sc.from) + (i === SCENES2.length - 1 ? 2 : 0)}>
          <C />
        </Sequence>
      );
    })}
    <Captions captions={CAPTIONS2} hide={HIDE2} />
  </AbsoluteFill>
);
