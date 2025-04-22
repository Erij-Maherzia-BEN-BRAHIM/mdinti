"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Sample member data (this would come from your API/database in a real app)
const allMembers = [
  {
    id: 1,
    name: "Ahmed Khelifi",
    position: "President",
    bio: "Architect with 15 years of experience in heritage preservation.",
    image: "/placeholder.svg?height=160&width=160&text=Ahmed",
    socialMedia: {
      facebook: "https://facebook.com/ahmed",
      twitter: "https://twitter.com/ahmed",
      instagram: "https://instagram.com/ahmed",
      linkedin: "https://linkedin.com/in/ahmed",
      website: "",
    },
  },
  {
    id: 2,
    name: "Leila Ben Salah",
    position: "Vice President",
    bio: "Historian specializing in Tunisian cultural heritage.",
    image: "/placeholder.svg?height=160&width=160&text=Leila",
    socialMedia: {
      facebook: "https://facebook.com/leila",
      twitter: "",
      instagram: "https://instagram.com/leila",
      linkedin: "",
      website: "https://leilabensalah.com",
    },
  },
  {
    id: 3,
    name: "Youssef Trabelsi",
    position: "Secretary",
    bio: "Urban planner focused on sustainable development in historic areas.",
    image: "/placeholder.svg?height=160&width=160&text=Youssef",
    socialMedia: {
      facebook: "",
      twitter: "https://twitter.com/youssef",
      instagram: "",
      linkedin: "https://linkedin.com/in/youssef",
      website: "",
    },
  },
  {
    id: 4,
    name: "Fatima Mansouri",
    position: "Treasurer",
    bio: "Economist with expertise in cultural tourism and local development.",
    image: "/placeholder.svg?height=160&width=160&text=Fatima",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      website: "",
    },
  },
  {
    id: 5,
    name: "Karim Bouazizi",
    position: "Project Manager",
    bio: "Civil engineer specializing in historic building restoration.",
    image: "/placeholder.svg?height=160&width=160&text=Karim",
    socialMedia: {
      facebook: "https://facebook.com/karim",
      twitter: "",
      instagram: "",
      linkedin: "https://linkedin.com/in/karim",
      website: "",
    },
  },
  {
    id: 6,
    name: "Nadia Hamdi",
    position: "Communications Director",
    bio: "Marketing specialist with a passion for cultural heritage.",
    image: "/placeholder.svg?height=160&width=160&text=Nadia",
    socialMedia: {
      facebook: "",
      twitter: "https://twitter.com/nadia",
      instagram: "https://instagram.com/nadia",
      linkedin: "",
      website: "",
    },
  },
  {
    id: 7,
    name: "Tarek Mejri",
    position: "Artisan Liaison",
    bio: "Master craftsman connecting traditional artisans with modern markets.",
    image: "/placeholder.svg?height=160&width=160&text=Tarek",
    socialMedia: {
      facebook: "https://facebook.com/tarek",
      twitter: "",
      instagram: "https://instagram.com/tarek",
      linkedin: "",
      website: "",
    },
  },
  {
    id: 8,
    name: "Samia Belhadj",
    position: "Education Coordinator",
    bio: "Former teacher developing heritage education programs for schools.",
    image: "/placeholder.svg?height=160&width=160&text=Samia",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "https://linkedin.com/in/samia",
      website: "https://samiabelhadj.com",
    },
  },
];

export function MembersCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Render social media icons
  const renderSocialIcons = (socialMedia: any) => {
    return (
      <div className="flex space-x-2 mt-2 justify-center">
        {socialMedia.facebook && (
          <a
            href={socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
          </a>
        )}
        {socialMedia.twitter && (
          <a
            href={socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {socialMedia.instagram && (
          <a
            href={socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
        {socialMedia.linkedin && (
          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {socialMedia.website && (
          <a
            href={socialMedia.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-12">
      {/* Navigation buttons */}
      {showLeftButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary text-primary hover:bg-primary/10 -ml-4 shadow-md hidden md:flex"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}

      {showRightButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary text-primary hover:bg-primary/10 -mr-4 shadow-md hidden md:flex"
          onClick={scrollRight}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden pb-6 scrollbar-hide snap-x snap-mandatory"
        onScroll={handleScroll}
      >
        {allMembers.map((member) => (
          <div
            key={member.id}
            className="flex-none w-[280px] mx-4 first:ml-0 last:mr-0 snap-start"
          >
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg border h-full transition-all hover:shadow-md">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={`${member.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {member.position}
                </p>
                <p className="text-sm line-clamp-3">{member.bio}</p>
                {renderSocialIcons(member.socialMedia)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile navigation buttons */}
      <div className="flex justify-center gap-4 mt-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={scrollLeft}
          disabled={!showLeftButton}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={scrollRight}
          disabled={!showRightButton}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
