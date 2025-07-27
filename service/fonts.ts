import localFont from "next/font/local";

const caveat = localFont({
  src: "../app/fonts/Caveat-Regular.ttf",
  variable: "--font-caveat-regular",
  weight: "300",
});
const exo2 = localFont({
  src: "../app/fonts/Exo2-Regular.ttf",
  variable: "--font-exo-two-regular",
  weight: "300",
});
const hindMysuru = localFont({
  src: "../app/fonts/HindMysuru-Regular.ttf",
  variable: "--font-hind-mysuru-regular",
  weight: "300",
});
const inter = localFont({
  src: "../app/fonts/Inter_24pt-Regular.ttf",
  variable: "--font-inter",
  weight: "300",
});
const josefinsSans = localFont({
  src: "../app/fonts/JosefinSans-Regular.ttf",
  variable: "--font-josefins-sans-regular",
  weight: "300",
});
const openSans = localFont({
  src: "../app/fonts/OpenSans-Regular.ttf",
  variable: "--font-opensans-regular",
  weight: "300",
});
const playWrite = localFont({
  src: "../app/fonts/PlaywriteAUNSWGuides-Regular.ttf",
  variable: "--font-play-write-regular",
  weight: "300",
});
const roboto = localFont({
  src: "../app/fonts/Roboto-Regular.ttf",
  variable: "--font-roboto",
  weight: "300",
});
const rubik = localFont({
  src: "../app/fonts/Rubik-Regular.ttf",
  variable: "--font-rubik-regular",
  weight: "300",
});
const slabo = localFont({
  src: "../app/fonts/Slabo27px-Regular.ttf",
  variable: "--font-slabo",
  weight: "300",
});

export const fonts = {
  Slabo: slabo,
  Rubik: rubik,
  Roboto: roboto,
  PlayWrite: playWrite,
  Opensans: openSans,
  Josefins: josefinsSans,
  Inter: inter,
  HindMysuru: hindMysuru,
  Exo2: exo2,
  Caveat: caveat,
};

//
export type FontKey = keyof typeof fonts;
