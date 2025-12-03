"use client";

import Image from "next/image";
import Link from "next/link";

export default function Activity() {
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

  // Mock transaction data
  const transactions = [
    {
      id: '1',
      date: '2025-12-02 08:30:15',
      amount: '0.0005',
      txHash: '0x2ea539ef72fadcb53bb34c60874a17c8febc99afee498cb7458a5b996a3ef2e7',
      status: 'Success',
    },
    // Add more mock transactions as needed
  ];

  // Mock mandate data
  const mandate = {
    limit: 1.0,
    spent: 0.0005,
    available: 0.9995,
  };

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
                item.name === 'Activity' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold mb-1">Agent Activity</h1>
            <p className="text-gray-500 text-sm">Monitor your AI agent's spending and transaction history</p>
          </div>

          {/* Mandate Summary Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-semibold text-gray-900">Current Mandate Status</h2>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Spending Limit</p>
                <p className="text-2xl font-bold font-space">{mandate.limit.toFixed(4)} APT</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Spent</p>
                <p className="text-2xl font-bold font-space text-orange-600">
                  {mandate.spent.toFixed(4)} APT
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Available</p>
                <p className="text-2xl font-bold font-space text-green-600">
                  {mandate.available.toFixed(4)} APT
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                  style={{ width: `${(mandate.spent / mandate.limit) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((mandate.spent / mandate.limit) * 100).toFixed(1)}% of limit used
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-ink border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Update Limit
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Revoke Mandate
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Transaction History</h2>
            </div>

            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction Hash
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tx.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tx.amount} APT
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a
                            href={`https://explorer.aptoslabs.com/txn/${tx.txHash}?network=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-mono"
                          >
                            {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                            <span className="material-symbols-outlined text-[16px]">
                              open_in_new
                            </span>
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tx.status === 'Success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                </div>
                <p className="font-medium text-gray-900 mb-1">No transactions yet</p>
                <p className="text-sm text-gray-500">
                  Your agent's spending will appear here once they make their first transaction.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
