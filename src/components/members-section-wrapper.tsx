"use client";

import { useMembers } from "@/hooks/useMembers";
import { MembersSection } from "@/components/members-section";

export function MembersSectionWrapper() {
  const { members, loading } = useMembers();

  if (loading) {
    return (
      <div className="py-16 md:py-24">
        <div className="px-8 text-center">
          <p className="text-muted-foreground">Loading members...</p>
        </div>
      </div>
    );
  }

  return <MembersSection members={members} />;
} 