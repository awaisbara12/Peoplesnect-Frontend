import React, { Fragment } from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-white rounded-xl mt-4 p-4">
        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <li>
            <Link href="/news-feed">
              <a className="text-gray-900 text-sm">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/news-feed">
              <a className="text-gray-900 text-sm">Privacy Policy</a>
            </Link>
          </li>

          <li>
            <Link href="/Contact-us">
              <a className="text-gray-900 text-sm">Contact Us</a>
            </Link>
          </li>
          <li>
            <Link href="/news-feed">
              <a className="text-gray-900 text-sm">Terms & Conditions</a>
            </Link>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
