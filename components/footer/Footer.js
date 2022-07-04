import React, { Fragment } from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-white h-10 py-2">
        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <li>
            <Link href="/">
              <a className="text-gray-900">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="text-gray-900">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="text-gray-900">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="text-gray-900">Terms & Conditions</a>
            </Link>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
