"use client";
import React from "react";
import { motion } from "framer-motion";
import { ColorDismiss } from "../icons";
import Link from "next/link";

const COSMIC_CHRONICLES = "https://space.etdev.fun/";

const messages = [
  {
    title: "Discover latest Astrophotography updates",
    text: "Capturing images of celestial objects and phenomena using various photographic techniques",
    link: `${COSMIC_CHRONICLES}categories/astrophotography`,
  },
  {
    title: "Discover latest Astronomy updates",
    text: "The latest discoveries and research in the field of astronomy",
    link: `${COSMIC_CHRONICLES}categories/astronomy`,
  },
  {
    title: "Discover latest Cosmology updates",
    text: "Studies and theories about the origin, evolution, and structure of the universe",
    link: `${COSMIC_CHRONICLES}categories/cosmology`,
  },
  {
    title: "Discover latest Exoplanets updates",
    text: "Discoveries and research on planets beyond our solar system",
    link: `${COSMIC_CHRONICLES}categories/exoplanets`,
  },
  {
    title: "Discover latest Satellites updates",
    text: "News and information about satellites, their applications, and technologies",
    link: `${COSMIC_CHRONICLES}categories/satellites`,
  },
  {
    title: "Discover latest Space Exploration updates",
    text: "Updates on missions, spacecraft, and exploration of our solar system and beyond",
    link: `${COSMIC_CHRONICLES}categories/space-exploration`,
  },
  {
    title: "Discover latest Space History updates",
    text: "Historical events, missions, and achievements in space exploration",
    link: `${COSMIC_CHRONICLES}categories/space-history`,
  },
  {
    title: "Discover latest Space Technology updates",
    text: "Advancements in engineering and technology for space travel and exploration",
    link: `${COSMIC_CHRONICLES}categories/space-technology`,
  },
  {
    title: "Discover latest updates in space sector",
    text: "News and Advancements in space sector",
    link: `${COSMIC_CHRONICLES}latest`,
  },
  {
    title: "Explore Cosmic Chronicles",
    text: "Discover real astronomy behind your favorite novels!",
    link: COSMIC_CHRONICLES,
  },
];

const RE_SHOW_DELAY = 2 * 60 * 1000;

const CosmicChroniclesCard = () => {
  const [visible, setVisible] = React.useState(true);
  const [index, setIndex] = React.useState(
    Math.floor(Math.random() * messages.length)
  );

  React.useEffect(() => {
    const dismissedAt = localStorage.getItem("cosmic_card_dismissed_at");
    if (dismissedAt) {
      const timeElapsed = Date.now() - parseInt(dismissedAt, 10);
      if (timeElapsed > RE_SHOW_DELAY) {
        localStorage.removeItem("cosmic_card_dismissed_at");
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let tp = Math.floor(Math.random() * messages.length);
      while (tp === index) {
        tp = Math.floor(Math.random() * messages.length);
      }
      setIndex(tp);
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto re-show timer
  React.useEffect(() => {
    if (!visible) {
      const timer = setInterval(() => {
        const dismissedAt = localStorage.getItem("cosmic_card_dismissed_at");
        if (dismissedAt) {
          const timeElapsed = Date.now() - parseInt(dismissedAt, 10);
          if (timeElapsed > RE_SHOW_DELAY) {
            localStorage.removeItem("cosmic_card_dismissed_at");
            setVisible(true);
          }
        }
      }, 10000); // Check every 10 seconds
      return () => clearInterval(timer);
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("cosmic_card_dismissed_at", Date.now().toString());
    let tp = Math.floor(Math.random() * messages.length);
    while (tp === index) {
      tp = Math.floor(Math.random() * messages.length);
    }
    setIndex(tp);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: visible ? "block" : "none" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed bottom-4 left-4 z-50 hidden md:block w-72 p-4 border rounded-2xl shadow-2xl 
                 bg-white border-gray-200 text-gray-800
                 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 `}
    >
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute top-[6px] -right-[6px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <ColorDismiss width={14} height={14} />
        </button>

        <div className="flex items-center mb-2">
          <h4 className="mr-[2px]">{`🚀`}</h4>
          <h4 className="font-semibold text-sm">{messages[index].title}</h4>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {messages[index].text}
        </p>

        <Link
          href={messages[index].link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:animate-pulse flex justify-end"
        >
          Learn more →
        </Link>
      </div>
    </motion.div>
  );
};

export default CosmicChroniclesCard;
