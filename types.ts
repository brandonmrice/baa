export type AuditType = 'mini-app' | 'ai-agent' | 'blockchain';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type CheckpointStatus = 'PASS' | 'FAIL' | 'WARN';

export interface Checkpoint {
  id: number;
  category: string;
  title: string;
  description: string;
  severity: Severity;
  status: CheckpointStatus;
  remediation?: string;
}

export interface AuditReport {
  score: number;
  passedCount: number;
  failedCount: number;
  categoryScores: Record<string, number>;
  checkpoints: Checkpoint[];
}

export interface AuditLog {
  id: string;
  target: string;
  type: AuditType;
  score: number;
  status: 'PASS' | 'FAIL' | 'WARNING';
  timestamp: Date;
  details: string;
  report: AuditReport;
}

export interface StatMetric {
  label: string;
  value: string | number;
  icon: 'shield' | 'activity' | 'bell';
  color: 'blue' | 'green' | 'yellow';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  providerType?: 'METAMASK' | 'COINBASE' | 'WALLETCONNECT' | 'SIMULATION';
}

export interface AppState {
  audits: AuditLog[];
  stats: {
    totalAudits: number;
    systemHealth: number;
    activeAlerts: number;
  };
  wallet: WalletState;
  isUpgradeModalOpen: boolean;
  isAuditModalOpen: boolean;
  isWalletModalOpen: boolean;
}