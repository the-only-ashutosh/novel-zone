import { fetchAllCategories } from "@/service/dataoperation";
import React from "react";
import Grid from "@mui/material/Grid";
import GradBanner from "@/components/Shared/GradBanner";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";
export const dynamic = "force-dynamic";

const CategoriesPage = async () => {
  const categories = await fetchAllCategories();
  return (
    <GradBanner main="All Categories" sub="List of categories">
      <Grid container className="flex justify-center items-center" gap={0.5}>
        {categories.map((category) => (
          <Grid
            key={category.name}
            size={{ xs: 12, sm: 5.7, md: 3.8, lg: 2.9 }}
            className="flex items-center justify-center"
          >
            <ProgressBarLink
              href={`/filter/categories/${category.route}`}
              className="hover:dark:text-primary hover:text-primary dark:text-white w-full"
              prefetch={false}
            >
              {category.name}
            </ProgressBarLink>
          </Grid>
        ))}
      </Grid>
    </GradBanner>
  );
};

export default CategoriesPage;
