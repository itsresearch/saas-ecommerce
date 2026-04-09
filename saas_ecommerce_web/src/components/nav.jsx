import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = useMemo(
    () => [
      { label: "Home", href: "#" },
      { label: "Products", href: "#products" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            SE
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              SaaS E-commerce
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <input
              aria-label="Search products"
              placeholder="Search…"
              className="w-64 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Log in
          </Link>
          <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Start free trial
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              <input
                aria-label="Search products"
                placeholder="Search…"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
              />

              <div className="grid grid-cols-2 gap-2 pt-1">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={() => setMobileOpen(false)}>
                  Start free trial
                </Link>
              </div>

              <a
                href="#cart"
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Cart
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}