import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";

const FilterComments = (props) => {
  return (
    <Fragment>
      <div className="flex items-center justify-end mt-4">
        <div className="font-light text-sm text-slate-600">
          <Link href="/Show-Post">
            <a>
            All Comments
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterComments;
