import {
  fetchRandomBooks,
  fetchRandomCategories,
  fetchRandomGenres,
} from "@/service/dataoperation";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const aboutUs = (
  <Button
    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition duration-300"
    aria-label="Learn more about Novel Reader"
  >
    About Us
  </Button>
);

const Footer = async () => {
  const c = fetchRandomCategories();

  const p = fetchRandomBooks();
  const g = fetchRandomGenres();
  const [categories, popularNovels, genres] = await Promise.all([c, p, g]);

  return (
    <div className="">
      <footer className="bg-white dark:bg-[#0e0d0d] dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mx-3">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Genres</h2>
              <ul className="space-y-2">
                {genres.map((genre) => (
                  <li key={genre.name}>
                    <Link
                      href={`/filter/genre/${genre.route}`}
                      className="text-sm hover:text-primary transition duration-300"
                      aria-label={`Browse ${genre.name}`}
                      prefetch={false}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
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
                      prefetch={false}
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
                    <Link
                      href={`/book/${novel.bookUrl}`}
                      className="text-sm hover:text-primary transition duration-300"
                      aria-label={`Read ${novel.title}`}
                      prefetch={false}
                    >
                      {novel.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <Link
                  href="mailto:support@novelzone.fun"
                  className="text-sm  hover:text-primary transition duration-300"
                  aria-label="Email us"
                  prefetch={false}
                >
                  support@novelzone.fun
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="#facebook"
                  className="text-gray-400 hover:text-primary transition duration-300"
                  aria-label="Follow us on Facebook"
                  prefetch={false}
                >
                  <FaFacebook size={24} />
                </Link>
                <Link
                  href="#twitter"
                  className="text-gray-400 hover:text-primary transition duration-300"
                  aria-label="Follow us on Twitter"
                  prefetch={false}
                >
                  <FaTwitter size={24} />
                </Link>
                <Link
                  href="#instagram"
                  className="text-gray-400 hover:text-primary transition duration-300"
                  aria-label="Follow us on Instagram"
                  prefetch={false}
                >
                  <FaInstagram size={24} />
                </Link>
              </div>
              {aboutUs}
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

export const revalidate = 3600 * 12;
