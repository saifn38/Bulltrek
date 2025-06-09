import { Button } from "@/components/ui/button"
import { Plus, X } from 'lucide-react'


export function TradersComparison() {
  return (
    <div className="w-full max-w-7xl rounded-lg bg-[#F8F9FC] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Traders Comparison</h2>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md bg-white">
            <button className="rounded-l-md bg-[#6D1C43] px-4 py-2 text-sm text-white">
              Futures
            </button>
            <button className="rounded-r-md px-4 py-2 text-sm text-gray-600">
              Spot
            </button>
          </div>
          <Button className="bg-[#F79009] hover:bg-[#F79009]/90 text-sm h-9">
            <Plus className="mr-2 h-4 w-4" /> Add Traders
          </Button>
        </div>
      </div>
      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="w-[200px] p-4">
                <div className="text-sm">Traders</div>
              </td>
              {Array.from({ length: 4 }).map((_, i) => (
                <td key={i} className="border-l p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200" />
                      <span className="text-sm">Lorem Name</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan={5} className="border-b bg-white p-4">
                <div className="text-sm font-medium">Basic Information</div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4">
                <div className="text-sm text-gray-500">Total Assets</div>
              </td>
              <td className="border-l p-4">
                <div className="text-sm">49,9029</div>
              </td>
              <td className="border-l p-4">
                <div className="text-sm">—</div>
              </td>
              <td className="border-l p-4">
                <div className="text-sm">—</div>
              </td>
              <td className="border-l p-4">
                <div className="text-sm">—</div>
              </td>
            </tr>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">
                  <div className="text-sm text-gray-500">Total Trades</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">646</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">3,578</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">367</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">180</div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="border-b bg-white p-4">
                <div className="text-sm font-medium">Trading Data</div>
              </td>
            </tr>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className={i !== 5 ? "border-b" : ""}>
                <td className="p-4">
                  <div className="text-sm text-gray-500">Total Trades</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">646</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">3,578</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">367</div>
                </td>
                <td className="border-l p-4">
                  <div className="text-sm">180</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

