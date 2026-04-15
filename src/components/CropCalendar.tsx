import { useState } from "react";
import { Sprout, Leaf, Sun, Droplets, ChevronLeft, ChevronRight } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type CropInfo = {
  name: string;
  season: string;
  icon: string;
  sowMonth: number[];
  harvestMonth: number[];
  color: string;
};

const crops: CropInfo[] = [
  { name: "Wheat", season: "Rabi", icon: "🌾", sowMonth: [10, 11], harvestMonth: [2, 3], color: "bg-sun-light text-sun border-sun/30" },
  { name: "Rice", season: "Kharif", icon: "🍚", sowMonth: [5, 6], harvestMonth: [9, 10], color: "bg-leaf-light text-leaf border-leaf/30" },
  { name: "Cotton", season: "Kharif", icon: "☁️", sowMonth: [4, 5], harvestMonth: [9, 10, 11], color: "bg-sky-light text-sky border-sky/30" },
  { name: "Tomato", season: "Year-round", icon: "🍅", sowMonth: [0, 1, 6, 7], harvestMonth: [3, 4, 9, 10], color: "bg-destructive/10 text-destructive border-destructive/20" },
  { name: "Mustard", season: "Rabi", icon: "🌼", sowMonth: [9, 10], harvestMonth: [1, 2], color: "bg-sun-light text-sun border-sun/30" },
  { name: "Sugarcane", season: "Year-round", icon: "🎋", sowMonth: [1, 2, 9, 10], harvestMonth: [0, 1, 11], color: "bg-leaf-light text-leaf border-leaf/30" },
  { name: "Maize", season: "Kharif", icon: "🌽", sowMonth: [5, 6], harvestMonth: [8, 9], color: "bg-sun-light text-sun border-sun/30" },
  { name: "Onion", season: "Rabi", icon: "🧅", sowMonth: [10, 11], harvestMonth: [3, 4], color: "bg-accent text-accent-foreground border-border" },
];

export default function CropCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [filter, setFilter] = useState<"all" | "sow" | "harvest">("all");

  const filteredCrops = crops.filter((crop) => {
    if (filter === "sow") return crop.sowMonth.includes(selectedMonth);
    if (filter === "harvest") return crop.harvestMonth.includes(selectedMonth);
    return crop.sowMonth.includes(selectedMonth) || crop.harvestMonth.includes(selectedMonth);
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <h2 className="text-lg mb-1">Crop Calendar</h2>
        <p className="text-xs text-muted-foreground">Know what to sow & harvest each month</p>
      </div>

      {/* Month Selector */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setSelectedMonth((p) => (p - 1 + 12) % 12)} className="size-8 rounded-lg bg-card border flex items-center justify-center">
            <ChevronLeft className="size-4" />
          </button>
          <span className="font-semibold text-lg">{months[selectedMonth]} 2025</span>
          <button onClick={() => setSelectedMonth((p) => (p + 1) % 12)} className="size-8 rounded-lg bg-card border flex items-center justify-center">
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {months.map((m, i) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                i === selectedMonth ? "bg-primary text-primary-foreground" : "bg-card border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="px-4 flex gap-2 mb-4">
        {(["all", "sow", "harvest"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === f ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "🌱 All" : f === "sow" ? "🌰 Sow" : "🌾 Harvest"}
          </button>
        ))}
      </div>

      {/* Crops */}
      <div className="px-4 pb-4 space-y-3">
        {filteredCrops.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Leaf className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No crops for this month with the selected filter.</p>
          </div>
        ) : (
          filteredCrops.map((crop) => {
            const isSow = crop.sowMonth.includes(selectedMonth);
            const isHarvest = crop.harvestMonth.includes(selectedMonth);
            return (
              <div key={crop.name} className={`border rounded-xl p-4 ${crop.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{crop.name}</div>
                      <div className="text-xs opacity-75">{crop.season} Season</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {isSow && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        Sow
                      </span>
                    )}
                    {isHarvest && (
                      <span className="px-2 py-0.5 rounded-full bg-sun/20 text-sun text-xs font-medium">
                        Harvest
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  {months.map((m, i) => (
                    <div
                      key={m}
                      className={`h-2 flex-1 rounded-full ${
                        crop.sowMonth.includes(i)
                          ? "bg-primary/60"
                          : crop.harvestMonth.includes(i)
                          ? "bg-sun/60"
                          : "bg-foreground/10"
                      }`}
                      title={`${m}: ${crop.sowMonth.includes(i) ? "Sow" : crop.harvestMonth.includes(i) ? "Harvest" : ""}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-[10px] opacity-50">
                  <span>J</span><span>D</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
