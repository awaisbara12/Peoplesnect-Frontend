import React, { Fragment, useEffect, useState } from "react";
import NewsFeedSingle from './NewsFeedSingle'
// import Spinner from "../../../common/Spinner";

const NewsFeedUserCard = (list) => {

  return (
    <div>
      {list &&
        list.list.map((items) => (
          <NewsFeedSingle items={items} key={items.id} />
        ))}
    </div>
  );
};

export default NewsFeedUserCard;
