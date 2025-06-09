export interface UserProfile {
    name: string;
    email: string;
    accountId: string;
    timeZone: string;
    plan: {
      name: string;
      duration: string;
      kycStatus: 'Verified' | 'Pending';
    };
    referrals: {
      pending: number;
      active: number;
      list: {
        id: number;
        joinedDate: string;
        name: string;
        accountId: string;
        status: 'Verified' | 'Pending';
      }[];
    };
    apis: {
      id: number;
      name: string;
      type: string;
      status: 'Connect' | 'Connected';
    }[];
    invoices: {
      id: number;
      date: string;
      amount: number;
      planName: string;
    }[];
    platforms: {
      id: number;
      name: string;
      addedDate: string;
      expiryDate: string;
    }[];
  }
  