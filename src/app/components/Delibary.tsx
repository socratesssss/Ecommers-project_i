'use client';
import Locations from '../../data/AddressData'; 

type UAEKeys = keyof typeof Locations.Bangladesh;
type CityKeys<T extends UAEKeys> = keyof (typeof Locations.Bangladesh)[T];
type DistrictKeys<T extends UAEKeys, C extends CityKeys<T>> = keyof (typeof Locations.Bangladesh)[T][C];

type DeliveryForm = {
  name: string;
  phone: string;
  email: string;
  country: string;
  emirate: string;
  city: string;
  district: string;
  road: string;
};

type Props = {
  form: DeliveryForm;
  setForm: React.Dispatch<React.SetStateAction<DeliveryForm>>;
};

const AddressForm: React.FC<Props> = ({ form, setForm }) => {
  const handleChange = (field: keyof DeliveryForm, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "emirate") {
        updated.city = "";
        updated.district = "";
        updated.road = "";
      } else if (field === "city") {
        updated.district = "";
        updated.road = "";
      } else if (field === "district") {
        updated.road = "";
      }
      return updated;
    });
  };

  const emirates = Object.keys(Locations.Bangladesh) as UAEKeys[];

  const emirateKey = form.emirate as UAEKeys;
  const cities = emirates.includes(emirateKey)
    ? (Object.keys(Locations.Bangladesh[emirateKey]) as CityKeys<typeof emirateKey>[])
    : [];

  const cityKey = form.city as CityKeys<typeof emirateKey>;
  const districts =
    emirates.includes(emirateKey) && cityKey in Locations.Bangladesh[emirateKey]
      ? (Object.keys(Locations.Bangladesh[emirateKey][cityKey]) as DistrictKeys<typeof emirateKey, typeof cityKey>[])
      : [];

  const districtKey = form.district as DistrictKeys<typeof emirateKey, typeof cityKey>;
  const roads =
    emirates.includes(emirateKey) &&
    cityKey in Locations.Bangladesh[emirateKey] &&
    districtKey in Locations.Bangladesh[emirateKey][cityKey]
      ? Locations.Bangladesh[emirateKey][cityKey][districtKey]
      : [];

  return (
    <div className="max-w-3xl p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold text-center">Delivery Address</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="p-2 border rounded w-full "
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          className="p-2 border rounded w-full bg-gray-100 text-gray-500 cursor-not-allowed"
          value="UAE"
          disabled
        >
          <option value="UAE">Bangladesh</option>
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.emirate}
          onChange={(e) => handleChange("emirate", e.target.value)}
        >
          <option value="">Select District</option>
          {emirates.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          disabled={!form.emirate}
        >
          <option value="">Select Sub-District</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full"
          value={form.district}
          onChange={(e) => handleChange("district", e.target.value)}
          disabled={!form.city}
        >
          <option value="">Select city</option>
          {districts.map((d) => (
            <option key={String(d)} value={String(d)}>
              {String(d)}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full sm:col-span-2"
          value={form.road}
          onChange={(e) => handleChange("road", e.target.value)}
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
