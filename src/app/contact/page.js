'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  Globe, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/faysys-logo.png"
                alt="Faysys Technologies"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <span className="text-xl font-bold text-[#1a6ab3]">Faysys</span>
                <span className="text-sm text-gray-500 ml-1">Technologies</span>
              </div>
            </div>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-[#1a6ab3] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/faysys-logo.png"
                alt="Faysys Technologies"
                width={60}
                height={60}
                className="h-15 w-auto"
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Get in touch for full application access and support
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h2>
              
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:border-[#1a6ab3] transition-colors">
                <div className="w-10 h-10 bg-[#1a6ab3] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href="mailto:info@faysys.in" 
                    className="text-[#1a6ab3] hover:text-[#155a8f] transition-colors font-medium"
                  >
                    info@faysys.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:border-[#30adb2] transition-colors">
                <div className="w-10 h-10 bg-[#30adb2] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href="tel:+919042142868" 
                    className="text-[#30adb2] hover:text-[#258a8e] transition-colors font-medium"
                  >
                    +91 90421 42868
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:border-[#99e799] transition-colors">
                <div className="w-10 h-10 bg-[#99e799] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a 
                    href="https://faysys.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#99e799] hover:text-[#7ac47a] transition-colors font-medium"
                  >
                    faysys.in
                  </a>
                </div>
              </div>
            </div>

            {/* Demo Access */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Try the Demo
              </h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Experience our expense management system with full functionality. 
                Get hands-on with all features and see how it can streamline your business operations.
              </p>
              <Link 
                href="/demo" 
                className="inline-flex items-center space-x-2 bg-[#1a6ab3] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#155a8f] transition-colors w-full justify-center"
              >
                <span>Access Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              © 2024 Faysys Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
