'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Receipt, 
  Users, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  BarChart3, 
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();




  useEffect(() => {
    if (!loading && user) {
      // Role-based redirection
      if (user.role === 'admin') {
        router.push('/admin/expenses');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a6ab3] border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  const renderLanding = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
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
              <div className="flex items-center space-x-4">
                <Link href="/demo" className="nav-link">
                  View Demo
                </Link>
                <Link href="/contact" className="nav-link">
                  Sign In
                </Link>
                <Link href="/contact" className="btn-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 bg-gradient-to-br from-[#1a6ab3]/5 to-[#99e799]/5 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
                Simplify Your
                <span className="block text-[#1a6ab3] font-medium">Expense Management</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Modern expense tracking with seamless approval workflows and real-time insights for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/demo" className="btn-primary flex items-center space-x-2 text-lg px-8 py-4">
                  <span>View Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-1 mb-4">
              Key Features
            </h2>
            <p className="body-text max-w-2xl mx-auto text-lg">
              Everything you need for efficient expense management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-minimal p-6 text-center group">
              <div className="w-14 h-14 bg-[#1a6ab3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-7 w-7 text-white" />
              </div>
              <h3 className="heading-3 mb-3">Expense Tracking</h3>
              <p className="body-text">
                Track and categorize expenses with real-time status updates.
              </p>
            </div>

            <div className="card-minimal p-6 text-center group">
              <div className="w-14 h-14 bg-[#30adb2] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="h-7 w-7 text-white" />
              </div>
              <h3 className="heading-3 mb-3">File Attachments</h3>
              <p className="body-text">
                Attach receipts and documents for complete record keeping.
              </p>
            </div>

            <div className="card-minimal p-6 text-center group">
              <div className="w-14 h-14 bg-[#99e799] rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-gray-800" />
              </div>
              <h3 className="heading-3 mb-3">Approval Workflow</h3>
              <p className="body-text">
                Streamlined approval process with status tracking.
              </p>
            </div>

            <div className="card-minimal p-6 text-center group">
              <div className="w-14 h-14 bg-[#1a6ab3] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="heading-3 mb-3">User Management</h3>
              <p className="body-text">
                Manage users and roles with admin controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our System?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#1a6ab3] rounded flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure & Reliable</h3>
                    <p className="text-sm text-gray-600">Enterprise-grade security with Firebase.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#30adb2] rounded flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real-time Dashboard</h3>
                    <p className="text-sm text-gray-600">Insights and analytics at your fingertips.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#99e799] rounded flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy to Use</h3>
                    <p className="text-sm text-gray-600">Intuitive interface for all users.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-accent p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Experience our expense management system today.
                </p>
                <Link href="/demo" className="btn-primary inline-flex items-center space-x-2">
                  <span>View Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src="/faysys-logo.png"
                  alt="Faysys Technologies"
                  width={40}
                  height={40}
                  className="h-10 w-auto mr-3"
                />
                <div>
                  <span className="text-xl font-bold text-[#1a6ab3]">Faysys</span>
                  <span className="text-sm text-gray-400 ml-1">Technologies</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Simplifying expense management for modern businesses. Our platform provides seamless tracking, 
                approval workflows, and real-time insights to help you manage expenses efficiently.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://faysys.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1a6ab3] hover:text-[#30adb2] transition-colors duration-200 text-sm font-medium flex items-center"
                >
                  Visit Faysys.in
                  <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/demo" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    View Demo
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Sign In
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2025 Faysys Technologies. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Privacy Policy
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Terms of Service
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Cookie Policy
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Mobile Legal Links */}
            <div className="md:hidden mt-6 pt-6 border-t border-gray-800">
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );



  return renderLanding();
}