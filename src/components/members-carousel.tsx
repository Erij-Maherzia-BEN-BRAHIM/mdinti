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
import { useMembers } from "@/hooks/useMembers";

export function MembersCarousel() {
  const { members, isLoadingMembers } = useMembers();
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

  if (isLoadingMembers) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading members...</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">No members found</p>
      </div>
    );
  }

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
        {members.map((member) => (
          <div
            key={member.id}
            className="flex-none w-[280px] mx-4 first:ml-0 last:mr-0 snap-start"
          >
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg border h-full transition-all hover:shadow-md">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {member.position}
                </p>
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
