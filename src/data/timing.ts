export const FPS = 30;
export const TOTAL_SEC = 178.05;
export const TOTAL_FRAMES = Math.ceil(TOTAL_SEC * FPS);
export const f = (s: number) => Math.round(s * FPS);

// Scene ranges in seconds (from SRT)
export const SCENES = [
  {id: 1, from: 0, to: 11},
  {id: 2, from: 11, to: 31.6},
  {id: 3, from: 31.6, to: 43.1},
  {id: 4, from: 43.1, to: 63.14},
  {id: 5, from: 63.14, to: 90.3},
  {id: 6, from: 90.3, to: 110},
  {id: 7, from: 110, to: 130.34},
  {id: 8, from: 130.34, to: 178.05},
];
