"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <p className="font-bold">University Portal</p>
        <Button variant="link">About</Button>
        <Button variant="link">Contact</Button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={"bottom"}>
              <Link href="/generate">
                <DropdownMenuRadioItem value="top">
                  Generate Certificate
                </DropdownMenuRadioItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuRadioItem href="/dashboard" >
                  Dashboard
                </DropdownMenuRadioItem>
              </Link>

              <Link href="/verify">
                <DropdownMenuRadioItem href="/verify" value="right">
                  Verify
                </DropdownMenuRadioItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
