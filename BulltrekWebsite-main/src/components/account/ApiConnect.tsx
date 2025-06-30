import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { brokerageService } from "@/api/brokerage";
import { toast } from "sonner";

interface ApiConnectProps {
  userId?: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

interface BrokerageConnection {
  id: number;
  brokerage_name: string;
  brokerage_api_key: string;
  brokerage_api_secret: string;
  brokerage_id: number;
  created_at: string;
  updated_at: string;
  brokerage: {
    id: number;
    name: string;
    website: string | null;
    registration_link: string | null;
    description: string | null;
    icon: string | null;
    color_code: string | null;
    brokerage_type: string | null;
    api_base_url: string | null;
    created_at: string;
    updated_at: string;
  };
}

const PLATFORMS = [
  { value: "binance", label: "Binance", requiresPassPhrase: false },
  { value: "zerodha", label: "Zerodha", requiresPassPhrase: false },
];

export const ApiConnect: React.FC<ApiConnectProps> = ({
  userId,
  showModal,
  setShowModal,
}) => {
  const [platform, setPlatform] = useState("");
  const [apiName, setApiName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [apis, setApis] = useState<BrokerageConnection[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedPlatform = PLATFORMS.find((p) => p.value === platform);

  useEffect(() => {
    async function fetchBrokerages() {
      setLoading(true);
      try {
        const res = await brokerageService.getBrokerageDetails();
        setApis(res.data.data || []);
      } catch (err) {
        setApis([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBrokerages();
  }, [userId]);

  const handleAddApi = async () => {
    try {
      await brokerageService.linkBrokerage({
        brokerage_name: platform as "zerodha" | "binance",
        brokerage_api_key: apiKey,
        brokerage_api_secret: apiSecret,
      });
      toast.success("Brokerage linked successfully!");
      setShowModal(false);
      setPlatform("");
      setApiName("");
      setApiKey("");
      setApiSecret("");
      setPassPhrase("");
      setLoading(true);
      const res = await brokerageService.getBrokerageDetails();
      setApis(res.data.data || []);
      setLoading(false);
    } catch (err: any) {
      toast.error("Failed to link brokerage.");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto w-full">
  <Table className="min-w-full text-sm">
    <TableHeader>
      <TableRow>
        <TableHead className="px-2 py-1">Platform</TableHead>
        <TableHead className="px-2 py-1">API Key</TableHead>
        <TableHead className="px-2 py-1">API Secret</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center py-6">
            Loading...
          </TableCell>
        </TableRow>
      ) : apis.length === 0 ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center py-6">
            No brokerages connected yet.
          </TableCell>
        </TableRow>
      ) : (
        apis.map((api) => (
          <TableRow key={api.id}>
            <TableCell className="px-2 py-1">
              {api.brokerage?.name || api.brokerage_name}
            </TableCell>
            <TableCell className="px-2 py-1">
              {"****" + api.brokerage_api_key.slice(-4)}
            </TableCell>
            <TableCell className="px-2 py-1">
              {"****" + api.brokerage_api_secret.slice(-4)}
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[500px] relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-center text-lg font-semibold mb-6">ADD API</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Platform name" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-1">API Name</label>
                <Input
                  placeholder="Enter API Name"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">API Key</label>
                <Input
                  placeholder="Enter API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  {selectedPlatform?.requiresPassPhrase
                    ? "API Secret"
                    : "API Secret"}
                </label>
                <Input
                  placeholder={
                    selectedPlatform?.requiresPassPhrase
                      ? "Enter Pass Phrase"
                      : "Enter API Secret"
                  }
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                />
              </div>
              {selectedPlatform?.requiresPassPhrase && (
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Pass Phrase</label>
                  <Input
                    placeholder="Enter Pass Phrase"
                    value={passPhrase}
                    onChange={(e) => setPassPhrase(e.target.value)}
                  />
                </div>
              )}
            </div>
            <Button
              className="w-full bg-[#4A1C24] text-white hover:bg-[#3A161C] rounded"
              onClick={handleAddApi}
              disabled={
                !platform ||
                !apiName ||
                !apiKey ||
                !apiSecret ||
                (selectedPlatform?.requiresPassPhrase && !passPhrase)
              }
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
