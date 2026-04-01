import React from "react";
import { Inbox } from "lucide-react";

interface Props {
  message?: string;
}

const EmptyState: React.FC<Props> = ({ message = "No data to display" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 transition-colors duration-300">
        <Inbox
          size={28}
          className="text-slate-300 dark:text-slate-600 transition-colors duration-300"
        />
      </div>
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors duration-300">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
