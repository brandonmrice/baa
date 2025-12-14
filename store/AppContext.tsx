import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { AppState, AuditLog, WalletState } from '../types';

const initialState: AppState = {
  audits: [],
  stats: {
    totalAudits: 0,
    systemHealth: 98,
    activeAlerts: 3,
  },
  wallet: {
    isConnected: false,
    address: null,
    balance: '0.0',
  },
  isUpgradeModalOpen: false,
  isAuditModalOpen: false,
  isWalletModalOpen: false,
};

type Action =
  | { type: 'ADD_AUDIT'; payload: AuditLog }
  | { type: 'UPDATE_STATS'; payload: Partial<AppState['stats']> }
  | { type: 'CONNECT_WALLET'; payload: WalletState }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'OPEN_UPGRADE_MODAL' }
  | { type: 'CLOSE_UPGRADE_MODAL' }
  | { type: 'OPEN_AUDIT_MODAL' }
  | { type: 'CLOSE_AUDIT_MODAL' }
  | { type: 'OPEN_WALLET_MODAL' }
  | { type: 'CLOSE_WALLET_MODAL' };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_AUDIT':
      return {
        ...state,
        audits: [action.payload, ...state.audits],
        stats: {
          ...state.stats,
          totalAudits: state.stats.totalAudits + 1,
        },
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload },
      };
    case 'CONNECT_WALLET':
      return {
        ...state,
        wallet: action.payload,
      };
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        wallet: {
          isConnected: false,
          address: null,
          balance: '0.0',
        },
      };
    case 'OPEN_UPGRADE_MODAL':
      return { ...state, isUpgradeModalOpen: true };
    case 'CLOSE_UPGRADE_MODAL':
      return { ...state, isUpgradeModalOpen: false };
    case 'OPEN_AUDIT_MODAL':
      return { ...state, isAuditModalOpen: true };
    case 'CLOSE_AUDIT_MODAL':
      return { ...state, isAuditModalOpen: false };
    case 'OPEN_WALLET_MODAL':
      return { ...state, isWalletModalOpen: true };
    case 'CLOSE_WALLET_MODAL':
      return { ...state, isWalletModalOpen: false };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

**Your folder structure should now be:**
```
base_-audit_-agent/
├── components/
│   ├── Sidebar.tsx
│   ├── InitiateAuditModal.tsx
│   ├── UpgradeModal.tsx
│   └── WalletModal.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── NewAudit.tsx
│   ├── Report.tsx
│   ├── Monitoring.tsx
│   └── Settings.tsx
├── store/               ← CREATE THIS FOLDER
│   └── AppContext.tsx   ← CREATE THIS FILE
├── App.tsx
├── index.tsx
├── types.ts
├── index.html
├── package.json
└── vite.config.ts