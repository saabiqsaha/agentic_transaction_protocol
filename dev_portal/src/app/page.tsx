"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MCPConfigModal from "@/components/MCPConfigModal";

export default function Home() {
  const [showMCPConfig, setShowMCPConfig] = useState(false);

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
      {/* MCP Config Modal */}
      <MCPConfigModal isOpen={showMCPConfig} onClose={() => setShowMCPConfig(false)} />

      {/* Sidebar */}
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

          {/* Agent Onboarding Checklist */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl font-semibold mb-1">Agent Onboarding Checklist</h1>
                <p className="text-gray-500 text-sm">Enable your AI agents to make autonomous payments with spending limits.</p>
              </div>
              <span className="text-sm text-gray-400">0/3</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Create Mandate */}
              <Link href="/create-mandate" className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">psychology</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Create a Spending Mandate</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Set up spending limits for your AI agent. Define daily budgets and authorize your agent to make autonomous payments on-chain.</p>
              </Link>

              {/* Card 2: Connect Agent */}
              <div
                onClick={() => setShowMCPConfig(true)}
                className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">smart_toy</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Connect Your Agent</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Integrate your AI agent using our SDK. Test autonomous payments in the playground with real blockchain transactions.</p>
              </div>

              {/* Card 3: Monitor Activity */}
              <Link href="/charges" className="bg-paper p-5 rounded-lg border border-gray-100 hover:border-highlight transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-100">
                    <span className="material-symbols-outlined text-gray-700">receipt_long</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-300"></div>
                </div>
                <h3 className="font-medium mb-2">Monitor Agent Activity</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Track your agent's spending in real-time. View transaction history, remaining balance, and mandate status on the blockchain.</p>
              </Link>
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900">Available Balance</h2>
                <span className="material-symbols-outlined text-gray-400 text-sm">info</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">Powered by Aptos</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-space tracking-tight">0.3000000</span>
                <span className="text-sm font-medium text-gray-500">APT</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-ink text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Fund Wallet
              </button>
              <Link href="/charges">
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Activity
                </button>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-400">
              All transactions are secured on-chain via Aptos blockchain • Real-time mandate enforcement
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
