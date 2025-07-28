'use client';

import Locations from '../../data/AddressData';
import { DeliveryDetails } from '../order-now/page';

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

type DivisionKeys = keyof typeof Locations.Bangladesh;
type CityKeys<T extends DivisionKeys> = keyof (typeof Locations.Bangladesh)[T];
type AreaKeys<T extends DivisionKeys, C extends CityKeys<T>> = keyof (typeof Locations.Bangladesh)[T][C];

// Expose validateForm to parent
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
    if (!form.name.trim()) newErrors.name = "Full Name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required."
    if (!form.division) newErrors.division = "Division is required.";
    if (!form.city) newErrors.city = "City is required.";
    if (!form.area) newErrors.area = "Area is required.";
    if (!form.road) newErrors.road = "Road is required.";
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
    <div className="max-w-3xl p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold text-center">Delivery Address</h2>

      <div className="grid grid-cols-1 gap-4">
      <div>
          <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="p-2 border rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
          <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="p-2 border rounded w-full"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

      </div>
       <div>
         <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="p-2 border rounded w-full"
        />
       </div>
       
      </div>

      <div className="grid grid-cols-2 gap-4">
      <div>
          <select
          className="p-2 border rounded w-full bg-gray-100 text-gray-500 cursor-not-allowed"
          value="Bangladesh"
          disabled
        >
          <option value="Bangladesh">Bangladesh</option>
        </select>
      </div>

    <div>
          <select
          className="p-2 border rounded w-full"
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
        {errors.division && <p className="text-red-500 text-sm mt-1 col-span-2">{errors.division}</p>}
    </div>

  <div>
          <select
          className="p-2 border rounded w-full"
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
        {errors.city && <p className="text-red-500 text-sm mt-1 col-span-2">{errors.city}</p>}
  </div>
<div>
  
        <select
          className="p-2 border rounded w-full"
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
        {errors.area && <p className="text-red-500 text-sm mt-1 col-span-2">{errors.area}</p>}
</div>

       <div>
         <select
          className="p-2 border rounded w-full sm:col-span-2"
          value={form.road}
          onChange={(e) => handleChange('road', e.target.value)}
          disabled={!form.area}
        >
          <option value="">Select Road</option>
          {roads.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.road && <p className="text-red-500 text-sm mt-1 col-span-2">{errors.road}</p>}
       </div>

        {deliveryCost !== null && (
          <div className="col-span-2 text-right text-sm text-gray-700">
            Delivery Cost: ৳{deliveryCost}
          </div>
        )}
      </div>
    </div>
  );
});

AddressForm.displayName = 'AddressForm';

export default AddressForm;