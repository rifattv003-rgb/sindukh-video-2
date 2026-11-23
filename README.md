# সিন্দুকের ভেতরের গোপন কথা — Remotion Project

16:9 · 1920×1080 · 30fps · ~178 সেকেন্ড (public/voice.mp3 এর দৈর্ঘ্য ১৭৮.০৫ সে.)

## কমান্ড
```
npm install
npx remotion studio
npx remotion render src/index.ts Story out/video.mp4
```
(`npm install` ব্যর্থ হলে: `npx remotion upgrade` চালান)

## পার্ট ২ (আলাদা ভিডিও, ১৬০.৬ সে.)
```
npx remotion studio            # Part2 কম্পোজিশন বেছে নিন
npx remotion render src/index.ts Part2 out/part2.mp4
```
- src/part2/ — ৯টি সিন (P2Scene1–9), Video2.tsx, data.ts (টাইমিং ও ক্যাপশন)
- public/voice2.mp3 — পার্ট ২ অডিও

## ফাইল ম্যাপ
- src/data/timing.ts — সিনের সময়
- src/data/overlays.ts — নিচের ক্যাপশন + কখন ক্যাপশন লুকাবে (বাবল/কার্ড চলাকালীন)
- src/components/Character.tsx, Face.tsx — ক্যারেক্টার ও এক্সপ্রেশন
- src/components/Backgrounds.tsx — গ্রামের উঠান, দাদির ঘর, ক্লিন ব্যাকগ্রাউন্ড
- src/scenes/Scene1..8.tsx — ৮টি সিন
