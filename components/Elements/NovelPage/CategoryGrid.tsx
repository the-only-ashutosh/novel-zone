import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const CategoryGrid = ({
  category,
}: {
  category: { name: string; route: string }[];
}) => {
  const categorylist: ReactElement[] = [];
  for (let i = -1; i < category.length; i++) {
    if (i == -1) {
      categorylist.push(
        <Grid key={i}>
          <h2 className="w-fit">Categories:&nbsp;</h2>
        </Grid>
      );
    } else {
      categorylist.push(
        <Grid
          size="auto"
          key={category[i].route}
          sx={{ width: "fit-content" }}
          className="hover:text-primary dark:hover:text-primary"
        >
          <Link href={`/filter/categories/${category[i].route}`}>
            <h4>
              {`${category[i].name}${i < category.length - 1 ? "," : ""}`}&nbsp;
            </h4>
          </Link>
        </Grid>
      );
    }
  }
  return <Grid container>{categorylist}</Grid>;
};

export default CategoryGrid;
