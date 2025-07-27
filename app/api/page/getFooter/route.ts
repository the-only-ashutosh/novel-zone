import {
  fetchRandomCategories,
  fetchRandomBooks,
  fetchRandomGenres,
} from "@/service/dataoperation";
import { NextResponse } from "next/server";

export async function GET() {
  const c = fetchRandomCategories();
  const p = fetchRandomBooks();
  const g = fetchRandomGenres();
  const [categories, popularNovels, genres] = await Promise.all([c, p, g]);
  return NextResponse.json({
    randomCategories: categories,
    randomGenres: genres,
    randomBooks: popularNovels,
  });
}
