export type Kind = 'sajjad' | 'baba' | 'boroChacha' | 'fufu' | 'nasir' | 'dadi';
export type Cfg = {
  name: string; W: number; skin: string; hair: string;
  hairStyle: 'short' | 'bald' | 'covered' | 'grayshort';
  top: string; topShade: string; bottom: string;
  outfit: 'shirtJeans' | 'panjabi' | 'shirtLungi' | 'saree';
  sleeve: 'short' | 'long';
  headRx: number; headRy: number;
  glasses?: 'round' | 'gold'; mustache?: boolean; beard?: 'stubble' | 'salt' | 'grayLong';
  badge: string; wrinkles?: boolean;
};
export const CHARS: Record<Kind, Cfg> = {
  sajjad: {name: 'সাজ্জাদ', W: 110, skin: '#F0BD95', hair: '#1c1c1f', hairStyle: 'short', top: '#FFFFFF', topShade: '#E4E8EE',
    bottom: '#2F5FB3', outfit: 'shirtJeans', sleeve: 'short', headRx: 60, headRy: 68, beard: 'stubble', badge: '#3C7BD9'},
  baba: {name: 'বাবা', W: 130, skin: '#E8B48A', hair: '#8A8A8F', hairStyle: 'grayshort', top: '#FFFFFF', topShade: '#E6E6EA',
    bottom: '#F4F4F6', outfit: 'panjabi', sleeve: 'long', headRx: 62, headRy: 68, glasses: 'round', mustache: true, badge: '#3FA66B'},
  boroChacha: {name: 'বড় চাচা', W: 176, skin: '#D9A074', hair: '#555', hairStyle: 'bald', top: '#8E959C', topShade: '#757C83',
    bottom: '#3F7A55', outfit: 'shirtLungi', sleeve: 'long', headRx: 70, headRy: 72, beard: 'salt', badge: '#D64545'},
  fufu: {name: 'ফুফু', W: 122, skin: '#EDB88F', hair: '#2b2b2b', hairStyle: 'covered', top: '#B9BEC4', topShade: '#9EA4AB',
    bottom: '#B9BEC4', outfit: 'saree', sleeve: 'short', headRx: 58, headRy: 64, badge: '#C2559B'},
  nasir: {name: 'মহাজন কাকা নাসির', W: 104, skin: '#DDA77C', hair: '#9a9a9a', hairStyle: 'grayshort', top: '#FFFFFF', topShade: '#E3E3E8',
    bottom: '#F6F6F8', outfit: 'panjabi', sleeve: 'long', headRx: 52, headRy: 80, glasses: 'gold', beard: 'grayLong', badge: '#8B5E1A'},
  dadi: {name: 'দাদি', W: 112, skin: '#E3B08A', hair: '#EDEDEF', hairStyle: 'covered', top: '#FFFFFF', topShade: '#E6E6EA',
    bottom: '#FFFFFF', outfit: 'saree', sleeve: 'short', headRx: 56, headRy: 62, glasses: 'round', wrinkles: true, badge: '#8B6B4A'},
};
