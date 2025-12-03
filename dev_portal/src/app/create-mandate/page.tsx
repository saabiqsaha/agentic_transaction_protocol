"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateMandate() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [agentAddress, setAgentAddress] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const [period, setPeriod] = useState("86400");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Integrate with Petra wallet and call smart contract
      console.log("Creating mandate:", {
        agentAddress,
        spendingLimit,
        period,
      });

      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStep(3); // Success step
    } catch (error) {
      console.error("Error creating mandate:", error);
      alert("Failed to create mandate");
    } finally {
      setIsSubmitting(false);
    }
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
              className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-3 text-gray-600 hover:bg-gray-50"
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
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                      step >= s
                        ? 'bg-ink text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-ink' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Configure</span>
              <span>Review</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Step 1: Configure */}
          {step === 1 && (
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">Create Spending Mandate</h2>
              <p className="text-gray-500 mb-6">
                Set spending limits for your AI agent to make autonomous payments.
              </p>

              <div className="space-y-5">
                {/* Agent Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Wallet Address
                  </label>
                  <input
                    type="text"
                    value={agentAddress}
                    onChange={(e) => setAgentAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    The wallet address of your AI agent that will make payments
                  </p>
                </div>

                {/* Spending Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spending Limit
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(e.target.value)}
                      placeholder="1.0"
                      step="0.000001"
                      min="0"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                    />
                    <div className="px-6 py-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center">
                      APT
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Maximum amount the agent can spend per period
                  </p>
                </div>

                {/* Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reset Period
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent bg-white"
                  >
                    <option value="86400">Daily (24 hours)</option>
                    <option value="604800">Weekly (7 days)</option>
                    <option value="2592000">Monthly (30 days)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1.5">
                    How often the spending limit resets
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Link href="/" className="flex-1">
                  <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => setStep(2)}
                  disabled={!agentAddress || !spendingLimit}
                  className="flex-1 px-4 py-3 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">Review Mandate</h2>
              <p className="text-gray-500 mb-6">
                Please review your mandate details before submitting to the blockchain.
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Agent Address</p>
                  <p className="font-mono text-sm break-all">{agentAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Spending Limit</p>
                    <p className="font-bold text-lg">{spendingLimit} APT</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Period</p>
                    <p className="font-bold text-lg">
                      {period === "86400" ? "Daily" : period === "604800" ? "Weekly" : "Monthly"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="material-symbols-outlined text-[18px] align-middle mr-1">
                    info
                  </span>
                  This will create an on-chain transaction. Your Petra wallet will open for approval.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Mandate..." : "Create Mandate"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 text-[32px]">
                  check_circle
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Mandate Created Successfully!</h2>
              <p className="text-gray-500 mb-6">
                Your AI agent is now authorized to make autonomous payments within the spending limit.
              </p>

              <div className="p-4 bg-gray-50 rounded-lg mb-6 text-left">
                <p className="text-xs text-gray-500 mb-2">Next Steps:</p>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Connect your agent using the MCP configuration</li>
                  <li>Test payments in the Agent Playground</li>
                  <li>Monitor activity in your dashboard</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Link href="/" className="flex-1">
                  <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Back to Home
                  </button>
                </Link>
                <Link href="/charges" className="flex-1">
                  <button className="w-full px-4 py-3 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    View Activity
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
