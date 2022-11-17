import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";

const commentsFilter = [{ name: "Most Recent" }, { name: "Most Relevant" }];

const FilterComments = () => {
  const [selected, setSelected] = useState(commentsFilter[0]);

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
