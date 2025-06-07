import { AboutSection } from "@/components/about-section";
import { ActivitiesSection } from "@/components/activities-section";
import { ContactForm } from "@/components/contact-form";
import { ExperiencesSection } from "@/components/experiences-section";
import { MembersCarousel } from "@/components/members-carousel";
import { MembersSectionWrapper } from "@/components/members-section-wrapper";
import { PartnersSection } from "@/components/partners-section";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/mdintilogo.svg"
                alt="mdinti logo"
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary"
            >
              Who We Are
            </Link>
            <Link
              href="#members"
              className="text-sm font-medium hover:text-primary"
            >
              Members
            </Link>
            <Link
              href="#partners"
              className="text-sm font-medium hover:text-primary"
            >
              Partners
            </Link>
            <Link
              href="#activities"
              className="text-sm font-medium hover:text-primary"
            >
              Activities
            </Link>
            <Link
              href="#team"
              className="text-sm font-medium hover:text-primary"
            >
              Team
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {/* <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div> */}
            <ContactForm
              trigger={<Button className="hidden md:flex">Contact Us</Button>}
            />
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-[url('/hero.jpg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
          <div className="relative flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 lg:py-40 px-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Preserving the Heritage of Médina Tunis
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Revitalizing the historic heart of Tunis through cultural
                preservation, economic development, and community engagement.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-[#008067] hover:bg-[#006a55]">
                Discover Our Projects
              </Button>
              <Button size="lg" variant="outline">
                Join Our Initiative
              </Button>
            </div>
          </div>
        </section>
        <AboutSection />
        <MembersSectionWrapper />
        <ExperiencesSection />
        <PartnersSection />

        {/* <ActivitiesSection /> */}
        <section id="team" className="py-16 md:py-24 bg-muted/50">
          <div className="px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                The Team Behind mdinti
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our diverse group of members brings together expertise in
                architecture, history, economics, and community development.
              </p>
            </div>
            <MembersCarousel />
          </div>
        </section>
        <section className="py-16 md:py-24 bg-[#008067] text-white">
          <div className="px-8">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Join Our Mission
                </h2>
                <p className="max-w-[600px] opacity-90 md:text-xl">
                  Be part of the movement to preserve and revitalize the
                  historic Médina of Tunis. Together, we can ensure this
                  cultural treasure thrives for generations to come.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <Button
                  size="lg"
                  className="bg-white text-[#008067] hover:bg-white/90"
                >
                  Become a Member
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="py-12 px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Image
                src="/mdintilogo.svg"
                alt="mdinti logo"
                width={150}
                height={75}
                className="h-auto w-auto"
              />
              <p className="text-sm text-muted-foreground">
                Preserving the heritage and revitalizing the historic Médina of
                Tunis through collaborative efforts.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    href="#team"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#partners"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="#activities"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    News & Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-[#008067]" />
                  <span className="text-muted-foreground">
                    Médina of Tunis, Tunisia
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-[#008067]" />
                  <span className="text-muted-foreground">
                    contact@mdinti.org
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-[#008067]" />
                  <span className="text-muted-foreground">+216 xx xxx xxx</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Follow Us</h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} mdinti. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
