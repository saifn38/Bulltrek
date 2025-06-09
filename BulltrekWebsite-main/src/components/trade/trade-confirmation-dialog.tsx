import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Bot } from "@/hooks/useBotManagement";
import { Checkbox } from "@/components/ui/checkbox";

interface TradeConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedApi: string;
  selectedBot: Bot | null;
}

export function TradeConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  selectedApi,
  selectedBot,
}: TradeConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg flex justify-between items-center">
            <span>Confirm Trade Settings</span>
            <button 
              onClick={onClose} 
              className="text-lg font-bold"
            >
              
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          {/* Account Details Section */}
          <div className="mb-4">
            <h3 className="font-bold text-sm mb-2">Account Details</h3>
            <div className="grid grid-cols-3 gap-y-2">
              <div className="text-sm">API Connection:</div>
              <div className="text-sm col-span-2 capitalize">{selectedApi}</div>
            </div>
          </div>

          {/* Bot Details Section */}
          {selectedBot && (
            <div className="mb-4">
              <h3 className="font-bold text-sm mb-2">Bot Details</h3>
              <div className="grid grid-cols-3 gap-y-2">
                <div className="text-sm">Name:</div>
                <div className="text-sm col-span-2">{selectedBot.name}</div>
                
                <div className="text-sm">Mode:</div>
                <div className="text-sm col-span-2 capitalize">{selectedBot.mode}</div>
                
                <div className="text-sm">Execution Type:</div>
                <div className="text-sm col-span-2 capitalize">{selectedBot.execution_type}</div>
                
                {selectedBot.schedule_expression && (
                  <>
                    <div className="text-sm">Schedule:</div>
                    <div className="text-sm col-span-2">{selectedBot.schedule_expression}</div>
                  </>
                )}
                
                <div className="text-sm">Created:</div>
                <div className="text-sm col-span-2">
                  {format(new Date(selectedBot.created_at), 'dd MMM yyyy HH:mm')}
                </div>
                
                <div className="text-sm">Last Updated:</div>
                <div className="text-sm col-span-2">
                  {format(new Date(selectedBot.updated_at), 'dd MMM yyyy HH:mm')}
                </div>
              </div>
            </div>
          )}
          
          {/* Advanced Settings Section */}
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-2">Advanced Settings</h3>
            <div className="grid grid-cols-3 gap-y-2">
              <div className="text-sm">Trading Pair:</div>
              <div className="text-sm col-span-2">BTC/USDT</div>
              
              <div className="text-sm">Time Frame:</div>
              <div className="text-sm col-span-2">1 Hour</div>
            </div>
          </div>
          
          {/* Terms and Conditions */}
          <div className="flex items-center gap-2 mb-4">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              I Agree Bulltrak's Terms & Conditions, Privacy policy and disclaimers
            </label>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between gap-2">
            <Button
              variant="destructive"
              className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
            >
             Live Market 
             {/* //Run on Live Market */}
            </Button>
            
            <Button
              variant="destructive"
              className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
            >
              Edit
            </Button>
            
            <Button
              variant="destructive"
              className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
              onClick={onConfirm}
            >
              Publish
            </Button>
            
            <Button
              variant="default"
              className="bg-amber-500 hover:bg-amber-600 text-white w-1/4"
            >
              Backtest
            </Button>
          </div>
          
          <div className="text-center text-xs mt-4 text-gray-500">
            ** For Buttons see respective user **
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}