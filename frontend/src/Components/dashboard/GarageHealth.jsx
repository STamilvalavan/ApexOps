import HealthGauge from "./HealthGauge";

export default function GarageHealth() {

  const healthStats = [
    { label: "Engine Health", value: 92 },
    { label: "Chain Condition", value: 78 },
    { label: "Tyre Wear", value: 64 },
    { label: "Battery Level", value: 88 }
  ];

  return (

    <div className="bg-[#020617] border border-gray-800 rounded-xl p-6">

      <h3 className="text-lg mb-6">
        Garage Health
      </h3>

      <div className="grid grid-cols-2 gap-6">

        {healthStats.map((item, i) => (

          <HealthGauge
            key={i}
            label={item.label}
            value={item.value}
          />

        ))}

      </div>

    </div>

  );
}