import React from "react";
import {
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 p-[75px]">
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-5">About Smoothie King</h2>
        <p className="text-gray-700 mb-5">
          Welcome to Smoothie King, where we serve happiness in a glass! Founded
          in 2023, our bar is committed to blending the finest and freshest
          ingredients to deliver a burst of flavor and nutrition in every sip.
          Our mission is to provide a healthy and tasty alternative that fuels
          your day and nourishes your soul.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <ul className="text-gray-700">
              <li className="mb-2 flex items-center">
                <LocationMarkerIcon className="h-6 w-6 mr-2 text-green-500" />
                123 Smoothie Street, Flavor Town, BLI 786
              </li>
              <li className="mb-2 flex items-center">
                <PhoneIcon className="h-6 w-6 mr-2 text-green-500" />
                +1 (234) 567 8901
              </li>
              <li className="mb-2 flex items-center">
                <MailIcon className="h-6 w-6 mr-2 text-green-500" />
                contact@smoothieking.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
