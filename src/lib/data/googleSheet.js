const SHEET_ID = "1ab5urN-HU6Xqn92WcyLTEMGIKm_ZC-JhssYp3O7cfhY";
const SHEET_GID = "0";

const SHEET_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export` +
  `?format=csv&gid=${SHEET_GID}`;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((value) => value !== "")) rows.push(row);

  const [headers, ...values] = rows;
  return values.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])),
  );
}

function formatDate(value, includeWeekday = false) {
  const [month, day, year] = value.split("/").map(Number);
  if (!month || !day || !year) return value;

  const formatted = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
  if (!includeWeekday) return formatted;

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[new Date(year, month - 1, day).getDay()];
  return `${formatted} (${weekday})`;
}

function sessionsFromRow(row) {
  return [
    {
      speaker: row.Speaker1.trim(),
      title: row.Title1.trim(),
      content: row.Contents1.trim(),
    },
    {
      speaker: row.Speaker2.trim(),
      title: row.Title2.trim(),
      content: row.Contents.trim(),
    },
    {
      speaker: row.Speaker3.trim(),
      title: row.Title3.trim(),
      content: row.Contents3.trim(),
    },
  ].filter((session) => session.speaker);
}

function meetupFromRow(row) {
  const meetup = Number(row.Meetup);
  const sessions = sessionsFromRow(row);

  return {
    meetup,
    idx: meetup,
    label: `#${String(meetup).padStart(2, "0")}`,
    type: row.Type.trim().toLowerCase(),
    link: row.Link.trim(),
    img: row.Img.trim(),
    date: formatDate(row.Date, row.Type.trim().toLowerCase() === "upcoming"),
    location: row.Location.trim(),
    subject: row.Subject.trim(),
    title: row.Subject.trim(),
    sessions,
    speakers: sessions.map((session) => session.speaker),
  };
}

export async function fetchMeetupData() {
  const response = await fetch(`${SHEET_CSV_URL}&_=${Date.now()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google Sheet request failed: ${response.status}`);
  }

  const rows = parseCsv(await response.text());
  const meetups = rows
    .map(meetupFromRow)
    .filter((meetup) => Number.isFinite(meetup.meetup))
    .sort((a, b) => b.meetup - a.meetup);

  return {
    upcoming: meetups.find((meetup) => meetup.type === "upcoming") ?? null,
    past: meetups.filter((meetup) => meetup.type !== "upcoming"),
  };
}
