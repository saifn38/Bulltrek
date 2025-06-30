import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, X } from "lucide-react";

interface ApiConnectProps {
  userId?: string;
}

const PLATFORMS = [
  { value: "binance", label: "Binance", requiresPassPhrase: false },
  { value: "coinbase", label: "Coinbase", requiresPassPhrase: true },
  { value: "kucoin", label: "KuCoin", requiresPassPhrase: true },
  { value: "bybit", label: "Bybit", requiresPassPhrase: false },
];

export const ApiConnect: React.FC<ApiConnectProps> = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [platform, setPlatform] = useState("");
  const [apiName, setApiName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [apis, setApis] = useState([
    // Example/mock data
    {
      id: 1,
      platform: "Binance",
      apiName: "Main Key",
      apiKey: "****abcd",
      apiSecret: "****1234",
      passPhrase: "",
    },
  ]);

  const selectedPlatform = PLATFORMS.find((p) => p.value === platform);

  const handleAddApi = () => {
    setApis([
      ...apis,
      {
        id: Date.now(),
        platform: selectedPlatform?.label || platform,
        apiName,
        apiKey: "****" + apiKey.slice(-4),
        apiSecret: "****" + apiSecret.slice(-4),
        passPhrase: selectedPlatform?.requiresPassPhrase ? passPhrase : "",
      },
    ]);
    setShowModal(false);
    setPlatform("");
    setApiName("");
    setApiKey("");
    setApiSecret("");
    setPassPhrase("");
  };

  const handleDelete = (id: number) => {
    setApis(apis.filter((api) => api.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[180px]">
        {apis.length === 0 ? (
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 text-[#4A1C24] border-dashed border-2 border-[#4A1C24] rounded-lg py-8 px-6"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-8 h-8" />
            <span className="font-medium">Add Brokers/Exchanges</span>
          </Button>
        ) : (
          <>
            <div className="flex justify-end w-full mb-2">
              <Button
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C] rounded"
                onClick={() => setShowModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Brokers/Exchanges
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>API Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>API Secret</TableHead>
                    <TableHead>Pass Phrase</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apis.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell>{api.platform}</TableCell>
                      <TableCell>{api.apiName}</TableCell>
                      <TableCell>{api.apiKey}</TableCell>
                      <TableCell>{api.apiSecret}</TableCell>
                      <TableCell>{api.passPhrase || "-"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(api.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
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
                  placeholder="Enter API Key"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">API Key</label>
                <Input
                  placeholder="Enter API Secret"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  {selectedPlatform?.requiresPassPhrase ? "API Secret" : "API Secret"}
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
                    placeholder="Enter API Secret"
                    value={passPhrase}
                    onChange={(e) => setPassPhrase(e.target.value)}
                  />
                </div>
              )}
            </div>
            <Button
              className="w-full bg-[#4A1C24] text-white hover:bg-[#3A161C] rounded"
              onClick={handleAddApi}
              disabled={!platform || !apiName || !apiKey || !apiSecret || (selectedPlatform?.requiresPassPhrase && !passPhrase)}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};