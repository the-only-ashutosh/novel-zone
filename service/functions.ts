import { MONTHS } from "@/types/consts";

export const getTimeDiff = (ftime: Date) => {
  if (!ftime) return "none";
  const timeDiff = Math.abs((Date.now() - new Date(ftime).getTime()) / 1000);
  const timeUnits = [
    { unit: "second", value: 60 },
    { unit: "minute", value: 60 },
    { unit: "hour", value: 24 },
    { unit: "day", value: 30 },
    { unit: "month", value: 12 },
    { unit: "year", value: Infinity },
  ];

  let unitIndex = 0;
  let diff = timeDiff;

  while (
    diff >= timeUnits[unitIndex].value &&
    unitIndex < timeUnits.length - 1
  ) {
    diff /= timeUnits[unitIndex].value;
    unitIndex++;
  }

  const roundedDiff = Math.floor(diff);
  const unit = timeUnits[unitIndex].unit;
  return roundedDiff > 1 ? `${roundedDiff} ${unit}s` : `${roundedDiff} ${unit}`;
};

export const getRecentTime = (ftime: Date) => {
  const s = getTimeDiff(new Date(ftime.getTime() + 19800));
  if (s.includes("second")) {
    return "JUST NOW";
  } else if (s.includes("minute")) {
    return Number(s.split(" ")[0]) < 10
      ? `${s.split(" ")[0]} MIN AGO`
      : `${s.split(" ")[0]} MINS AGO`;
  } else if (s.includes("hour")) {
    return Number(s.split(" ")[0]) < 10
      ? `${s.split(" ")[0]} HR AGO`
      : `${s.split(" ")[0]} HRS AGO`;
  } else if (s.includes("day")) {
    return Number(s.split(" ")[0]) < 10
      ? `${s.split(" ")[0]} DAY AGO`
      : `${s.split(" ")[0]} DAYS AGO`;
  } else if (s.includes("month")) {
    return Number(s.split(" ")[0]) < 10
      ? `${s.split(" ")[0]} MTH AGO`
      : `${s.split(" ")[0]} MTHS AGO`;
  }
};

export const correctString = (value: string): string => {
  const content = value
    .replaceAll("â", ` `)
    .replaceAll("Â", "")
    .replaceAll(" s ", "'s ")
    .replaceAll(" t ", "'t ")
    .replaceAll(" d ", "'d ")
    .replaceAll(" ll ", "'ll ")
    .replaceAll(`"½`, "")
    .replaceAll(`ï»¿`, "")
    .replaceAll(`"¦..`, "")
    .replaceAll(`"¦.`, "")
    .replaceAll(`"¦...`, "")
    .replaceAll(" ", "→")
    .replaceAll(`Ä±`, "I")
    .replaceAll(`"s `, "'s ")
    .replaceAll(`"ll `, "'ll ")
    .replaceAll(`"ve `, "'ve ")
    .replaceAll(` " `, " ")
    .replaceAll(`"t `, "'t ")
    .replaceAll(`"d `, "'d ")
    .replaceAll(``, "")
    .replaceAll(``, "")
    .replaceAll(``, "")
    .replaceAll(``, "")
    .replaceAll(``, "")
    .replaceAll(`"¦`, "...")
    .replaceAll(" ¦", "…")
    .replaceAll(String.raw`Nôv(el)B\\jnn`, "")
    .replaceAll(`n/ô/vel/b//in dot c//om`, "")
    .replaceAll(`n/ô/vel/b//jn dot c//om`, "")
    .replaceAll(`n/o/vel/b//in dot c//om`, "")
    .replaceAll("Novёlƒire.n(e)t", "NovelZone.fun")
    .replaceAll(`ηovёlFire .net`, "NovelZone.fun")
    .replaceAll("Ã©", "e")
    .replaceAll("Nôv(el)B\\jnn", "")
    .replaceAll(`n/o/vel/b//jn dot c//om`, "")
    .replaceAll(`KÃ¶prÃ¼lÃ¼`, "")
    .replaceAll(`n/Ã´/vel/b//jn dot c//om`, "")
    .replaceAll(`n/Ã´/vel/b//in dot c//om`, "")
    .replaceAll("pÎ±ndÎ±,noÎ½É1,ÑoÐ .", "")
    .replaceAll("соп#т@ҽո?†-ѕө$սг+ҫƹ-", "")
    .replaceAll("¢σп†@ҽп†--н?օ&ѕ$ҭе&ɗ%-*оп#-*", "")
    .replaceAll("MVLeMpYr", "novelzone")
    .replaceAll("NovelBin", "novelzone")
    .replaceAll("мѵʟ", "novelzone")
    .replaceAll("@@novelbin@@", "");
  return content
    .split("[hereisbreak]")
    .map((line) => {
      if (
        line.endsWith("empire") ||
        line.endsWith("My Virtual Library Empire") ||
        line.endsWith("m v|le|mp|yr") ||
        line.endsWith("NovelBin.net")
      ) {
        return (
          line
            .split("")
            .reverse()
            .join("")
            .replace(
              /(eripme\s|eripmE\s|môC\.niBlevoN\s)((?:.|\n)+?)(eunitnoC\s|dniF\s|ecneirepxE\s|erolpxE\s|yojnE\s|revocsiD\s|daeR\s|ruoY\s|yatS\s|ylnO\s)/g,
              ""
            )
            .replace(
              /(ten\.)((?:.|\n)+?)(eunitnoC\s|dniF\s|ecneirepxE\s|erolpxE\s|yojnE\s|revocsiD\s|daeR\s|ruoY\s|yatS\s|ylnO\s)/g,
              ""
            )
            //Continue reading on NovelBin.Côm
            .replace(
              /(ry\|pm\|el\|v m)((?:.|\n)+?)(eunitnoC\s|dniF\s|ecneirepxE\s|erolpxE\s|yojnE\s|revocsiD\s|daeR\s|ruoY\s|yatS\s|ylnO\s)/g,
              ""
            )
            .split("")
            .reverse()
            .join("")
        );
      } else if (
        line.includes("Source:") ||
        line.endsWith(".co") ||
        line.includes("𝕘") ||
        line.includes("𝕟") ||
        line.endsWith(".net")
      ) {
        return "";
      } else {
        return line;
      }
    })
    .join("[hereisbreak]");
};

export function titleToUrl(title: string) {
  const modified = title
    .toLowerCase()
    .replaceAll(", ", "-")
    .replaceAll("(fixed)", "")
    .replaceAll("(extra)", "")
    .replaceAll("(all chapters fixed)", "")
    .replaceAll("(all chapters fixed. download again)", "")
    .replaceAll("(all chapters fixed, redownload)", "")
    .replaceAll("(all chapters fixed, redownload book)", "")
    .replaceAll(". ", "-")
    .replaceAll("+", "")
    .replaceAll(".", "")
    .replaceAll(",", "-")
    .replaceAll(`‽`, "")
    .replaceAll(`“`, "-")
    .replaceAll(`”`, "")
    .replaceAll(`*`, "")
    .replaceAll(`"`, "")
    .replaceAll(`'`, "")
    .replaceAll("’", "")
    .replaceAll("?", "")
    .replaceAll("!", "")
    .replaceAll(` - `, "-")
    .replaceAll(" –", "-")
    .replaceAll(`: `, "-")
    .replaceAll(";", " ")
    .replaceAll(`/`, "-")
    .replaceAll(`\\`, "-")
    .replaceAll(`[`, "-")
    .replaceAll(`]`, "")
    .replaceAll(`(`, "-")
    .replaceAll(`)`, "")
    .replaceAll(" ", "-")
    .replaceAll("--", "-");
  if (modified.endsWith("-")) return modified.slice(0, -1);
  return modified;
}

export function checkNew(time: Date) {
  const num = time.getTime();
  if (new Date().getTime() - num < 60 * 60 * 24 * 1000) {
    return true;
  } else {
    return false;
  }
}

export function viewsNumberToString(views: number) {
  if (views < 1000) {
    return `${views} Views`;
  } else if (views > 999 && views < 10000) {
    return `${(views / 1000).toFixed(2)}K Views`;
  } else if (views > 9999 && views < 1000000) {
    return `${(views / 1000).toFixed(1)}K Views`;
  } else {
    return `${(views / 1000000).toFixed(2)}M Views`;
  }
}

export function dateFormat(time: Date) {
  time = new Date(time);
  const day = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();

  return `${MONTHS[month]}-${day}-${year}`;
}

export function decodePythonBytesString(str: string): string {
  // Remove the b"" or b'' wrapper
  const cleaned = str.replace(/^b['"]|['"]$/g, "");

  return (
    cleaned
      // Hexadecimal: \xNN
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex: string) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      // Unicode: \uNNNN
      .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex: string) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      // Common escaped characters
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\\\/g, "\\")
      .replaceAll(`\\'`, "'")
  );
}
