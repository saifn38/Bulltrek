import React from "react";
import { Button } from "./ui/button";
import { Bell, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectChange = (path: string) => {
    navigate(path);
  };

  return (
    <header className="border-b bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/logo.svg" alt="Builtrek" className="h-8" />
            <nav className="flex items-center gap-6">
              <Link to="/dashboard">Dashboard</Link>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[100px] truncate border-none">
                  <SelectValue placeholder="Trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/trade">Trade</SelectItem>
                  <SelectItem value="/indie-lesi">Indy Lesi</SelectItem>
                  <SelectItem value="/indie-trend">Indy Trend</SelectItem>
                  <SelectItem value="/growth-dca">Growth Dca</SelectItem>
                  <SelectItem value="/price-action">Price Action</SelectItem>
                  <SelectItem value="/human-grid">Human Grid</SelectItem>
                  <SelectItem value="/smart-grid">Smart Grid</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[100px] border-none">
                  <SelectValue placeholder="Analysis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/trading-report">Reports</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="w-[130px] border-none">
                  <SelectValue placeholder="Copy Trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/copy-trade">Copy Trade</SelectItem>
                  <SelectItem value="/copy-trade-1">Copy Trade 1</SelectItem>
                  <SelectItem value="/copy-trade-2">Copy Trade 2</SelectItem>
                  <SelectItem value="/copy-trade-3">Copy Trade 3</SelectItem>
                  <SelectItem value="/trader-overview">
                    Trader Overview
                  </SelectItem>
                  <SelectItem value="/diverse-follow">
                    Diverse Follow
                  </SelectItem>
                  <SelectItem value="/smart-copy">Smart Copy</SelectItem>
                  <SelectItem value="/traders-comparison">
                    Traders Comparison
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[130px] border-none">
                  <SelectValue placeholder="Market Place" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/market-place">Market Place</SelectItem>
                  <SelectItem value="/pricing">Pricing</SelectItem>
                  <SelectItem value="/payment">Payment</SelectItem>
                </SelectContent>
              </Select>
              <Link to="/support">Support</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            <div
              className="h-8 w-8 rounded-full bg-gray-200"
              onClick={() => navigate("/account ")}
            />
            <Button
              className="bg-[#4A0D0D] text-white rounded-2xl hover:bg-[#3A0808]"
              onClick={() => navigate("/tutorial")}
            >
              Tutorial
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
