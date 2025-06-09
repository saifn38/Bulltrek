export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  registeredDate: string;
  statusLine: string;
}

export interface DashboardResponse {
  summary: {
    platformsAdded: number | 0;
    strategiesActive: number;
    tradesExecuted: number;
    netPL: number;
    netPLPercentage: number;
    verifiedReferrals: number;
    pendingReferrals: number;
  };

  strategies: StrategyData[];
  scanners: ScannerData[];
  apis: APIData[];
  supportTickets: SupportTicketData[];
  plan: {
    name: string;
    duration: string;
    renewalDate: string;
  };
}

export interface PerformanceMetrics {
  roi: number;
  totalProfit: number;
  maxDrawdown: number;
  totalFollowers: number;
  followersInPnl: number;
  tradingFrequency: number;
  winRate: number;
  profitableTrades: number;
  losingTrades: number;
}

export interface AssetMetrics {
  aum: number;
  totalAssets: number;
  lastTrade: string;
  profitShareRatio: number;
  watches: number;
}

export interface Copier {
  id: string;
  name: string;
  username: string;
  avatar: string;
  timeAgo: string;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface StrategyData {
  broker: string;
  api: string;
  strategy: string;
  runTime: string;
  availableInvestment: number;
  frozenInvestment: number;
  unrealizedPL: number;
  netPL: number;
  tradesExecuted: number;
  status: "Active" | "Closed";
}

export interface ScannerData {
  name: string;
  dateTime: string;
  pairs: string;
  status: "Active" | "Closed";
}

export interface APIData {
  name: string;
  type: string;
  status: "Connect" | "Connected";
}

export interface SupportTicketData {
  number: string;
  createdOn: string;
  status: "Resolved" | "In Progress";
}
