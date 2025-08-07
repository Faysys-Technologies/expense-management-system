'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Sidebar({ 
  navigation, 
  sidebarOpen, 
  setSidebarOpen, 
  showLogout = true,
  showProfileDropdown = false,
  onLogout,
  customFooter,
  onNavClick
}) {
  const { user } = useAuth();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`flex flex-col h-full ${isMobile ? 'w-64' : 'w-full'} bg-white ${isMobile ? 'shadow-xl' : 'border-r border-gray-200 shadow-sm'}`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Image
            src="/faysys-logo.png"
            alt="Faysys Technologies"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <div>
            <span className="text-lg font-medium text-gray-900">Faysys</span>
            <span className="body-text-sm ml-1">Technologies</span>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          onNavClick ? (
            <button
              key={item.id}
              onClick={() => {
                onNavClick(item.id);
                isMobile && setSidebarOpen(false);
              }}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 w-full text-left ${
                item.current
                  ? 'nav-link-active'
                  : 'nav-link'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.current
                  ? 'nav-link-active'
                  : 'nav-link'
              }`}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        {customFooter ? (
          customFooter
        ) : showLogout ? (
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex flex-col">
          <SidebarContent isMobile={true} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
}
