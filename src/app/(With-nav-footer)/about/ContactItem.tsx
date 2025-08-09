import { ReactNode } from 'react';

interface ContactItemProps {
  icon: ReactNode;
  title: string;
  lines: string[];
}

function ContactItem({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex items-start group">
      <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#1f2937] group-hover:text-[#0284c7] transition-colors duration-300">{title}</h3>
        {lines.map((line, i) => (
          <p className="text-[#4b5563] group-hover:text-[#1f2937]" key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
export default ContactItem