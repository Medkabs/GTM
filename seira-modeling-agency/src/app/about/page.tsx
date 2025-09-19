"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { logSecurityEvent } from "@/lib/security";

export default function AboutPage() {
  useEffect(() => {
    logSecurityEvent("about_page_access", { timestamp: new Date().toISOString() });
  }, []);

  return (
    <main className="min-h-screen bg-background text-white">
      <Header />

      {/* HERO */}
      <section className="pt-[12rem] pb-12 bg-gradient-to-b from-black/60 to-black/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                In An Industry Of Many Stones, There Is Only One
                <span className="block text-[#188048]">Gem Talent Management</span>
              </h1>

              <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
                GEM Talent Management is a full-service professional entertainment
                management business. G.T.M. is comprised of a Personal Manager with a
                team of Advisors. Through our creative energy, administrative efforts
                and nurturing we are the next level of management in the talent
                industry. Our specialty is in the identification of undiscovered
                talent in urban communities. In addition, we represent diversified
                cultures, which will be a positive alliance in a global economy.
              </p>
            </div>

            {/* Quick Stats Card */}
            <aside className="order-first lg:order-last bg-white/5 border border-white/6 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10">
                    <Image src="/Michael.png" alt="Founder" width={64} height={64} className="object-cover" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70">Founded</div>
                  <div className="text-xl font-semibold">2017</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">120+</div>
                  <div className="text-xs text-white/70">Managed Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-xs text-white/70">Active Talent</div>
                </div>
              </div>

              <a href="#contact" className="mt-6 inline-block w-full text-center text-white bg-gradient-to-r from-[#188048] to-[#0f5030] hover:opacity-95 text-black font-semibold py-2 rounded-md">
                Get in Touch
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* PROFILE + BIO */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-white/3 border border-white/6 rounded-2xl p-8 lg:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="w-44 h-44 rounded-xl overflow-hidden ring-4 ring-[#188048] shadow-xl">
                <Image src="/Nisani.png" alt="Team lead" width={176} height={176} className="object-cover" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl font-semibold">Gail H.</div>
                <div className="text-sm text-white/70">Founder & Managing Director</div>
              </div>
            </div>

            <div className="lg:col-span-2">

              <h2 className="text-2xl font-semibold mb-4">Our philosophy</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                G.T.M. is committed to the <strong className="uppercase">EMPOWERMENT</strong> of each individual artist by
                developing healthy relationships with talented performers and business
                organizations. Our service can afford lucrative opportunities in the
                entertainment industry for seasoned &amp; new talent. We galvanize
                positive and motivational life-changing experiences for all involved.
              </p>

              <p className="text-white/80 leading-relaxed mb-6">
                To create this, we have instituted the highest business standards,
                ethics and moral boundaries. Connecting the talented with business
                and making it a fair exchange for all parties involved is the
                <strong className="uppercase"> ULTIMATE GOAL</strong> of G.T.M.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-white/70">Representative Work</div>
                  <div className="font-semibold mt-1">Campaigns, Editorials, Film</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-sm text-white/70">Development</div>
                  <div className="font-semibold mt-1">Workshops & Coaching</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h3 className="text-2xl font-semibold mb-6">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Advertising</div>
              <p className="text-sm text-white/75">Commercial and brand advertising opportunities.</p>
            </div>
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Film</div>
              <p className="text-sm text-white/75">Casting support and on-screen representation.</p>
            </div>
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Modeling</div>
              <p className="text-sm text-white/75">Commercial and fashion modeling representation.</p>
            </div>
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Music</div>
              <p className="text-sm text-white/75">Artist development and music industry connections.</p>
            </div>
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Photography</div>
              <p className="text-sm text-white/75">Editorial and commercial photography collaborations.</p>
            </div>
            <div className="bg-white/4 rounded-lg p-6 border border-white/6">
              <div className="text-lg font-semibold mb-2">Sports & Writers</div>
              <p className="text-sm text-white/75">Sports partnerships, writers and other creative talent representation.</p>
            </div>
            <div className="col-span-full text-sm text-white/70 mt-2">And more — we work across disciplines to create opportunities for new and seasoned talent.</div>
          </div>
        </div>
      </section>

      {/* Contact anchor for modals / CTA */}
      <div id="contact" className="sr-only" />

      <Footer />
    </main>
  );
}