import React from "react";
import { useRouter } from "next/router";

const title = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>single page {slug}</div>;
};

export default title;
