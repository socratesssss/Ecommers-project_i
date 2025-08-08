'use client';

import Locations from '../../data/AddressData';
import { DeliveryDetails } from '../order-now/page';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FiMapPin, FiPhone, FiUser, FiMail, FiInfo, FiChevronDown } from 'react-icons/fi';

type DivisionKeys = keyof typeof Locations.Bangladesh;
type DistrictKeys<T extends DivisionKeys> = keyof (typeof Locations.Bangladesh)[T]['districts'];

export type AddressFormHandle = {
  validateForm: () => boolean;
  getDeliveryCost: () => number | null;
};

type Props = {
  form: DeliveryDetails;
  setForm: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
  onDeliveryCostChange?: (cost: number | null) => void;
};

const AddressForm = forwardRef<AddressFormHandle, Props>(({ form, setForm, onDeliveryCostChange }, ref) => {
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryDetails, string>>>({});
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    validateForm,
    getDeliveryCost: () => deliveryCost,
  }));

  const handleChange = (field: keyof DeliveryDetails, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "division") {
        updated.district = "";
        updated.upazila = "";
      } else if (field === "district") {
        updated.upazila = "";
      }
      return updated;
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!form.phone.match(/^01[3-9]\d{8}$/)) newErrors.phone = "Invalid Bangladeshi phone number";
    if (!form.division) newErrors.division = "Division is required";
    if (!form.district) newErrors.district = "District is required";
    if (!form.upazila) newErrors.upazila = "Upazila is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate delivery cost whenever location changes
  useEffect(() => {
    if (form.division) {
      const divisionKey = form.division as DivisionKeys;
      const cost = Locations.Bangladesh[divisionKey]?.deliveryCost || null;
      setDeliveryCost(cost);
      if (onDeliveryCostChange) onDeliveryCostChange(cost);
    } else {
      setDeliveryCost(null);
      if (onDeliveryCostChange) onDeliveryCostChange(null);
    }
  }, [form.division, onDeliveryCostChange]);

  const divisions = Object.keys(Locations.Bangladesh) as DivisionKeys[];
  const divisionKey = form.division as DivisionKeys;
  const districts = divisions.includes(divisionKey)
    ? (Object.keys(Locations.Bangladesh[divisionKey].districts) as DistrictKeys<typeof divisionKey>[])
    : [];

  const districtKey = form.district as DistrictKeys<typeof divisionKey>;
  const upazilas = divisions.includes(divisionKey) && districtKey in Locations.Bangladesh[divisionKey].districts
    ? Locations.Bangladesh[divisionKey].districts[districtKey].upazilas
    : [];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
            <FiMapPin className="mr-2 text-blue-600" />
            Delivery Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">Enter your details for order delivery</p>
        </div>
        
        {deliveryCost !== null && (
          <div className="bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                Delivery Cost:
              </span>
              <span className="text-base sm:text-lg font-bold text-blue-600 whitespace-nowrap">
                ${deliveryCost.toFixed(2)}
              </span>
            </div>
            {form.district && (
              <p className="text-[10px] sm:text-xs text-blue-700 mt-1 text-right">
                {form.upazila ? `${form.upazila}, ` : ''}{form.district}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`pl-10 pr-3 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`pl-10 pr-3 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500">For order updates and receipts</p>
        </div>

        {/* Location Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-600 cursor-not-allowed appearance-none outline-none"
                value="Bangladesh"
                disabled
              >
                <option value="Bangladesh">Bangladesh</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Division *</label>
            <div className="relative">
              <select
                className={`pl-3 pr-8 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none transition-all ${
                  errors.division ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
                value={form.division}
                onChange={(e) => handleChange('division', e.target.value)}
              >
                <option value="">Select Division</option>
                {divisions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.division && <p className="mt-1.5 text-sm text-red-600">{errors.division}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">District *</label>
            <div className="relative">
              <select
                className={`pl-3 pr-8 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none transition-all ${
                  errors.district ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
                value={form.district}
                onChange={(e) => handleChange('district', e.target.value)}
                disabled={!form.division}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.district && <p className="mt-1.5 text-sm text-red-600">{errors.district}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Upazila/Thana *</label>
            <div className="relative">
              <select
                className={`pl-3 pr-8 py-2.5 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none transition-all ${
                  errors.upazila ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
                value={form.upazila}
                onChange={(e) => handleChange('upazila', e.target.value)}
                disabled={!form.district}
              >
                <option value="">Select Upazila/Thana</option>
                {upazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.upazila && <p className="mt-1.5 text-sm text-red-600">{errors.upazila}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Details (Where to Deliver)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiInfo className="text-gray-400" />
              </div>
          
<input
  type="text"
  placeholder=" Road #,House #, Building, Apartment, Landmark, etc."
  value={form.addressDetails}
  onChange={(e) => handleChange('addressDetails', e.target.value)}
  className="pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
/>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">Additional information to help locate your address</p>
          </div>
        </div>
      </div>
    </div>
  );
});

AddressForm.displayName = 'AddressForm';

export default AddressForm;