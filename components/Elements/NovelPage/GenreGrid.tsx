import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const GenreGrid = ({
  genres,
}: {
  genres: { name: string; route: string }[];
}) => {
  const genresList: ReactElement[] = [];
  for (let i = -1; i < genres.length; i++) {
    if (i == -1) {
      genresList.push(
        <Grid key={i}>
          <h2 className="w-fit">Genre:&nbsp;</h2>
        </Grid>
      );
    } else {
      genresList.push(
        <Grid
          size="auto"
          key={genres[i].route}
          sx={{ width: "fit-content" }}
          className="hover:text-primary dark:hover:text-primary"
        >
          <h3>
            <Link
              href={`/filter/genre/${genres[i].route.toLowerCase()}`}
              prefetch={false}
            >
              {`${genres[i].name}${i < genres.length - 1 ? "," : ""}`}&nbsp;
            </Link>
          </h3>
        </Grid>
      );
    }
  }
  return <Grid container>{genresList}</Grid>;
};

export default GenreGrid;
