'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export function WalletButton() {
  const { account, connected, disconnect, wallets, connect } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle wallet connection
  const handleConnect = async (walletName: string) => {
    const wallet = wallets?.find((w) => w.name === walletName);
    if (wallet) {
      await connect(wallet.name);
      setIsModalOpen(false);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connected && account) {
    const addressString = account.address.toString();
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-ink/5 rounded-lg border border-ink/10">
          <span className="font-mono text-sm text-ink">
            {formatAddress(addressString)}
          </span>
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-ink text-paper rounded-lg font-medium hover:bg-ink/90 transition-colors"
      >
        Connect Wallet
      </button>

      {/* Wallet Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50">
          <div className="bg-paper rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl border border-ink/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-ink">Connect Wallet</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink/60 hover:text-ink"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {wallets && wallets.length > 0 ? (
                wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    className="w-full flex items-center gap-4 p-4 rounded-lg border border-ink/10 hover:border-ink/20 hover:bg-ink/5 transition-all"
                  >
                    {wallet.icon && (
                      <img
                        src={wallet.icon}
                        alt={wallet.name}
                        className="w-8 h-8"
                      />
                    )}
                    <span className="font-medium text-ink">{wallet.name}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-ink/60 mb-4">
                    No Aptos wallets detected
                  </p>
                  <a
                    href="https://petra.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink hover:text-ink/80"
                  >
                    Install Petra Wallet
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
