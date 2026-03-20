"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦷</span>
            <span className="text-lg font-bold text-gray-900">
              Bright<span className="text-teal-600">Smile</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/book"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Staff Portal
            </Link>
            <Link
              href="/book"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/book"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </Link>
              <Link
                href="/admin"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Staff Portal
              </Link>
              <Link
                href="/book"
                className="mx-3 mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-teal-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
