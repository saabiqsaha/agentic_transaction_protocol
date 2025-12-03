"use client";

import { useState } from "react";

interface CreateMandateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMandateModal({ isOpen, onClose }: CreateMandateModalProps) {
  const [agentAddress, setAgentAddress] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const [period, setPeriod] = useState("86400"); // Daily in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      alert("Mandate created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating mandate:", error);
      alert("Failed to create mandate");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Create Spending Mandate</h2>
            <p className="text-sm text-gray-500">
              Authorize an AI agent to spend on your behalf
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Agent Address
            </label>
            <input
              type="text"
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              The wallet address of your AI agent
            </p>
          </div>

          {/* Spending Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Spending Limit
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(e.target.value)}
                placeholder="100"
                step="0.000001"
                min="0"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                required
              />
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center">
                APT
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum amount the agent can spend per period
            </p>
          </div>

          {/* Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Reset Period
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent bg-white"
            >
              <option value="86400">Daily (24 hours)</option>
              <option value="604800">Weekly (7 days)</option>
              <option value="2592000">Monthly (30 days)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              How often the spending limit resets
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Mandate"}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-xs text-blue-700">
            <span className="material-symbols-outlined text-[16px] align-middle mr-1">
              info
            </span>
            This will create an on-chain transaction that requires Petra wallet approval.
          </p>
        </div>
      </div>
    </div>
  );
}
