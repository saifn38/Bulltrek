import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/apiClient";

const STAGES = [
  "indicator",         // 1. Indicator
  "indicatorAction",   // 2. Indicator Action
  "value",             // 3. Value
  "direction",         // 4. Direction
  "quantity",          // 5. Quantity
  "asset",             // 6. Asset
] as const;
type Stage = typeof STAGES[number];

const API_ENDPOINTS: Record<Stage, string> = {
  indicator: "/api/v1/indicators",
  indicatorAction: "/api/v1/indicator-actions",
  value: "/api/v1/values",
  direction: "/api/v1/directions",
  quantity: "/api/v1/quantities",
  asset: "/api/v1/assets",
};

function getOptionLabel(stage: Stage, option: any) {
  switch (stage) {
    case "direction": return option.direction;
    case "quantity": return option.quantity;
    case "asset": return option.symbol;
    case "indicator": return option.name;
    case "indicatorAction": return option.action;
    case "value": return option.value;
    default: return option.name || "";
  }
}

export default function StrategyBuilder({ userId, onClose }: { userId?: number; onClose?: () => void }) {
  const [step, setStep] = useState<"entry" | "exit">("entry");
  const [stageIdx, setStageIdx] = useState(0);
  const [options, setOptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [entryStrategy, setEntryStrategy] = useState<any[]>([]);
  const [exitStrategy, setExitStrategy] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch options for the current stage
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const endpoint = API_ENDPOINTS[STAGES[stageIdx]];
        const res = await apiClient.get(endpoint);
        setOptions(res.data?.data || []);
      } catch {
        setOptions([]);
      }
      setLoading(false);
    };
    fetchOptions();
  }, [stageIdx, step]);

  // Handle selection at each stage
  const handleSelect = (option: any) => {
    setSelected(prev => [...prev, option]);
    if (stageIdx < STAGES.length - 1) {
      setStageIdx(stageIdx + 1);
    } else {
      // End of stage: save strategy and reset for next (entry/exit)
      if (step === "entry") {
        setEntryStrategy(selected.concat(option));
        setSelected([]);
        setStageIdx(0);
        setStep("exit");
      } else {
        setExitStrategy(selected.concat(option));
        setSelected([]);
        setStageIdx(0);
      }
    }
  };

  // Remove a selected token
  const handleRemove = (idx: number) => {
    setSelected(selected.slice(0, idx));
    setStageIdx(idx);
  };

  // Build readable sentence
  const buildSentence = (arr: any[]) =>
    arr.map((opt, idx) => (
      <span
        key={idx}
        className="inline-flex items-center bg-[#F3E8E8] text-[#4A0D0D] rounded px-3 py-1 mr-2 mb-2 text-base font-medium"
        style={{ borderBottom: "2px solid #4A0D0D" }}
      >
        {getOptionLabel(STAGES[idx], opt)}
      </span>
    ));

  // Build current sentence (with remove buttons)
  const buildCurrentSentence = () =>
    selected.map((opt, idx) => (
      <span
        key={idx}
        className="inline-flex items-center bg-[#F3E8E8] text-[#4A0D0D] rounded px-3 py-1 mr-2 mb-2 text-base font-medium"
        style={{ borderBottom: "2px solid #7B2323" }}
      >
        {getOptionLabel(STAGES[idx], opt)}
        <button
          className="ml-2 text-xs text-[#7B2323] hover:text-red-400"
          onClick={() => handleRemove(idx)}
          tabIndex={-1}
        >
          ×
        </button>
      </span>
    ));

  // Submit both strategies
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      await apiClient.post("/api/v1/strategies", {
        user_id: userId || 1,
        entry_strategy: entryStrategy.map((opt, idx) => ({
          stage: STAGES[idx],
          value: getOptionLabel(STAGES[idx], opt),
        })),
        exit_strategy: exitStrategy.map((opt, idx) => ({
          stage: STAGES[idx],
          value: getOptionLabel(STAGES[idx], opt),
        })),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onClose) onClose();
    } catch (err) {
      alert("Failed to create strategy");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        {onClose && (
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-[#4A0D0D]"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex flex-col items-center flex-1">
            <span className={`font-semibold text-lg ${step === "entry" ? "text-[#4A0D0D]" : "text-gray-400"}`}>Entry Strategy</span>
            <div className={`w-4 h-4 ${step === "entry" ? "bg-[#4A0D0D]" : "bg-maroon-100"} rounded-full mt-2`} />
          </div>
          <div className="flex-1 h-1 bg-maroon-100 mx-2 relative">
            <div className="absolute left-0 top-0 h-1 bg-[#7B2323]" style={{ width: step === "entry" ? "50%" : "100%" }} />
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className={`font-semibold text-lg ${step === "exit" ? "text-[#4A0D0D]" : "text-gray-400"}`}>Exit Strategy</span>
            <div className={`w-4 h-4 ${step === "exit" ? "bg-[#4A0D0D]" : "bg-maroon-100"} rounded-full mt-2`} />
          </div>
        </div>

        {/* Input-like sentence builder */}
        <div className="mb-6">
          <div className="text-lg text-[#4A0D0D] mb-2">
            {step === "entry" ? "Build your Entry Strategy" : "Build your Exit Strategy"}
          </div>
          <div className="min-h-[48px] flex flex-wrap items-center border-b border-[#4A0D0D] pb-2 bg-white px-2">
            {buildCurrentSentence()}
            {stageIdx < STAGES.length && (
              <span className="text-gray-400 italic">
                {STAGES[stageIdx].charAt(0).toUpperCase() + STAGES[stageIdx].slice(1)}...
              </span>
            )}
          </div>
        </div>

        {/* Option Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {loading ? (
            <span className="text-[#4A0D0D]">Loading...</span>
          ) : options.length === 0 ? (
            <span className="text-[#4A0D0D]">No options available.</span>
          ) : (
            options.map(option => (
              <button
                key={option.id}
                type="button"
                className="px-4 py-2 rounded border bg-[#F3E8E8] text-[#4A0D0D] border-[#7B2323] hover:bg-[#4A0D0D] hover:text-white transition"
                onClick={() => handleSelect(option)}
              >
                {getOptionLabel(STAGES[stageIdx], option)}
              </button>
            ))
          )}
        </div>

        {/* Show completed strategies */}
        {entryStrategy.length === STAGES.length && (
          <div className="mb-2 text-green-700">
            <b>Entry Strategy:</b> {buildSentence(entryStrategy)}
          </div>
        )}
        {exitStrategy.length === STAGES.length && (
          <div className="mb-2 text-blue-700">
            <b>Exit Strategy:</b> {buildSentence(exitStrategy)}
          </div>
        )}

        {/* Submit Button */}
        {entryStrategy.length === STAGES.length && exitStrategy.length === STAGES.length && (
          <Button className="bg-[#4A0D0D] text-white hover:bg-[#7B2323] px-8 mt-4" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Create Strategy"}
          </Button>
        )}
      </div>
    </div>
  );
}
