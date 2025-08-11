"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaHamburger, FaSearch, FaShoppingBag } from "react-icons/fa";
import Nav from "../Nav";
import { Button } from "../ui/button";
import UserAuthSection from "./UserAuthSection";
import { useCartStore } from "@/store/useCartSTore";

// 👇 Type des props reçues depuis le serveur
type HeaderClientProps = {
  user: { id: string } | null;
};

const HeaderClient = ({ user }: HeaderClientProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  const cartCount = useCartStore((state) => state.totalItems());

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-white/50 lg:bg-transparent">
      <div className="flex items-center justify-between px-4 py-4 lg:px-14">
        <div className="flex items-center space-x-10">
          <Link href="/" aria-label="Go to home page">
            <Image
              src="/assets/logo.webp"
              alt="Brancy Logo"
              width={70}
              height={70}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex">
            <Nav
              containerStyles="flex space-x-10"
              linkStyles="hover:text-orange-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6 text-gray-800">
          <FaSearch size={20} className="cursor-pointer" />
          <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-700 relative cursor-pointer"
              >
                <FaShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-brand-700 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>
            <UserAuthSection />
          <div className="lg:hidden">
            <FaHamburger
              size={22}
              className="cursor-pointer"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white px-6 py-4 shadow-md animate-slide-down">
          <Nav
            containerStyles="flex flex-col space-y-4"
            linkStyles="text-lg"
            onLinkClick={closeMobileNav}
          />
        </div>
      )}
    </header>
  );
};

export default HeaderClient;
