import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
import { Chip } from "@heroui/react";

const CategoryGrid = ({
  category,
}: {
  category: { name: string; route: string }[];
}) => {
  const categorylist: ReactElement[] = [];
  for (let i = -1; i < category.length; i++) {
    if (i == -1) {
      categorylist.push(
        <Grid key={i} sx={{ width: "fit-content" }}>
          <Chip
            variant="bordered"
            color="primary"
            className="mx-[2px] my-1"
            radius="sm"
          >
            <h2 className="w-fit text-lg font-medium bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
              Categories:&nbsp;
            </h2>
          </Chip>
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
          <ProgressBarLink
            href={`/filter/categories/${category[i].route.toLowerCase()}`}
            prefetch={false}
          >
            <Chip
              variant="solid"
              radius="sm"
              color="primary"
              className="text-white hover:scale-95 mx-[3px] my-1"
            >
              <h4>
                {`${category[i].name}`}
                &nbsp;
              </h4>
            </Chip>
          </ProgressBarLink>
        </Grid>
      );
    }
  }
  return (
    <Grid container className="mt-10 mx-1 w-[90vw]">
      {categorylist}
    </Grid>
  );
};

export default CategoryGrid;
