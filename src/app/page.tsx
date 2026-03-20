import Link from "next/link";
import { services, doctors } from "@/lib/data";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 text-xs font-medium text-teal-700 mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Accepting New Patients
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Your Smile Deserves{" "}
              <span className="text-teal-600">Expert Care</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Book your dental appointment in under a minute. Professional,
              gentle, and compassionate care for the whole family.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="bg-teal-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-teal-700 transition-colors text-center shadow-lg shadow-teal-200"
              >
                Book Appointment →
              </Link>
              <a
                href="tel:+15551234567"
                className="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-base font-semibold hover:border-teal-300 transition-colors text-center"
              >
                📞 Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Why Choose BrightSmile?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Quick Booking",
                desc: "Book in under 60 seconds. Choose your service, doctor, and time.",
              },
              {
                icon: "🏥",
                title: "Expert Team",
                desc: "Experienced dentists with years of specialized training.",
              },
              {
                icon: "💝",
                title: "Gentle Care",
                desc: "Patient comfort is our priority. Anxiety-free dental visits.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
            <Link
              href="/book"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.id}
                href="/book"
                className="bg-white rounded-xl p-4 border border-gray-100 hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl block mb-2">{service.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  From ${service.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Meet Our Doctors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl mx-auto mb-4">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-teal-600 font-medium">
                  {doctor.specialty}
                </p>
                <p className="text-xs text-gray-500 mt-2">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready for a Healthier Smile?
          </h2>
          <p className="text-teal-100 mb-8 max-w-md mx-auto">
            Book your appointment today and take the first step toward better
            dental health.
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-teal-700 px-8 py-3 rounded-xl text-base font-semibold hover:bg-teal-50 transition-colors shadow-lg"
          >
            Book Now — It&apos;s Quick & Easy
          </Link>
        </div>
      </section>
    </div>
  );
}
