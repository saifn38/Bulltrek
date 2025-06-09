import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";

export default function StrategyBuilder({ userId }: { userId?: number }) {
  const [conditions, setConditions] = useState<any[]>([]);
  const [indicator, setIndicator] = useState("");
  const [action, setAction] = useState("");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [quantity, setQuantity] = useState("");
  const [asset, setAsset] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [operators, setOperators] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const addCondition = () => {
    if (indicator && action && value) {
      setConditions([...conditions, { indicator, action, value }]);
      setIndicator("");
      setAction("");
      setValue("");
    }
  };

  const handleCreateStrategy = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) throw new Error("No auth token found");
      const payload = {
        user_id: userId || 1, // fallback for demo
        name,
        conditions,
        operators,
        direction,
        quantity: parseFloat(quantity),
        asset,
        start_time: startTime,
        end_time: endTime,
      };
      await apiClient.post("/api/v1/strategies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Strategy created successfully!");
      setConditions([]);
      setName("");
      setDirection("");
      setQuantity("");
      setAsset("");
      setStartTime("");
      setEndTime("");
      setOperators([]);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to create strategy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-8">
        <div className="mb-6">
          <div className="mb-2 font-semibold">Strategy Name</div>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter strategy name" />
        </div>
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-lg text-[#4A1C24]">Entry Strategy</span>
            <div className="w-4 h-4 bg-orange-400 rounded-full mt-2" />
          </div>
          <div className="flex-1 h-1 bg-orange-100 mx-2 relative">
            <div className="absolute left-0 top-0 h-1 bg-orange-300" style={{width: '50%'}} />
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-lg text-gray-400">Exit Strategy</span>
            <div className="w-4 h-4 bg-orange-100 rounded-full mt-2" />
          </div>
        </div>

        {/* Condition List */}
        {conditions.length > 0 && (
          <div className="mb-4">
            {conditions.map((cond, idx) => (
              <div key={idx} className="bg-orange-50 border border-orange-200 rounded px-4 py-2 mb-2 text-sm">
                <span className="font-semibold text-orange-700">Condition {idx+1}:</span> {cond.indicator} {cond.action} {cond.value}
              </div>
            ))}
          </div>
        )}

        {/* Condition Inputs */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <div className="mb-2 font-semibold">Indicator</div>
            <Input value={indicator} onChange={e => setIndicator(e.target.value)} placeholder="e.g. MACD" />
          </div>
          <div>
            <div className="mb-2 font-semibold">Action</div>
            <Input value={action} onChange={e => setAction(e.target.value)} placeholder="e.g. Buy" />
          </div>
          <div>
            <div className="mb-2 font-semibold">Value</div>
            <Input value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 70" />
          </div>
          <Button onClick={addCondition} className="bg-[#4A1C24] text-white hover:bg-[#3A161C]">Add Condition</Button>
        </div>

        {/* Operators */}
        <div className="mb-6">
          <div className="mb-2 font-semibold">Operators (between conditions)</div>
          <Input value={operators.join(",")} onChange={e => setOperators(e.target.value.split(",").map(s => s.trim()))} placeholder="e.g. OR, AND" />
        </div>

        {/* Direction, Quantity, Asset, Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="mb-2 font-semibold">Direction</div>
            <Input value={direction} onChange={e => setDirection(e.target.value)} placeholder="e.g. Buy or Sell" />
          </div>
          <div>
            <div className="mb-2 font-semibold">Quantity</div>
            <Input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="e.g. 0.7" type="number" />
          </div>
          <div>
            <div className="mb-2 font-semibold">Asset</div>
            <Input value={asset} onChange={e => setAsset(e.target.value)} placeholder="e.g. BTC/USD" />
          </div>
          <div>
            <div className="mb-2 font-semibold">Start Time</div>
            <Input value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="e.g. 09:18" type="time" />
          </div>
          <div>
            <div className="mb-2 font-semibold">End Time</div>
            <Input value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="e.g. 15:35" type="time" />
          </div>
        </div>

        {/* Submit Button and Status */}
        <div className="flex gap-4 items-center">
          <Button className="bg-[#4A1C24] text-white hover:bg-[#3A161C]" onClick={handleCreateStrategy} disabled={loading}>
            {loading ? "Creating..." : "Create Strategy"}
          </Button>
          {success && <span className="text-green-600 font-semibold">{success}</span>}
          {error && <span className="text-red-600 font-semibold">{error}</span>}
        </div>
      </div>
    </div>
  );
}
