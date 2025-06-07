import Image from "next/image";
import { Button } from "./ui/button";

export function AboutSection(){

    return (
        <section id="about" className="py-16 md:py-24">
        <div className="px-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-[#ffc845]/20 px-3 py-1 text-sm text-[#ffc845]">
                Who We Are
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Guardians of Tunis Médina
              </h2>
              <p className="text-muted-foreground">
                mdinti is an Economic Interest Grouping dedicated to the
                preservation and revitalization of the historic Médina of
                Tunis. Founded by passionate locals and experts, we work to
                protect the cultural heritage while promoting sustainable
                economic growth.
              </p>
              <p className="text-muted-foreground">
                Our mission is to balance preservation with progress, ensuring
                that the ancient heart of Tunis continues to beat strongly for
                generations to come.
              </p>
              <Button className="bg-[#008067] hover:bg-[#006a55]">
                Learn More About Us
              </Button>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/hero2.jpg"
                alt="Médina of Tunis"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section> 
    )
}