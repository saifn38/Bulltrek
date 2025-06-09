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
import { Clock, Download, Edit, Plus, Trash2, RefreshCcw } from 'lucide-react'
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
import { ApiConnect } from "../components/dashboard/ApiConnect";
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
import { useMutation } from "@tanstack/react-query";
// import type { AxiosInstance } from 'axios';
import apiClient from "../api/apiClient";
import { useNavigate } from 'react-router-dom';

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

  const handleDeleteDirection = async (id: number) => {
    setItemToDelete({ type: 'direction', id });
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

  const handleDeleteBot = async (id: number) => {
    try {
      await deleteBot.mutateAsync(id);
      toast.success("Bot deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete bot", {
        description: error.response?.data?.message || "Please try again",
      });
    }
  };

  const handleUpdateDirection = async (id: number, direction: string) => {
    try {
      await updateDirection.mutateAsync({ id, direction });
      toast.success('Direction updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update direction');
    }
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      await updateQuantity.mutateAsync({ id, quantity });
      toast.success('Quantity updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const handleDeleteQuantity = async (id: number) => {
    setItemToDelete({ type: 'quantity', id });
    setDeleteDialogOpen(true);
  };

  const handleUpdateAsset = async (id: number, symbol: string) => {
    try {
      await updateAsset.mutateAsync({ id, symbol });
      toast.success('Asset updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update asset');
    }
  };

  const handleDeleteAsset = async (id: number) => {
    setItemToDelete({ type: 'asset', id });
    setDeleteDialogOpen(true);
  };

  const handleUpdateIndicator = async (id: number, name: string) => {
    try {
      await updateIndicator.mutateAsync({ id, name });
      toast.success('Indicator updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update indicator');
    }
  };

  const handleDeleteIndicator = async (id: number) => {
    setItemToDelete({ type: 'indicator', id });
    setDeleteDialogOpen(true);
  };

  const handleUpdateAction = async (id: number, action: string) => {
    try {
      await updateAction.mutateAsync({ id, action });
      toast.success('Indicator action updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update indicator action');
    }
  };

  const handleDeleteAction = async (id: number) => {
    setItemToDelete({ type: 'action', id });
    setDeleteDialogOpen(true);
  };

  const handleUpdateValue = async (id: number, value: number) => {
    try {
      await updateValue.mutateAsync({ id, value });
      toast.success('Value updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update value');
    }
  };

  const handleDeleteValue = async (id: number) => {
    setItemToDelete({ type: 'value', id });
    setDeleteDialogOpen(true);
  };

  // Add create handlers
  const handleCreateDirection = async (direction: string) => {
    try {
      await createDirection.mutateAsync(direction);
      toast.success('Direction created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create direction');
    }
  };

  const handleCreateQuantity = async (quantity: number) => {
    try {
      await createQuantity.mutateAsync(quantity);
      toast.success('Quantity created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create quantity');
    }
  };

  const handleCreateAsset = async (symbol: string) => {
    try {
      await createAsset.mutateAsync(symbol);
      toast.success('Asset created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create asset');
    }
  };

  const handleCreateIndicator = async (name: string) => {
    try {
      await createIndicator.mutateAsync(name);
      toast.success('Indicator created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create indicator');
    }
  };

  const handleCreateAction = async (action: string) => {
    try {
      await createAction.mutateAsync(action);
      toast.success('Indicator action created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create indicator action');
    }
  };

  const handleCreateValue = async (value: number) => {
    try {
      await createValue.mutateAsync(value);
      toast.success('Value created successfully');
      setNewItem(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create value');
    }
  };

  const handleAddNewItem = (type: 'direction' | 'quantity' | 'asset' | 'indicator' | 'action' | 'value') => {
    setNewItem({ type, value: type === 'quantity' || type === 'value' ? 0 : '' });
  };

  const handleSaveNewItem = () => {
    if (!newItem) return;

    switch (newItem.type) {
      case 'direction':
        handleCreateDirection(newItem.value as string);
        break;
      case 'quantity':
        handleCreateQuantity(newItem.value as number);
        break;
      case 'asset':
        handleCreateAsset(newItem.value as string);
        break;
      case 'indicator':
        handleCreateIndicator(newItem.value as string);
        break;
      case 'action':
        handleCreateAction(newItem.value as string);
        break;
      case 'value':
        handleCreateValue(newItem.value as number);
        break;
    }
  };

  const handleCancelNewItem = () => {
    setNewItem(null);
  };

  // Extract bot list safely
  const botList = bots?.data || [];

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

  const transactions = transactionData?.data || [];

  return (
    <div className="px-4 flex flex-col gap-6">
      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Account Details" className='col-span-3'>
            <div className="flex gap-6">
                <div>
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
                      className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Change Password
                    </Button>
                    <Button className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit" onClick={() => navigate('/pricing')}>
                      Upgrade/Renew Plan
                    </Button>
                    <Button className="bg-orange-500 text-white hover:bg-orange-600 w-fit" onClick={() => navigate('/wallet')}>
                      Wallet
                    </Button>
                </div>
            </div>
        </CollapsibleCard>
        {/* Api connect section */}
        <CollapsibleCard title="API Connect" className='col-span-2'>
          <ApiConnect userId={userData?.id?.toString()} />
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
                    <Badge variant={i === 
3 ? "warning" : "success"}>
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

      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Bot Management" className='col-span-5'>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                onClick={() => setShowCreateBotModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Create New Bot
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Bot Name</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Execution Type</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isBotsLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading bots...
                    </TableCell>
                  </TableRow>
                ) : botsError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-red-500">
                      Error loading bots
                    </TableCell>
                  </TableRow>
                ) : botList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No bots found.
                    </TableCell>
                  </TableRow>
                ) : (
                  botList.map((bot: any, index) => (
                    <TableRow key={bot.id} className="hover:bg-muted/50">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{bot.name}</TableCell>
                      <TableCell>
                        <Badge variant={bot.mode === 'live' ? 'destructive' : 'default'}>
                          {bot.mode}
                        </Badge>
                      </TableCell>
                      <TableCell>{bot.execution_type}</TableCell>
                      <TableCell>{format(new Date(bot.created_at), 'dd MMM yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant="success">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedBot(bot);
                              setShowEditBotModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteBot(bot.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CollapsibleCard>
      </div>

      <div className="grid grid-cols-5 w-full gap-4">
        <CollapsibleCard title="Trading Configuration" className="col-span-5">
          <div className="grid grid-cols-2 gap-6">
            {/* Directions Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Trading Directions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('direction')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Direction
                </Button>
              </div>
              {newItem?.type === 'direction' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newItem.value as string}
                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                    placeholder="Enter direction"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Direction</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<Direction>(directions).map((direction) => (
                    <TableRow key={direction.id}>
                      <TableCell>{direction.id}</TableCell>
                      <TableCell>{direction.direction}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateDirection(direction.id, direction.direction)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDirection(direction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
            </div>

            {/* Quantities Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Trading Quantities</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('quantity')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Quantity
                </Button>
              </div>
              {newItem?.type === 'quantity' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    type="number"
                    value={newItem.value as number}
                    onChange={(e) => setNewItem({ ...newItem, value: parseFloat(e.target.value) })}
                    placeholder="Enter quantity"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Quantity</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<Quantity>(quantities).map((quantity) => (
                    <TableRow key={quantity.id}>
                      <TableCell>{quantity.id}</TableCell>
                      <TableCell>{quantity.quantity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateQuantity(quantity.id, quantity.quantity)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteQuantity(quantity.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
            </div>

            {/* Assets Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Trading Assets</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('asset')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Asset
                </Button>
              </div>
              {newItem?.type === 'asset' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newItem.value as string}
                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                    placeholder="Enter asset symbol"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Symbol</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<Asset>(assets).map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>{asset.id}</TableCell>
                      <TableCell>{asset.symbol}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateAsset(asset.id, asset.symbol)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAsset(asset.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            </div>

            {/* Indicators Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Trading Indicators</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('indicator')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Indicator
                </Button>
              </div>
              {newItem?.type === 'indicator' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newItem.value as string}
                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                    placeholder="Enter indicator name"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<Indicator>(indicators).map((indicator) => (
                    <TableRow key={indicator.id}>
                      <TableCell>{indicator.id}</TableCell>
                      <TableCell>{indicator.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateIndicator(indicator.id, indicator.name)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteIndicator(indicator.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
            </div>

            {/* Indicator Actions Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Indicator Actions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('action')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Action
                </Button>
              </div>
              {newItem?.type === 'action' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newItem.value as string}
                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                    placeholder="Enter action"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Action</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<IndicatorAction>(indicatorActions).map((action) => (
                    <TableRow key={action.id}>
                      <TableCell>{action.id}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateAction(action.id, action.action)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAction(action.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            </div>

            {/* Values Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Indicator Values</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddNewItem('value')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Value
                </Button>
              </div>
              {newItem?.type === 'value' ? (
                <div className="flex gap-2 mb-4">
                  <Input
                    type="number"
                    value={newItem.value as number}
                    onChange={(e) => setNewItem({ ...newItem, value: parseFloat(e.target.value) })}
                    placeholder="Enter value"
                  />
                  <Button onClick={handleSaveNewItem}>Save</Button>
                  <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                </div>
              ) : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {getData<IndicatorValue>(indicatorValues).map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{value.id}</TableCell>
                      <TableCell>{value.value}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUpdateValue(value.id, value.value)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteValue(value.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
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
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordModal(false)}
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
                              Error loading transactions
                            </TableCell>
                          </TableRow>
                        ) : transactions?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              No transactions found
                            </TableCell>
                          </TableRow>
                        ) : (
                          transactions?.map((transaction) => (
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
    </div>
  )
}
