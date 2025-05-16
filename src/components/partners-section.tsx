"use client";

import Image from "next/image";
import { usePartners } from "@/hooks/usePartners";

export function PartnersSection() {
  const { partners, isLoadingPartners } = usePartners();

  if (isLoadingPartners) {
    return (
      <section id="partners" className="py-16 md:py-24">
        <div className="px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
              Our Partners
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Working Together for Médina
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Loading our partners...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="py-16 md:py-24">
      <div className="px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
            Our Partners
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Working Together for Médina
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            We collaborate with local and international organizations to achieve our goals.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {partners?.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-background rounded-lg border"
            >
              <Image
                src={partner.logo ?? `/placeholder.svg?height=80&width=160&text=${encodeURIComponent(partner.name)}`}
                alt={partner.name}
                width={160}
                height={80}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 