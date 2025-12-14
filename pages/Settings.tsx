import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Zap, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [scanFrequency, setScanFrequency] = useState('weekly');
  const [apiKey, setApiKey] = useState('sk_live_...');

  const handleSave = () => {
    // Simulate save
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-pixel text-retro-cyan mb-2">SETTINGS</h1>
        <p className="text-retro-dim font-terminal">Configure your audit preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-retro-panel border-4 border-retro-purple p-8 shadow-pixel-purple">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-retro-purple" size={32} />
          <h2 className="text-2xl font-pixel text-retro-purple">NOTIFICATIONS</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-terminal text-white font-bold mb-1">Email Notifications</div>
              <div className="text-retro-dim font-terminal text-sm">
                Receive audit reports and alerts via email
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-16 h-8 rounded-none border-4 transition-all ${
                emailNotifications
                  ? 'bg-retro-green border-retro-green'
                  : 'bg-retro-dark border-retro-dim'
              }`}
            >
              <div
                className={`w-6 h-6 bg-black transition-all ${
                  emailNotifications ? 'ml-8' : 'ml-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-terminal text-white font-bold mb-1">Push Notifications</div>
              <div className="text-retro-dim font-terminal text-sm">
                Real-time alerts for critical issues
              </div>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-16 h-8 rounded-none border-4 transition-all ${
                pushNotifications
                  ? 'bg-retro-green border-retro-green'
                  : 'bg-retro-dark border-retro-dim'
              }`}
            >
              <div
                className={`w-6 h-6 bg-black transition-all ${
                  pushNotifications ? 'ml-8' : 'ml-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Settings */}
      <div className="bg-retro-panel border-4 border-retro-cyan p-8 shadow-pixel-cyan">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-retro-cyan" size={32} />
          <h2 className="text-2xl font-pixel text-retro-cyan">AUDIT SETTINGS</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-terminal text-white font-bold mb-1">Automatic Scanning</div>
              <div className="text-retro-dim font-terminal text-sm">
                Enable scheduled automatic security scans
              </div>
            </div>
            <button
              onClick={() => setAutoScan(!autoScan)}
              className={`w-16 h-8 rounded-none border-4 transition-all ${
                autoScan
                  ? 'bg-retro-green border-retro-green'
                  : 'bg-retro-dark border-retro-dim'
              }`}
            >
              <div
                className={`w-6 h-6 bg-black transition-all ${
                  autoScan ? 'ml-8' : 'ml-0'
                }`}
              />
            </button>
          </div>

          {autoScan && (
            <div>
              <label className="block text-white font-terminal font-bold mb-3">
                Scan Frequency
              </label>
              <select
                value={scanFrequency}
                onChange={(e) => setScanFrequency(e.target.value)}
                className="w-full bg-retro-dark border-4 border-retro-dim focus:border-retro-cyan outline-none px-4 py-3 font-terminal text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-retro-panel border-4 border-retro-green p-8 shadow-pixel-green">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="text-retro-green" size={32} />
          <h2 className="text-2xl font-pixel text-retro-green">API ACCESS</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-terminal font-bold mb-3">
              API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-retro-dark border-4 border-retro-dim focus:border-retro-green outline-none px-4 py-3 font-terminal text-white"
                placeholder="Enter your API key..."
              />
            </div>
            <p className="text-retro-dim font-terminal text-sm mt-2">
              Use this key to authenticate API requests to Base Audit
            </p>
          </div>

          <div className="bg-retro-dark border-2 border-retro-dim p-4">
            <div className="text-retro-dim font-terminal text-sm mb-2">Example API Call:</div>
            <code className="text-retro-green font-terminal text-xs block">
              curl -X POST https://api.baseaudit.io/v1/scan \<br />
              {'  '}-H "Authorization: Bearer YOUR_API_KEY" \<br />
              {'  '}-d '{{"target": "https://example.com"}}'
            </code>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-retro-panel border-4 border-retro-yellow p-8 shadow-pixel-yellow">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="text-retro-yellow" size={32} />
          <h2 className="text-2xl font-pixel text-retro-yellow">ACCOUNT</h2>
        </div>

        <div className="space-y-4 font-terminal">
          <div className="flex justify-between items-center pb-4 border-b-2 border-retro-dim">
            <span className="text-retro-dim">Plan:</span>
            <span className="text-white font-bold">FREE TIER</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b-2 border-retro-dim">
            <span className="text-retro-dim">Audits Used:</span>
            <span className="text-white font-bold">5 / 10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-retro-dim">Next Reset:</span>
            <span className="text-white font-bold">7 days</span>
          </div>
        </div>

        <button className="w-full mt-6 bg-retro-yellow hover:bg-retro-green text-black font-pixel py-3 px-6 border-4 border-black transition-all shadow-pixel">
          UPGRADE TO PRO
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-4 px-8 border-4 border-black transition-all shadow-pixel"
        >
          <Save size={20} />
          <span>SAVE CHANGES</span>
        </button>
      </div>
    </div>
  );
};