import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { fetchMeetupData } from "../src/lib/data/googleSheet.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(
  scriptDirectory,
  "../src/lib/data/latestMeetup.generated.js",
);

try {
  const { upcoming, latest } = await fetchMeetupData();
  const latestMeetup = upcoming ?? latest;

  if (!latestMeetup) {
    throw new Error("Google Sheet에 밋업 데이터가 없습니다.");
  }

  const output = `// npm run dev/build 실행 시 Google Sheets에서 자동 생성됩니다.\nexport const latestMeetup = ${JSON.stringify(latestMeetup, null, 2)};\n`;

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, "utf8");
  console.log(`최신 밋업 #${latestMeetup.meetup} 데이터를 갱신했습니다.`);
} catch (error) {
  console.warn(
    `Google Sheets 데이터를 갱신하지 못해 기존 변수를 사용합니다: ${error.message}`,
  );
}
