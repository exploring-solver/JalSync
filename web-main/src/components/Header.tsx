"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

// Define navigation items
const navItems = [
  { name: 'Asset Management', href: '/assetmgmt' },
  { name: 'Consumer Management', href: '/consumermgmt' },
  { name: 'GIS', href: '/gis' },
  { name: 'Finance', href: '/finance2' },
  { name: 'Billing', href: '/billing' },
  { name: 'Inventory', href: '/inv2' },
  { name: 'Consumables', href: '/consumables' },
  { name: 'Panchayats', href: '/panchayats' },
  { name: 'About Us', href: '/about-us' },
];

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Retrieve user profile info from API if an access token exists
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.name); // Assuming `name` is the field in the user profile response
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-blue-800 shadow-md' : 'bg-transparent text-black'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl transition-colors duration-300">
          JalSync
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
          {!user ? (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-900 transition-colors duration-300">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-900 transition-colors duration-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-900 transition-colors duration-300">
                {user}
              </Link>
              <Button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-900">
                Logout
              </Button>
            </>
          )}
        </div>
        <Button
          onClick={toggleSidebar}
          variant="default"
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
              <Button onClick={closeSidebar} variant="default" size="icon">
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
