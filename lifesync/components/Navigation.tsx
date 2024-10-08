"use client";
import { House, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const navItems = [
  {
    name: "Dashboard",
    icon: <House className="h-4 w-4" />,
    link: "/",
  },
  {
    name: "Library",
    icon: <House className="h-4 w-4" />,
    link: "/lifesync/library",
  },
  {
    name: "Trakt",
    icon: <House className="h-4 w-4" />,
    link: "/lifesync/trakt",
  },
  {
    name: "Calendar",
    icon: <House className="h-4 w-4" />,
    link: "/lifesync/calendar",
  },
];
export default function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();


  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
  }, [pathname, searchParams]);

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === item.link ? "bg-muted" : null}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

        {/* <Link
         href="/test"
         className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
       >
         <ShoppingCart className="h-4 w-4" />
         Orders
         <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
           6
         </Badge>
       </Link> */}
      </nav>
    </div>
  );
}
