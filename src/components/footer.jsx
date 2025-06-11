import React from "react";

export default function Footer() {
  return (
    <footer className=" text-gray-400 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Title */}
        <h2 className="text-gray-400 text-2xl font-bold tracking-tight">
          💘 Love2Link
        </h2>

        {/* Copyright and Credit */}
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} LoveLink. All rights reserved. <br className="sm:hidden" />
          Built with 💖 by{" "}
          <a
            href="https://davidolarinde.vercel.app/"
            className="text-pink-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Olarinde
          </a>
        </p>
      </div>
    </footer>
  );
}
