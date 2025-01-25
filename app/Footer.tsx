import Logo from "@/components/Shared/Appbar/Logo";
import {
  fetchRandomBooks,
  fetchRandomCategories,
} from "@/service/dataoperation";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = async () => {
  const categories = await fetchRandomCategories();

  const popularNovels = await fetchRandomBooks();

  return (
    <div className="">
      <footer className="bg-white dark:bg-[#0e0d0d] dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            <div className="space-y-4 justify-center flex items-center flex-col">
              <div className="flex items-center space-x-2">
                <Logo />
                <h2 className="text-xl font-bold">Novel Zone</h2>
              </div>
              <p className="text-sm justify-center flex">
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
              <h2 className="text-lg font-semibold">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/filter/categories/${category.route}`}
                      className="text-sm hover:text-primary transition duration-300"
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
              <h2 className="text-lg font-semibold">Popular Novels</h2>
              <ul className="space-y-2">
                {popularNovels.map((novel, index) => (
                  <li key={index + novel.id}>
                    <a
                      href={`/book/${novel.bookUrl}`}
                      className="text-sm hover:text-primary transition duration-300"
                      aria-label={`Read ${novel.title}`}
                    >
                      {novel.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a
                  href="mailto:support@novelzone.fun"
                  className="text-sm  hover:text-primary transition duration-300"
                  aria-label="Email us"
                >
                  support@novelzone.fun
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#facebook"
                  className="text-gray-400 hover:text-primary transition duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#twitter"
                  className="text-gray-400 hover:text-primary transition duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#instagram"
                  className="text-gray-400 hover:text-primary transition duration-300"
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
