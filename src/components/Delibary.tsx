'use client';

import React from 'react';

const data = {
  UAE: {
    Dubai: {
      'Dubai City': {
        Deira: ['Al Rigga', 'Naif', 'Al Muraqqabat'],
        'Bur Dubai': ['Al Fahidi', 'Al Karama', 'Oud Metha'],
      },
      'Jebel Ali': {
        Industrial: ['Jebel Ali Industrial 1', 'Jebel Ali Industrial 2'],
        Village: ['Jebel Ali Village', 'Discovery Gardens'],
      },
    },
    Sharjah: {
      'Sharjah City': {
        Rollah: ['Al Arouba', 'Bank Street'],
        'Al Nahda': ['Al Nahda 1', 'Al Nahda 2'],
      },
    },
  },
};

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

const AddressForm: React.FC<Props> = ({ form, setForm }) => {
  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => {
      const updated = { ...prev, [field]: value };

      if (field === 'emirate') {
        updated.city = '';
        updated.district = '';
        updated.road = '';
      } else if (field === 'city') {
        updated.district = '';
        updated.road = '';
      } else if (field === 'district') {
        updated.road = '';
      }

      return updated;
    });
  };

  const emirates = Object.keys(data['UAE']);
  const cities = form.emirate ? Object.keys(data['UAE'][form.emirate] || {}) : [];
  const districts =
    form.emirate && form.city
      ? Object.keys(data['UAE'][form.emirate]?.[form.city] || {})
      : [];
  const roads =
    form.emirate && form.city && form.district
      ? data['UAE'][form.emirate]?.[form.city]?.[form.district] || []
      : [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold"> Delivery Address</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="p-2 border rounded w-full col-span-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          className="p-2 border rounded w-full bg-gray-100 text-gray-500 cursor-not-allowed"
          value="UAE"
          disabled
        >
          <option value="UAE">UAE</option>
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.emirate}
          onChange={(e) => handleChange('emirate', e.target.value)}
        >
          <option value="">Select Emirate</option>
          {emirates.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.city}
          onChange={(e) => handleChange('city', e.target.value)}
          disabled={!form.emirate}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.district}
          onChange={(e) => handleChange('district', e.target.value)}
          disabled={!form.city}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full sm:col-span-2"
          value={form.road}
          onChange={(e) => handleChange('road', e.target.value)}
          disabled={!form.district}
        >
          <option value="">Select Road</option>
          {roads.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddressForm;
