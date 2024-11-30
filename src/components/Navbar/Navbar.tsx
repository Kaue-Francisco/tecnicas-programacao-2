import React, { useEffect, useRef, MouseEvent } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faWater } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Clientes', href: '/clients' },
    { name: 'Listagens', href: '/listing' },
    { name: 'Hospedagem', href: '/hosting' },
  ];

  const handleClickOutside = (event: Event) => {
    const mouseEvent = event as unknown as MouseEvent;
    if (navRef.current && !navRef.current.contains(mouseEvent.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-500 shadow-md h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon icon={faWater} className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Atlantis</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="ml-8 text-sm font-medium text-white hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              )}
            </button>

            {isOpen && (
              <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setIsOpen(false)} />
            )}

            {/* Mobile menu */}
            <div
              ref={navRef}
              className={`fixed top-0 right-0 h-full w-3/5 bg-white shadow-lg z-20 transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
                <span className="ml-2 text-sm font-bold">Atlantis</span>
                <FontAwesomeIcon icon={faWater} className="h-5 w-5 text-blue-500 ml-2" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}