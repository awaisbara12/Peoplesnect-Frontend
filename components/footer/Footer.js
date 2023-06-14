import React, { Fragment } from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <Fragment className="mt-8">
      <footer className="bg-white py-2 rounded-xl">
        <ul className="flex flex-wrap justify-center gap-5 text-xs">
          <li className="">
            <Link href="/Contact-us">
              <a className="hover:text-indigo-400 hover:underline text-gray-900">Contact Us</a>
            </Link>
          </li>
          <li className="">
            <Link href="/About-us">
              <a className="hover:text-indigo-400 hover:underline text-gray-900">About</a>
            </Link>
          </li>
          <li className="">
            <Link href="/news-feed">
              <a className="hover:text-indigo-400 hover:underline text-gray-900">Privacy Policy</a>
            </Link>
          </li>
          <li className="">
            <Link href="/news-feed">
              <a className="hover:text-indigo-400 hover:underline text-gray-900">Terms & Conditions</a>
            </Link>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
