import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import ShowPostFeed from "../../components/news-feed/newsfeed/feedcard/show-post/ShowPostFeed";

const Index = () => {
  return (
    <PrivateRoutes>
        <ShowPostFeed />
    </PrivateRoutes>
  );
};

export default Index;
