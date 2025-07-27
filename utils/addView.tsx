"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AddView = () => {
  const pathname = usePathname();
  useEffect(() => {
    const handler = setTimeout(() => {
      axios.post(
        "/api/page/addView",
        JSON.stringify({
          pathname,
        })
      );
    }, 5000);
    return () => {
      clearTimeout(handler);
    };
  }, []);
  return null;
};

export default AddView;
