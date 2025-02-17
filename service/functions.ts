export const getTimeDiff = (ftime: Date) => {
  if (!ftime) return "none";
  const timeDiff = Math.abs((Date.now() - new Date(ftime).getTime()) / 1000);
  if (timeDiff < 60) {
    return timeDiff > 1
      ? `${Math.round(timeDiff)} seconds`
      : `${Math.round(timeDiff)} second`;
  } else if (timeDiff >= 60 && timeDiff < 3600) {
    const minutes = Math.floor(timeDiff / 60);
    return minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
  } else if (timeDiff >= 3600 && timeDiff < 3600 * 24) {
    const hours = Math.floor(timeDiff / 3600);
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  } else if (timeDiff >= 24 * 3600 && timeDiff < 3600 * 24 * 30) {
    const days = Math.floor(timeDiff / (24 * 3600));
    return days > 1 ? `${days} days` : `${days} day`;
  } else if (timeDiff >= 3600 * 24 * 30 && timeDiff < 3600 * 24 * 30 * 12) {
    const months = Math.floor(timeDiff / (3600 * 24 * 30));
    return months > 1 ? `${months} months` : `${months} month`;
  } else if (timeDiff >= 3600 * 24 * 30 * 12) {
    const years = Math.floor(timeDiff / (3600 * 24 * 30 * 12));
    return years > 1 ? `${years} years` : `${years} year`;
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
        //Freewebnovel
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
