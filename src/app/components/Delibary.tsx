'use client';

import Locations from '../../data/AddressData';
import { DeliveryDetails } from '../order-now/page';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FiMapPin, FiPhone, FiUser, FiMail, FiInfo } from 'react-icons/fi';

type DivisionKeys = keyof typeof Locations.Bangladesh;
type CityKeys<T extends DivisionKeys> = keyof (typeof Locations.Bangladesh)[T];
type AreaKeys<T extends DivisionKeys, C extends CityKeys<T>> = keyof (typeof Locations.Bangladesh)[T][C];

export type AddressFormHandle = {
  validateForm: () => boolean;
};

type Props = {
  form: DeliveryDetails;
  setForm: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
};

const AddressForm = forwardRef<AddressFormHandle, Props>(({ form, setForm }, ref) => {
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryDetails, string>>>({});

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  const handleChange = (field: keyof DeliveryDetails, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "division") {
        updated.city = "";
        updated.area = "";
        updated.road = "";
      } else if (field === "city") {
        updated.area = "";
        updated.road = "";
      } else if (field === "area") {
        updated.road = "";
      }
      return updated;
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!form.division) newErrors.division = "Division is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.area) newErrors.area = "Area is required";
    if (!form.road) newErrors.road = "Road is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const divisions = Object.keys(Locations.Bangladesh) as DivisionKeys[];
  const divisionKey = form.division as DivisionKeys;
  const cities = divisions.includes(divisionKey)
    ? (Object.keys(Locations.Bangladesh[divisionKey]) as CityKeys<typeof divisionKey>[])
    : [];

  const cityKey = form.city as CityKeys<typeof divisionKey>;
  const areas = divisions.includes(divisionKey) && cityKey in Locations.Bangladesh[divisionKey]
    ? (Object.keys(Locations.Bangladesh[divisionKey][cityKey]) as AreaKeys<typeof divisionKey, typeof cityKey>[])
    : [];

  const areaKey = form.area as AreaKeys<typeof divisionKey, typeof cityKey>;
  const roads = divisions.includes(divisionKey) &&
    cityKey in Locations.Bangladesh[divisionKey] &&
    areaKey in Locations.Bangladesh[divisionKey][cityKey]
    ? Locations.Bangladesh[divisionKey][cityKey][areaKey].roads
    : [];

  const deliveryCost = divisions.includes(divisionKey) &&
    cityKey in Locations.Bangladesh[divisionKey] &&
    areaKey in Locations.Bangladesh[divisionKey][cityKey]
    ? Locations.Bangladesh[divisionKey][cityKey][areaKey].deliveryCost
    : null;

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FiMapPin className="mr-2 text-blue-500" />
        Delivery Address
      </h2>

      <div className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`pl-10 p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`pl-10 p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="pl-10 p-2.5 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Location Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <div className="relative">
              <select
                className="p-2.5 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 cursor-not-allowed appearance-none"
                value="Bangladesh"
                disabled
              >
                <option value="Bangladesh">Bangladesh</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
            <div className="relative">
              <select
                className={`p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                  errors.division ? "border-red-500" : "border-gray-300"
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
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <div className="relative">
              <select
                className={`p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                disabled={!form.division}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
            <div className="relative">
              <select
                className={`p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                  errors.area ? "border-red-500" : "border-gray-300"
                }`}
                value={form.area}
                onChange={(e) => handleChange('area', e.target.value)}
                disabled={!form.city}
              >
                <option value="">Select Area</option>
                {areas.map((a) => (
                  <option key={String(a)} value={String(a)}>
                    {String(a)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Road/Block *</label>
            <div className="relative">
              <select
                className={`p-2.5 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                  errors.road ? "border-red-500" : "border-gray-300"
                }`}
                value={form.road}
                onChange={(e) => handleChange('road', e.target.value)}
                disabled={!form.area}
              >
                <option value="">Select Road/Block</option>
                {roads.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.road && <p className="mt-1 text-sm text-red-600">{errors.road}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiInfo className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="House #, Apartment #, Landmark, etc."
                value={form.road}
                onChange={(e) => handleChange('road', e.target.value)}
                className="pl-10 p-2.5 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Optional: Any additional information to help locate your address</p>
          </div>
        </div>

        {deliveryCost !== null && (
          <div className="p-3 bg-blue-50 rounded-md text-right">
            <span className="text-sm font-medium text-gray-700">Estimated Delivery Cost: </span>
            <span className="text-lg font-bold text-blue-600">৳{deliveryCost}</span>
          </div>
        )}
      </div>
    </div>
  );
});

AddressForm.displayName = 'AddressForm';

export default AddressForm;