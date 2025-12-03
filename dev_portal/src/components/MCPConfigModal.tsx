"use client";

import { useState } from "react";

interface MCPConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentPrivateKey?: string;
}

export default function MCPConfigModal({
  isOpen,
  onClose,
  agentPrivateKey = "0x...",
}: MCPConfigModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const configJSON = {
    mcpServers: {
      cowrie: {
        command: "node",
        args: ["/path/to/mcp_server/dist/index.js"],
        env: {
          AGENT_PRIVATE_KEY: agentPrivateKey,
        },
      },
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(configJSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Connect Your Agent</h2>
            <p className="text-sm text-gray-500">
              Add this configuration to your Claude Desktop config
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Config Display */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-sm text-green-400 font-mono">
            {JSON.stringify(configJSON, null, 2)}
          </pre>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2.5 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <span className="material-symbols-outlined text-[20px]">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "Copied!" : "Copy Config"}
        </button>

        {/* Instructions */}
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2 text-sm">
              Setup Instructions:
            </h3>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>Copy the configuration above</li>
              <li>
                Open{" "}
                <code className="bg-blue-100 px-1 py-0.5 rounded">
                  ~/Library/Application Support/Claude/claude_desktop_config.json
                </code>
              </li>
              <li>Paste the configuration into the file</li>
              <li>Restart Claude Desktop</li>
              <li>Your agent can now make autonomous payments!</li>
            </ol>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs text-amber-700">
              <span className="material-symbols-outlined text-[16px] align-middle mr-1">
                warning
              </span>
              Keep your agent's private key secure. Never share it publicly or commit it to
              version control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
