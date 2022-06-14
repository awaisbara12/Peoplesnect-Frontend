import React, { Fragment } from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-white py-2 h-7">
        <ul className="flex items-center justify-center gap-6">
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
