"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

// Define navigation items with their corresponding URLs
const navItems = [
  { name: 'Asset Management', href: '/assetmgmt' },
  { name: 'Consumer Management', href: '/consumermgmt' },
  { name: 'GIS', href: '/gis' },
  { name: 'Finance', href: '/finance2' },
  { name: 'Inventory', href: '/inv2' },
  { name: 'About Us', href: '/about-us' },
];

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const NavLink: React.FC<{ item: { name: string; href: string }; onClick?: () => void }> = ({ item, onClick }) => (
    <Link
      href={item.href}
      className="px-4 py-2 rounded-lg text-md font-medium hover:bg-blue-700 hover:text-white transition-colors duration-300"
      onClick={onClick}
    >
      {item.name}
    </Link>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white text-blue-800 shadow-md' : 'bg-transparent text-black'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl transition-colors duration-300">
          JalSync
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeSidebar}>
          <div
            className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <Button onClick={closeSidebar} variant="ghost" size="icon">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} onClick={closeSidebar} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;