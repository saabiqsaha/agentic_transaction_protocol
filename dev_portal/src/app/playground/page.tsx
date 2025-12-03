"use client";

import Image from "next/image";
import Link from "next/link";

export default function AgentPlayground() {
  const menuItems = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Activity', icon: 'payments', href: '/charges' },
    { name: 'Agent Playground', icon: 'terminal', href: '/playground' },
    { name: 'API Keys', icon: 'key', href: '/api-keys' },
  ];

  const secondaryItems = [
    { name: 'Directory', icon: 'folder_open', href: '/directory' },
    { name: 'Docs', icon: 'description', href: '/docs' },
  ];

  return (
    <div className="flex min-h-screen bg-paper text-ink font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/cowrie.png" alt="Cowrie Logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold text-lg">Cowrie</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-3 ${
                item.name === 'Agent Playground' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <div className="my-4 border-t border-gray-100"></div>
          {secondaryItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Agent Playground</h1>
            <p className="text-gray-500 text-sm">Test your AI agent's payment capabilities in a safe environment</p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-gray-400 text-[48px]">science</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              The Agent Playground will let you test autonomous payments, simulate spending scenarios, and debug your agent's behavior in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Back to Home
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-4 py-2 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  View Documentation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
