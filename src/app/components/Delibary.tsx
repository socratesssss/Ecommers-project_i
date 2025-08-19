'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FiMapPin, FiPhone, FiUser, FiMail } from 'react-icons/fi';
  import {USStates} from "../../data/AddressData"; // adjust path

export type AddressFormHandle = {
  validateForm: () => boolean;
};

export type DeliveryDetails = {
  name: string;
  phone: string; 
  email?: string;
    country: string;
  state: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  addressLine2?: string;
  orderNotes?: string;
   deliveryCost:number;
};

type Props = {
  form: DeliveryDetails;
  setForm: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
};





const AddressForm = forwardRef<AddressFormHandle, Props>(({ form, setForm }, ref) => {
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryDetails, string>>>({});

  const handleChange = (field: keyof DeliveryDetails, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.state.trim()) newErrors.state = 'State/Province is required';
    if (!form.city.trim()) newErrors.city = 'City/Town is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
    if (!form.streetAddress.trim()) newErrors.streetAddress = 'Street Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateForm
  }));

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-5">
      <h2 className="text-lg font-bold flex items-center">
        <FiMapPin className="mr-2 text-blue-600" /> Delivery Information
      </h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium">Full Name *</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            className={`pl-10 pr-3 py-2.5 border rounded-lg w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="John Smith"
          />
        </div>
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium">Phone *</label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className={`pl-10 pr-3 py-2.5 border rounded-lg w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="+1 555-123-4567"
          />
        </div>
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            className="pl-10 pr-3 py-2.5 border rounded-lg w-full border-gray-300"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* State / Province */}
  

{/* State / Province */}
<div>
  <label className="block text-sm font-medium">State / Province *</label>
  <select
    value={form.state}
    onChange={(e) => {
      const selectedState = USStates.find(s => s.name === e.target.value);
      handleChange("state", e.target.value);
      if (selectedState) {
        setForm(prev => ({ ...prev, deliveryCost: selectedState.deliveryCost }));
      }
    }}
    className={`px-3 py-2.5 border rounded-lg w-full ${
      errors.state ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option className='h-8 w-36' value="">Select State</option>
    {USStates.map((state) => (
      <option key={state.name} value={state.name}>
        {state.name}
      </option>
    ))}
  </select>
  {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
</div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium">City / Town *</label>
        <input
          type="text"
          value={form.city}
          onChange={e => handleChange('city', e.target.value)}
          className={`px-3 py-2.5 border rounded-lg w-full ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
      </div>

      {/* Postal Code */}
      <div>
        <label className="block text-sm font-medium">Postal Code *</label>
        <input
          type="text"
          value={form.postalCode}
          onChange={e => handleChange('postalCode', e.target.value)}
          className={`px-3 py-2.5 border rounded-lg w-full ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.postalCode && <p className="text-sm text-red-600">{errors.postalCode}</p>}
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-sm font-medium">Street Address *</label>
        <input
          type="text"
          value={form.streetAddress}
          onChange={e => handleChange('streetAddress', e.target.value)}
          className={`px-3 py-2.5 border rounded-lg w-full ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="123 Main St"
        />
        {errors.streetAddress && <p className="text-sm text-red-600">{errors.streetAddress}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block text-sm font-medium">Address Line 2 (Optional)</label>
        <input
          type="text"
          value={form.addressLine2}
          onChange={e => handleChange('addressLine2', e.target.value)}
          className="px-3 py-2.5 border rounded-lg w-full border-gray-300"
          placeholder="Apartment, suite, etc."
        />
      </div>

      {/* Order Notes */}
      <div>
        <label className="block text-sm font-medium">Order Notes (Optional)</label>
        <textarea
          value={form.orderNotes}
          onChange={e => handleChange('orderNotes', e.target.value)}
          className="px-3 py-2.5 border rounded-lg w-full border-gray-300"
          placeholder="Special delivery instructions..."
        />
      </div>
    </div>
  );
});

AddressForm.displayName = 'AddressForm';
export default AddressForm;
