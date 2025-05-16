"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Member, MemberCategory } from "@/models/Member";
import Image from "next/image";
import { useState } from "react";

const categories: MemberCategory[] = [
  "Hostels",
  "Guest Houses",
  "Hotel",
  "Librairy",
  "Restaurant",
  "Artisans",
  "others",
];

interface MembersSectionProps {
  members: Member[];
}

export function MembersSection({ members }: MembersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MemberCategory | "all">("all");

  const filteredMembers = selectedCategory === "all"
    ? members
    : members.filter((member) => member.category === selectedCategory);

  return (
    <section id="members" className="py-16 md:py-24">
      <div className="px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
            Our Members
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Supporting Organizations
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover the diverse range of organizations that contribute to the
            preservation and development of Médina Tunis.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as MemberCategory | "all")}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col items-center p-6 bg-background rounded-lg border hover:shadow-md transition-all"
            >
              <div className="relative h-32 w-32 mb-4">
                <Image
                  src={member.logo || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
} 