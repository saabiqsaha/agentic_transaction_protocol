import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Tokens', icon: 'token', href: '/tokens' },
    { name: 'Charges', icon: 'payments', href: '/charges' },
    { name: 'Playground', icon: 'terminal', href: '/playground' },
    { name: 'Buyer API Keys', icon: 'key', href: '/api-keys' },
  ];

  const secondaryItems = [
    { name: 'Directory', icon: 'folder_open', href: '/directory' },
    { name: 'Docs', icon: 'description', href: '/docs' },
  ];

  return (
    <div className="flex min-h-screen bg-paper text-ink font-sans">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/cowrie.png" alt="Cowrie Logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold text-lg">Cowrie</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-3 ${item.name === 'Home' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <div className="my-4 border-t border-gray-100"></div>
          {secondaryItems.map((item) => (
            <Link key={item.name} href={item.href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Top Bar with Connect Wallet */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              Connect Wallet
            </button>
          </div>

          {/* Header */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl font-semibold mb-1">Buyer Onboarding Checklist</h1>
                <p className="text-gray-500 text-sm">Complete these steps to get started using Cowrie as a buyer.</p>
              </div>
              <span className="text-sm text-gray-400">0/3</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">school</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Learn how to use tokens</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Visit our interactive playground and learn how to create a token and use it to access services.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">verified_user</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Get Verified</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Get verified to access more services. Some providers require additional verification to use their services.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">storefront</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Create a Seller Account</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Interested in offering your own services? Set up a seller account to start providing value to other users.</p>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900">Available Balance</h2>
                <span className="material-symbols-outlined text-gray-400 text-sm">info</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-space tracking-tight">0.3000000</span>
                <span className="text-sm font-medium text-gray-500">USD</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-ink text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Fund Wallet
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">history</span>
                Activity
              </button>
            </div>
          </div>

          {/* Tokens Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[300px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-semibold text-gray-900">Tokens</h2>
              <button className="text-sm font-medium text-gray-900 flex items-center gap-1 hover:opacity-70">
                View All
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
              <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-gray-400">generating_tokens</span>
              </div>
              <p className="font-medium text-gray-900">No active tokens available</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
