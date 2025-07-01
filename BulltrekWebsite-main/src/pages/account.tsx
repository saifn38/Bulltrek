'use client'

import { CollapsibleCard } from "@/components/collapsible-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from '@/lib/utils'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useUpdatePassword } from '@/hooks/useUpdatePassword'
import { useBrokerageDetails } from '@/hooks/useBrokerageDetails'
import { useBotManagement } from '@/hooks/useBotManagement'
import { Clock, Download, Edit, Plus, Trash2, RefreshCw } from 'lucide-react'
import { useResendInvite } from '@/hooks/sendinvite';
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useDirections } from '@/hooks/useDirection'
import { useQuantities } from '@/hooks/useQuantity'
import { useAssets } from '@/hooks/useAsset'
import { useIndicators } from '@/hooks/useIndicator'
import { PlatformDetails } from '../components/account/platformDetails';
import { useIndicatorActions } from '@/hooks/useIndicatorAction'
import { useIndicatorValues } from '@/hooks/useValue'
import { useTransactionHistory } from '@/hooks/useTransactionHistory';
import { ApiConnect } from "@/components/account/ApiConnect";
import { Eye, EyeOff } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';
import { PaperTradingTables } from "../components/paperTrading/papertrading";

interface ApiResponse<T> {  
  status: string;
  message: string;
  data: T;
  code: number;
}

interface Direction {
  id: number;
  direction: string;
}

interface Quantity {
  id: number;
  quantity: number;
}

interface Asset {
  id: number;
  symbol: string;
}

interface Indicator {
  id: number;
  name: string;
}

interface IndicatorAction {
  id: number;
  action: string;
}

interface IndicatorValue {
  id: number;
  value: number;
}

interface Transaction {
  id: string;
  symbol: string;
  orderId: string;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
}

// interface BinanceConnectionResponse {
//   status: string;
//   message: string;
//   data: {
//     user_id: number;
//     brokerage_name: string;
//     brokerage_id: number;
//     brokerage_api_key: string;
//     brokerage_api_secret: string;
//     updated_at: string;
//     created_at: string;
//     id: number;
//   };
//   code: number;
// }

// function useBinanceConnection() {
//   return useMutation<BinanceConnectionResponse, Error, string>({
//     mutationFn: async (userId: string) => {
//       const response = await apiClient.put<BinanceConnectionResponse>(`/api/v1/users/${userId}/brokerages/details/link`, {
//         brokerage_name: "binance",
//         brokerage_api_key: import.meta.env.VITE_BINANCE_API_KEY || "jcramxjcrjejdr80",
//         brokerage_api_secret: import.meta.env.VITE_BINANCE_API_SECRET || "x5bkuvcvbaqgh3yke4qzl1teuhxqna66"
//       });
//       return response.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || "Binance connected successfully");
//     },
//     onError: (error: Error) => {
//       console.error("Binance connection error:", error);
//       toast.error(error.message || "Failed to connect Binance");
//     }
//   });
// }

export default function AccountPage() {
  const navigate = useNavigate();
  // State declarations - move selectedSymbol here
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");

  // Hooks that depend on selectedSymbol
  const { 
    data: transactionData,
    isLoading: isTransactionLoading,
    error: transactionError
  } = useTransactionHistory(selectedSymbol);

  // Other hooks
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useUserProfile();
  const { data: brokerageData, isLoading: isBrokerageLoading, error: brokerageError } = useBrokerageDetails();
  const { bots, isLoading: isBotsLoading, error: botsError, createBot, updateBot, deleteBot } = useBotManagement();
  const updatePassword = useUpdatePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { directions, isLoading: isDirectionsLoading, createDirection, updateDirection, deleteDirection } = useDirections();
  const { quantities, isLoading: isQuantitiesLoading, createQuantity, updateQuantity, deleteQuantity } = useQuantities();
  const { assets, isLoading: isAssetsLoading, createAsset, updateAsset, deleteAsset } = useAssets();
  const { indicators, isLoading: isIndicatorsLoading, createIndicator, updateIndicator, deleteIndicator } = useIndicators();
  const { actions: indicatorActions, isLoading: isActionsLoading, createAction, updateAction, deleteAction } = useIndicatorActions();
  const { values: indicatorValues, isLoading: isValuesLoading, createValue, updateValue, deleteValue } = useIndicatorValues();
// Add these state declarations near the other useState hooks
const [editingItem, setEditingItem] = useState<{
  type: 'direction' | 'quantity' | 'asset' | 'indicator' | 'action' | 'value';
  id: number;
  value: string | number;
} | null>(null);

  // State declarations
  const [showApiModal, setShowApiModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [timeZone, setTimeZone] = useState("GMT, India");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCreateBotModal, setShowCreateBotModal] = useState(false);
  const [showEditBotModal, setShowEditBotModal] = useState(false);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'direction' | 'quantity' | 'asset' | 'indicator' | 'action' | 'value';
    id: number;
  } | null>(null);
  const [newBotData, setNewBotData] = useState<{
    name: string;
    strategy_id: number;
    mode: 'paper' | 'live';
    execution_type: 'manual' | 'scheduled';
  }>({
    name: '',
    strategy_id: 1,
    mode: 'paper',
    execution_type: 'manual',
  });
  const [newItem, setNewItem] = useState<{
    type: 'direction' | 'quantity' | 'asset' | 'indicator' | 'action' | 'value';
    value: string | number;
  } | null>(null);
  // Helper function to safely access data
  const getData = <T,>(data: T[] | ApiResponse<T[]> | undefined): T[] => {
    if (!data) return [];
    if ('data' in data) return data.data;
    return data;
  };

  // Loading state
  const isLoading = isProfileLoading || isBrokerageLoading || isBotsLoading || 
                   isDirectionsLoading || isQuantitiesLoading || isAssetsLoading || 
                   isIndicatorsLoading || isActionsLoading || isValuesLoading;

  // Handler functions
  const handleEmailEdit = () => {
    if (isEditing) {
      // Save email logic here
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match", {
        description: "Please make sure both new passwords are identical",
        duration: 5000,
      });
      return;
    }

    try {
      await updatePassword.mutateAsync({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });
      
      toast.success("Password Updated Successfully", {
        description: "Your password has been changed. Please use your new password for your next login.",
        duration: 5000,
      });
      
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Failed to Update Password", {
        description: error.response?.data?.message || "Please check your current password and try again",
        duration: 5000,
      });
    }
  };

  const handleDeleteDirection = (id: number) => {
  setItemToDelete({
    type: 'direction',
    id
  });
  setDeleteDialogOpen(true);
};

const handleConfirmDelete = async () => {
  if (!itemToDelete) return;
  try {
    switch (itemToDelete.type) {
      case 'direction':
        await deleteDirection.mutateAsync(itemToDelete.id);
        toast.success('Direction deleted successfully');
        break;
      case 'quantity':
        await deleteQuantity.mutateAsync(itemToDelete.id);
        toast.success('Quantity deleted successfully');
        break;
        case 'asset':
          await deleteAsset.mutateAsync(itemToDelete.id);
          toast.success('Asset deleted successfully');
          break;
        case 'indicator':
          await deleteIndicator.mutateAsync(itemToDelete.id);
          toast.success('Indicator deleted successfully');
          break;
        case 'action':
          await deleteAction.mutateAsync(itemToDelete.id);
          toast.success('Action deleted successfully');
          break;
        case 'value':
          await deleteValue.mutateAsync(itemToDelete.id);
          toast.success('Value deleted successfully');
          break;
      }
    } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to delete ${itemToDelete.type}`);
  } finally {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  }
};

  // Add missing handler functions
  const handleDownloadInvoice = (invoiceId: number) => {
    // Download logic here
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const handleDeletePlatform = (platformId: number) => {
    // Delete logic here
    console.log(`Deleting platform ${platformId}`);
  };

  const handleCreateBot = async () => {
    try {
      await createBot.mutateAsync(newBotData);
      toast.success("Bot created successfully");
      setShowCreateBotModal(false);
      setNewBotData({
        name: '',
        strategy_id: 1,
        mode: 'paper',
        execution_type: 'manual',
      });
    } catch (error: any) {
      toast.error("Failed to create bot", {
        description: error.response?.data?.message || "Please try again",
      });
    }
  };
  const resendInvite = useResendInvite();

  const handleUpdateBot = async (id: number, data: any) => {
    try {
      await updateBot.mutateAsync({ id, data });
      toast.success("Bot updated successfully");
      setShowEditBotModal(false);
      setSelectedBot(null);
    } catch (error: any) {
      toast.error("Failed to update bot", {
        description: error.response?.data?.message || "Please try again",
      });
    }
  };
  // Show loading state if any of the data is loading
  if (isLoading) {
    return (
      <div className="px-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-gray-600 mt-2">Please wait while we fetch your account details</p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error with profile data
  if (profileError || !profileData) {
    return (
      <div className="px-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error Loading Profile</h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const userData = profileData.data;

  const transactions = Array.isArray(transactionData?.data) 
    ? transactionData?.data 
    : [];

  return (
    <div className="px-4 flex flex-col gap-6">
      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Account Details" className='col-span-3'>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {/* Existing account details content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Name</div>
                            <div className="font-medium">{userData.name}</div>
                            </div>
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Account ID</div>
                            <div className="font-medium">{userData.id}</div>
                            </div>
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="flex items-center gap-2 max-w-[200px]">
                                {isEditing ? (
                                <Input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-8"
                                />
                                ) : (
                                <div className="font-medium truncate">{userData.email}</div>
                                )}
                                <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={handleEmailEdit}
                                className="h-8 w-8 flex-shrink-0"
                                >
                                <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Plan Name</div>
                            <div className="font-medium">Premium</div>
                            </div>
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="font-medium">24 Months</div>
                            </div>
                            <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">KYC</div>
                            <Badge variant="success">Verified</Badge>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Time Zone</div>
                            <div className="flex items-center gap-2 max-w-[200px]">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Select value={timeZone} onValueChange={setTimeZone}>
                                <SelectTrigger>
                                <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="GMT, India">GMT, India</SelectItem>
                                <SelectItem value="PST, USA">PST, USA</SelectItem>
                                <SelectItem value="EST, USA">EST, USA</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                    </div>

                   <div className="flex flex-col flex-wrap gap-3">
                    <Button 
                      className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit flex items-center gap-2"
                      onClick={() => {
                        toast.success("Details updated successfully");
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Update Details
                    </Button>

                    <Button 
                      className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Change Password
                    </Button>

                    <Button 
                      className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit" 
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade/Renew Plan
                    </Button>

                    {/* Group Wallet and Send Invite horizontally */}
                    <div className="flex gap-3">
                      <Button 
                        className="bg-orange-500 text-white hover:bg-orange-600 w-fit" 
                        onClick={() => navigate('/wallet')}
                      >
                        Wallet
                      </Button>

                      <Button
                        className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit"
                        onClick={() => resendInvite.mutate(userData.id)}
                        disabled={resendInvite.isPending}
                      >
                        {resendInvite.isPending ? "Sending..." : "Send Invite"}
                      </Button>
                    </div>
                  </div>
                </div>
            </div>
        </CollapsibleCard>
        {/* Api connect section */}
        <CollapsibleCard
  title="API Connect"
  className="col-span-2"
  action={
    <Button
      className="bg-[#FF8C00] text-white hover:bg-[#FFA500] rounded"
      onClick={e => {
        e.stopPropagation(); // Prevents toggling the card when clicking the button
        setShowApiModal(true);
      }}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Brokers/Exchanges
    </Button>
  }
>
  <ApiConnect
    userId={userData?.id?.toString()}
    showModal={showApiModal}
    setShowModal={setShowApiModal}
  />
</CollapsibleCard>
      </div>

      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Invoice Details" className='col-span-3'>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead  className='w-fit'>Download Invoice</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1, 2, 3, 4].map((i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                    <TableCell>{i}</TableCell>
                    <TableCell>Premium</TableCell>
                    <TableCell>12 July 2024</TableCell>
                    <TableCell>{formatCurrency(345)}</TableCell>
                    <TableCell>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className='w-fit'
                        onClick={() => handleDownloadInvoice(i)}
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CollapsibleCard>

        <CollapsibleCard title="Platform Details" className='col-span-2'>
          <PlatformDetails onDelete={handleDeletePlatform} />
        </CollapsibleCard>
      </div>

      
      <div className="grid grid-cols-5 w-full gap-4">

      <CollapsibleCard title="Referral Settings" className='col-span-3'>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Pending Referrals</div>
              <div className="font-medium">323</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Active Referrals</div>
              <div className="font-medium">500</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Payment Option</div>
              <Select defaultValue="paypal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="flex items-center gap-2 max-w-[200px]">
                <div className="font-medium truncate">{userData.email}</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Referral Name</TableHead>
                <TableHead>Account ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell>1</TableCell>
                  <TableCell>12 July 2024</TableCell>
                  <TableCell>Himesh Raj</TableCell>
                  <TableCell>123456791</TableCell>
                  <TableCell>
                    <Badge variant={i === 3 ? "warning" : "success"}>
                      {i === 3 ? "Pending" : "Verified"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Other Settings" className='col-span-2 w-full'>
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="font-medium">2 Factor Authentication</div>
            <Switch 
              checked={is2FAEnabled}
              onCheckedChange={setIs2FAEnabled}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="font-medium">Having Trouble?</div>
            <Button className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
            onClick={() => navigate('/support')}>
              Support
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="font-medium">Learn More</div>
            <Button className="bg-[#4A1C24] text-white hover:bg-[#3A161C]">
              Tutorials
            </Button>
          </div>
        </div>
      </CollapsibleCard>

      </div>



{showPasswordModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Current Password</label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1 h-8"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">New Password</label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1 h-8"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Confirm New Password</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1 h-8"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setShowPasswordModal(false);
              setShowCurrentPassword(false);
              setShowNewPassword(false);
              setShowConfirmPassword(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
            onClick={handlePasswordUpdate}
            disabled={updatePassword.isPending}
          >
            {updatePassword.isPending ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  </div>
)}  

      {/* Create Bot Modal */}
      {showCreateBotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Create New Bot</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Bot Name</label>
                <Input
                  value={newBotData.name}
                  onChange={(e) => setNewBotData({ ...newBotData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Mode</label>
                <Select
                  value={newBotData.mode}
                  onValueChange={(value) => setNewBotData({ ...newBotData, mode: value as 'paper' | 'live' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">Paper Trading</SelectItem>
                    <SelectItem value="live">Live Trading</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Execution Type</label>
                <Select
                  value={newBotData.execution_type}
                  onValueChange={(value) => setNewBotData({ ...newBotData, execution_type: value as 'manual' | 'scheduled' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateBotModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                  onClick={handleCreateBot}
                  disabled={createBot.isPending}
                >
                  {createBot.isPending ? "Creating..." : "Create Bot"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bot Modal */}
      {showEditBotModal && selectedBot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Edit Bot</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Bot Name</label>
                <Input
                  value={selectedBot.name}
                  onChange={(e) => setSelectedBot({ ...selectedBot, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Mode</label>
                <Select
                  value={selectedBot.mode}
                  onValueChange={(value) => setSelectedBot({ ...selectedBot, mode: value as 'paper' | 'live' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">Paper Trading</SelectItem>
                    <SelectItem value="live">Live Trading</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Execution Type</label>
                <Select
                  value={selectedBot.execution_type}
                  onValueChange={(value) => setSelectedBot({ ...selectedBot, execution_type: value as 'manual' | 'scheduled' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedBot.execution_type === 'scheduled' && (
                <div>
                  <label className="text-sm text-muted-foreground">Schedule Expression</label>
                  <Input
                    value={selectedBot.schedule_expression || ''}
                    onChange={(e) => setSelectedBot({ ...selectedBot, schedule_expression: e.target.value })}
                    className="mt-1"
                    placeholder="*/15 * * * *"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditBotModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                  onClick={() => handleUpdateBot(selectedBot.id, selectedBot)}
                  disabled={updateBot.isPending}
                >
                  {updateBot.isPending ? "Updating..." : "Update Bot"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add the Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-5 w-full gap-4">
       <CollapsibleCard title="Transaction History" className="col-span-5">
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <Select
                defaultValue="BTCUSDT"
                onValueChange={(value) => setSelectedSymbol(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                  <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                        {isTransactionLoading ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              Loading transactions...
                            </TableCell>
                          </TableRow>
                        ) : transactionError ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4 text-red-500">
                              Transactio data not found
                            </TableCell>
                          </TableRow>
                        ) : !transactions || transactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              No transactions found
                            </TableCell>
                          </TableRow>
                        ) : (
                          transactions.map((transaction: Transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>{transaction.symbol}</TableCell>
                              <TableCell>{transaction.orderId}</TableCell>
                              <TableCell>{parseFloat(transaction.price).toFixed(2)}</TableCell>
                              <TableCell>{parseFloat(transaction.qty).toFixed(8)}</TableCell>
                              <TableCell>{parseFloat(transaction.quoteQty).toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={transaction.isBuyer ? "success" : "destructive"}
                                >
                                  {transaction.isBuyer ? "Buy" : "Sell"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {`${parseFloat(transaction.commission).toFixed(8)} ${transaction.commissionAsset}`}
                              </TableCell>
                              <TableCell>
                                {format(new Date(transaction.time), 'dd MMM yyyy HH:mm:ss')}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                    </TableBody>
              </Table>
            </div>
          </div>
        </CollapsibleCard>
      </div>

      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Paper Trading" className="col-span-5">
          <div className="space-y-4">
            <PaperTradingTables botId={1} /> {/* Pass the correct bot ID */}
          </div>
        </CollapsibleCard>
      </div>
    </div>
  )
}
