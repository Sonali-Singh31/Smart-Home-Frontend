'use client';
import './globals.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { DeviceProvider } from './context/DeviceContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen">
        <DeviceProvider>
          <div className="flex min-h-screen">
            {/* Sidebar with shadow and sticky effect */}
            <aside className="flex-shrink-0">
              <Sidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {/* Navbar with shadow */}
              <header className="sticky top-0 z-50 shadow-sm bg-white">
                <Navbar />
              </header>

              {/* Page content */}
              <main className="flex-1 p-6 md:p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">{children}</div>
              </main>
            </div>
          </div>
        </DeviceProvider>
      </body>
    </html>
  );
}
