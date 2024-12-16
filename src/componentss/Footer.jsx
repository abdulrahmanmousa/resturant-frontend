import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-200 grid  ">
        <div
          style={{ padding: "20px" }}
          className=" bg-gray-200 grid grid-cols-2  "
        >
          <div className="p-4 grid-rows-2">
            <div>
              <div className="  space-y-4">
                <h1 className=" ">stay connected</h1>
                <div className="flex w-full max-w-sm items-center   space-x-2">
                  <Input
                    className="bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  <Button type="submit">Subscribe</Button>
                </div>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com">
                    <img
                      src="https://img.icons8.com/ios/50/000000/facebook--v1.png"
                      alt="facebook"
                    />
                  </a>
                  <a href="https://www.instagram.com">
                    <img
                      src="https://img.icons8.com/ios/50/000000/instagram-new--v1.png"
                      alt="instagram"
                    />
                  </a>
                  <a href="https://www.twitter.com">
                    <img
                      src="https://img.icons8.com/ios/50/000000/twitter--v1.png"
                      alt="twitter"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="bg-gray-200 p-4">
              <h1 className="text-lg font-bold">About Us</h1>
              <p className="text-sm">
                We are a team of developers who are passionate about food and
                technology
              </p>
            </div>
            <div className="bg-gray-200 p-4">
              <h1 className="text-lg font-bold">Contact Us</h1>
              <p className="text-sm">Email:foodie@gmail.com</p>
              <p className="text-sm">Phone:123-456-789</p>
            </div>
            <div className="bg-gray-200 p-4">
              <h1 className="text-lg font-bold">Follow Us</h1>
              <a href="https://www.facebook.com" className="text-sm">
                Facebook
              </a>
              <br />
              <a href="https://www.instagram.com" className="text-sm">
                Instagram
              </a>
              <br />
              <a href="https://www.twitter.com" className="text-sm">
                Twitter
              </a>
            </div>
            <div className="bg-gray-200 p-4">
              <h1 className="text-lg font-bold">Address</h1>
              <p className="text-sm">12, galaa Street, mansoura City</p>
              <p className="text-sm">PQR State, STU mansoura</p>
            </div>
          </div>
        </div>
        <hr className=" m-10 my-4 border-gray-300" />
        <div className="p-4 text-center">
          <h1>table booker</h1>
        </div>

        <div className="p-4 text-center">
          <p className="text-sm">
            &copy; 2021 Foodie. All Rights Reserved. Designed by Foodie Team
          </p>
        </div>
      </div>
    </>
  );
}
