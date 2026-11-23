import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Captions} from './components/Captions';
import {SCENES, f} from './data/timing';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';
import {Scene8} from './scenes/Scene8';

const COMPONENTS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8];

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Audio src={staticFile('voice.mp3')} volume={1} />
    {SCENES.map((sc, i) => {
      const C = COMPONENTS[i];
      return (
        <Sequence key={sc.id} from={f(sc.from)} durationInFrames={f(sc.to) - f(sc.from) + (i < SCENES.length - 1 ? 0 : 2)}>
          <C />
        </Sequence>
      );
    })}
    <Captions />
  </AbsoluteFill>
);
