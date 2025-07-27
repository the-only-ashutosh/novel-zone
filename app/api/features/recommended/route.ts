// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { GoogleAuth } from "google-auth-library";
// import { GenerativeModel } from "@google-cloud/vertexai";
// import path from "path";
// import { fetchViewedBooksData } from "@/service/dataoperation";
// const auth = new GoogleAuth({
//   keyFile: path.join(process.cwd(), "gcp-key.json"), // path to your service account key
//   scopes: "https://www.googleapis.com/auth/cloud-platform",
// });

import { NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const cookieStore = await cookies();
//   const viewed = cookieStore.get("viewedBooks");
//   const viewedIds: number[] = viewed ? JSON.parse(viewed.value) : [];
//   const prompt = await fetchViewedBooksData(viewedIds);
//   const vertexAI = new GenerativeModel({
//     model: "gemini-pro",
//     project: "your-gcp-project-id",
//     location: "us-central1",
//     googleAuth: auth,
//   });
// }

export async function GET() {
  return NextResponse.json({});
}
