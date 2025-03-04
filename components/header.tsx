import { Search, Bell, HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import eylogo from "../public/images/EY-logo.png";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
      <div className="flex items-center">
        <Image src={eylogo} alt="EY Logo" width={100} height={0} />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="h-9 w-48 rounded-md border border-gray-300 pl-9 pr-4 text-sm focus:border-[#ffe500] focus:outline-none"
          />
        </div>
        <button className="rounded-full p-1.5 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-500" />
        </button>
        <button className="rounded-full p-1.5 hover:bg-gray-100">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </button>
        <button className="rounded-full p-1.5 hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
          OK
        </div>
      </div>
    </header>
  );
}
