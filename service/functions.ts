export const getTimeDiff = (ftime: Date) => {
  if (!ftime) return "none";
  const timeDiff = Math.abs(
    (Date.now() - (new Date(ftime).getTime() - 330 * 60 * 1000)) / 1000
  );
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
  return value
    .replaceAll("â", `"`)
    .replaceAll("Â¯", "¯")
    .replaceAll(`"½`, "")
    .replaceAll(`ï»¿`, "")
    .replaceAll(`"¦..`, "")
    .replaceAll(`"¦.`, "")
    .replaceAll(`"¦...`, "")
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
    .replaceAll(String.raw`Nôv(el)B\\jnn`, "")
    .replaceAll(`n/ô/vel/b//in dot c//om`, "")
    .replaceAll(`n/o/vel/b//in dot c//om`, "")
    .replaceAll(`Your next read awaits at empire`, "")
    .replaceAll(`Read exclusive adventures at empire`, "")
    .replaceAll("Read latest stories on empire", "")
    .replaceAll(`Discover hidden stories at empire`, "")
    .replaceAll("Discover hidden tales at empire", "")
    .replaceAll(`Continue your adventure with empire`, "")
    .replaceAll(`Find exclusive stories on empire`, "")
    .replaceAll("Find your next adventure on empire", "")
    .replaceAll(`Continue reading at empire`, "")
    .replaceAll("Find your next read at empire", "")
    .replaceAll(`Explore more stories with empire`, "")
    .replaceAll("Enjoy exclusive adventures from empire", "")
    .replaceAll("Nôv(el)B\\jnn", "")
    .replaceAll(`n/o/vel/b//in dot c//om`, "")
    .replaceAll(`KÃ¶prÃ¼lÃ¼`, "")
    .replaceAll(` n/Ã´/vel/b//jn dot c//om`, "")
    .replaceAll("pÎ±ndÎ±,noÎ½É1,ÑoÐ .", "");
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
