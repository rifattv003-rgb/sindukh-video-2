import React from 'react';
import {FPS} from '../data/timing';

/** abs-seconds → local frame, for a scene that starts at `start` seconds */
export const mk = (start: number) => (abs: number) => Math.round((abs - start) * FPS);

export const CharLayer: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, ...style}} preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
);

/** Positioned HTML icon (bottom-center anchored) with no animation */
export const Spot: React.FC<{x: number; y: number; rot?: number; children: React.ReactNode}> = ({x, y, rot = 0, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) rotate(${rot}deg)`}}>{children}</div>
);

export const FEET = 985;
export const S = 1.5;
export const HEAD_Y = 262; // tail-tip / badge baseline above a 1.5x character's head
