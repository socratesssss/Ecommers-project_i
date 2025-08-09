import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
function FaqItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div 
      className={`border-b border-gray-200 pb-4 mb-4 cursor-pointer transition-all duration-300 ${isOpen ? 'bg-gray-50 p-4 rounded-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-[#1f2937] flex items-center">
          <MessageSquare className="w-4 h-4 mr-2 text-[#f59e0b]" />
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#f59e0b]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#f59e0b]" />
        )}
      </div>
      {isOpen && (
        <p className="text-[#4b5563] mt-3 pl-6 animate-fadeIn">
          {answer}
        </p>
      )}
    </div>
  );
}
export default FaqItem