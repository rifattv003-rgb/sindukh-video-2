import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, TOTAL_FRAMES} from './data/timing';
import {Video2} from './part2/Video2';
import {TOTAL_FRAMES as TOTAL2} from './part2/data';

export const Root: React.FC = () => (
  <>
    <Composition id="Story" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="Part2" component={Video2} durationInFrames={TOTAL2} fps={FPS} width={1920} height={1080} />
  </>
);
