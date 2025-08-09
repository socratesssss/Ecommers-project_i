import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const contactInfo = {
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