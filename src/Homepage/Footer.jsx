import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="h-[200px] w-full bg-DarkGray text-white flex pr-20 pl-20 justify-evenly">
        <div className="h-40 w-45 text-white m-10 text-center">
          <h1 className="text-3xl">Contact us</h1>
          <ul className="list-none m-4 text-center">
            <li>E-mail:abc@gmail.com</li>
            <li>Phone:0494217896</li>
            <li>Address:Charikot,dolakha</li>
          </ul>
        </div>

        <div className="h-40 w-40 text-white m-10 text-center">
          <h1 className="text-3xl">Quick links</h1>
          <ul className="list-none m-4">
            <li>Home</li>
            <li>job</li>
            <li>My job</li>
          </ul>
        </div>

        <div className="h-40 w-40 text-white m-10 text-center">
          <h1 className="text-3xl">Contact us</h1>
          <ul className="list-none  flex -4">
            <li className="m-4">
              <FaInstagramSquare className="h-12 w-12" />
            </li>
            <li className="m-4">
              <FaFacebookSquare className="h-12 w-12" />
            </li>

            <li className="m-4">
              <FaTwitter className="h-12 w-12" />
            </li>
          </ul>
        </div>
      </div>
      <div className="text-white h-6 w-full bg-black text-center">
        @Copyright(C):2024
      </div>
    </>
  );
}
