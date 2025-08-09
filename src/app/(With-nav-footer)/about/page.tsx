'use client';

import { useState } from 'react';
import FaqItem from './Faq';
import ContactItem from './ContactItem';
import { faqs } from '../../../data/Abouttt/Faqs';
import { contactInfo } from '../../../data/Abouttt/Contact';




const pageContent = {
  title: "Contact Us",
  subtitle: "Got questions or feedback? We're just a message away."
};





// Main Page Component
export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0f766e] mb-4">
          {pageContent.title}
        </h1>
        <p className="mt-4 text-[#555] text-xl max-w-2xl mx-auto">
          {pageContent.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
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

        {/* FAQs */}
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