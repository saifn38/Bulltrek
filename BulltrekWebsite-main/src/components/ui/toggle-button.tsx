interface ToggleButtonProps {
    active?: boolean
    children: React.ReactNode
    onClick?: () => void
  }
  
  export function ToggleButton({ active, children, onClick }: ToggleButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-[#FFF7ED] text-[#4A1D2F]"
            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
        }`}
      >
        {children}
      </button>
    )
  }
  
  