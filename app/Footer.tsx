import Logo from "@/components/Shared/Appbar/Logo";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const categories = [
    { name: "Korean Novels", link: "#korean" },
    { name: "Chinese Novels", link: "#chinese" },
    { name: "Japanese Novels", link: "#japanese" },
    { name: "English Novels", link: "#english" },
  ];

  const popularNovels = [
    { name: "Supremacy Games", link: "/book/supremacy-games" },
    { name: "Walker Of the Worlds", link: "/book/walker-of-the-worlds" },
    { name: "Martial Peak", link: "/book/martial-peak" },
    { name: "Solo Leveling", link: "/book/solo-leveling" },
  ];

  return (
    <div className="">
      <footer className="bg-white text-slate-500 dark:bg-[#0e0d0d] dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Logo />
                <h2 className="text-xl font-bold">Novel Zone</h2>
              </div>
              <p className="text-sm">
                Your gateway to endless stories across cultures. Discover
                captivating novels from around the world, all in one place.
              </p>
              <Button
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition duration-300"
                aria-label="Learn more about Novel Reader"
              >
                About Us
              </Button>
            </div>

            {/* Categories Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.link}
                      className="text-sm hover:text-white transition duration-300"
                      aria-label={`Browse ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Novels Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Popular Novels
              </h2>
              <ul className="space-y-2">
                {popularNovels.map((novel, index) => (
                  <li key={index}>
                    <a
                      href={novel.link}
                      className="text-sm hover:text-white transition duration-300"
                      aria-label={`Read ${novel.name}`}
                    >
                      {novel.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Contact Us</h2>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a
                  href="mailto:support@novelzone.com"
                  className="text-sm hover:text-white transition duration-300"
                  aria-label="Email us"
                >
                  support@novelzone.com
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#facebook"
                  className="text-gray-400 hover:text-white transition duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#twitter"
                  className="text-gray-400 hover:text-white transition duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#instagram"
                  className="text-gray-400 hover:text-white transition duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Novel Zone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
