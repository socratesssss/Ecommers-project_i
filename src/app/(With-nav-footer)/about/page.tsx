'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

// Data structures
const contactInfo = {
  email: {
    icon: <Mail className="w-5 h-5 text-[#0284c7]" />,
    title: "Email",
    lines: ["support@yourstore.com", "sales@yourstore.com"]
  },
  phone: {
    icon: <Phone className="w-5 h-5 text-[#0f766e]" />,
    title: "Phone",
    lines: ["+1 (555) 123-4567", "Mon - Fri: 9am - 6pm"]
  },
  location: {
    icon: <MapPin className="w-5 h-5 text-[#c026d3]" />,
    title: "Location",
    lines: ["123 Commerce Street", "New York, NY 10001"]
  },
  hours: {
    icon: <Clock className="w-5 h-5 text-[#ea580c]" />,
    title: "Business Hours",
    lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10 AM - 4 PM", "Sun: Closed"]
  }
};

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Most orders ship within 1-2 business days and arrive in 3-5 business days."
  },
  {
    question: "What is your return policy?",
    answer: "Returns are accepted within 30 days of purchase for unused items in original condition."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide. Delivery times and fees vary by country."
  },
  {
    question: "How can I track my order?",
    answer: "You'll receive a tracking number via email once your order ships."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay."
  }
];

const pageContent = {
  title: "Contact Us",
  subtitle: "Got questions or feedback? We're just a message away."
};

// Components
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

// Main Page Component
export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0f766e] mb-4">
          {pageContent.title}
        </h1>
        <p className="mt-4 text-[#555] text-xl max-w-2xl mx-auto">
          {pageContent.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    

        {/* Contact Info + FAQs */}
        <div className="space-y-8">
          <div className="bg-white p-8 shadow-xl rounded-2xl border border-[#bae6fd] transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">Contact Info</h2>
            <div className="space-y-6">
              {Object.values(contactInfo).map((item, index) => (
                <ContactItem 
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  lines={item.lines}
                />
              ))}
            </div>
          </div>

         
        </div>
         <div className="bg-white p-8 shadow-xl rounded-2xl border border-[#fcd34d] transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}