"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UsersRound,
  Building2,
  Activity,
  LogOut,
  Menu,
  X,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Members",
    icon: UsersRound,
    href: "/admin/members",
    color: "text-violet-500",
  },
  {
    label: "Team Members",
    icon: UserPlus,
    href: "/admin/team",
    color: "text-pink-700",
  },
  {
    label: "Experiences",
    icon: BookOpen,
    href: "/admin/experiences",
    color: "text-orange-700",
  },
  {
    label: "Partners",
    icon: Building2,
    href: "/admin/partners",
    color: "text-pink-700",
  },
  {
    label: "Activities",
    icon: Activity,
    href: "/admin/activities",
    color: "text-orange-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 z-40 flex h-full w-72 flex-col bg-background border-r transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 py-4">
          <div className="px-6 py-2 flex items-center border-b pb-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/mdintilogo.svg"
                alt="mdinti logo"
                width={100}
                height={50}
                className="h-auto w-auto"
              />
            </Link>
          </div>
          <div className="flex flex-col space-y-1 px-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === route.href
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className={cn("h-4 w-4", route.color)} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto px-3 py-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
