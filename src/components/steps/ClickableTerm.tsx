import React from "react";
import { ADMISSION_TERMS } from "../../data/admissionSteps";
import { HelpCircle } from "lucide-react";

interface ClickableTermProps {
  termId: string;
  children?: React.ReactNode;
  onOpenTerm: (termId: string) => void;
  className?: string;
}

export const ClickableTerm: React.FC<ClickableTermProps> = ({
  termId,
  children,
  onOpenTerm,
  className = "",
}) => {
  const termData = ADMISSION_TERMS[termId];
  const displayText = children || termData?.term || termId;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenTerm(termId);
      }}
      className={`inline-flex items-center gap-1 font-black text-[#1677FF] hover:text-[#0A4EA8] bg-[#EFF6FF] hover:bg-[#DBEAFE] px-1.5 py-0.5 rounded-md border border-[#BFDBFE] hover:border-[#1677FF] transition-all cursor-pointer select-none group align-baseline my-0.5 active:translate-y-[1px] ${className}`}
      title={`Нажми, чтобы СОВА объяснила термин: "${termData?.fullTitle || displayText}"`}
    >
      <span className="underline decoration-dashed decoration-[#1677FF]/60 underline-offset-2">
        {displayText}
      </span>
      <HelpCircle className="w-3 h-3 text-[#1677FF] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform shrink-0" />
    </button>
  );
};
