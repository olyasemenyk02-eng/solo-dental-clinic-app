import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦷</span>
              <span className="text-lg font-bold text-gray-900">
                Bright<span className="text-teal-600">Smile</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Your trusted dental care partner. Professional, gentle, and
              compassionate dental services.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/book"
                className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                href="/admin"
                className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
              >
                Staff Portal
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>📍 123 Dental Street, Suite 100</p>
              <p>📞 (555) 123-4567</p>
              <p>📧 hello@brightsmile.com</p>
              <p>🕐 Mon-Fri: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} BrightSmile Dental. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
