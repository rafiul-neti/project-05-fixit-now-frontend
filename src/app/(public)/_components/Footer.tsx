import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Cleaning", href: "/services" },
  { label: "Plumbing", href: "/services" },
  { label: "Electrical", href: "/services" },
  { label: "Appliance Repair", href: "/services" },
  { label: "Home Maintenance", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="fixit-container">
        {/* Main Footer */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/fixit_now_logo.webp"
                width={42}
                height={42}
                alt="FixItNow"
              />

              <span className="text-xl font-bold text-white">
                Fixit<span className="text-(--color-primary)">Now</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Reliable home services from trusted professionals, right at your
              doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>

            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Get in Touch</h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--color-primary)" />

                <span className="text-sm leading-5 text-slate-400">
                  Rajshahi, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-(--color-primary)" />

                <a
                  href="tel:+8801000000000"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-(--color-primary)" />

                <a
                  href="mailto:info@fixitnow.com"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  info@fixitnow.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
