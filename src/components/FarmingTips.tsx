import { useState } from "react";
import { Leaf, Bug, Droplets, FlaskConical, Sprout, Sun, ChevronRight } from "lucide-react";

type TipCategory = {
  id: string;
  label: string;
  icon: typeof Leaf;
  color: string;
  tips: { title: string; summary: string; detail: string }[];
};

const categories: TipCategory[] = [
  {
    id: "soil",
    label: "Soil Health",
    icon: Sprout,
    color: "bg-earth-light text-earth",
    tips: [
      { title: "Test Your Soil Every Season", summary: "Soil pH and nutrients change — test before planting.", detail: "Collect soil samples from 6-8 spots in your field at 15cm depth. Mix them and send to your nearest Krishi Vigyan Kendra (KVK) for free testing. Ideal pH for most crops: 6.0–7.5." },
      { title: "Add Organic Matter Yearly", summary: "Compost or green manure improves water retention.", detail: "Apply 5-10 tonnes of well-decomposed farmyard manure (FYM) per hectare before ploughing. Green manuring with dhaincha (Sesbania) adds nitrogen naturally. Plough it into soil 45 days after sowing." },
      { title: "Avoid Over-Tilling", summary: "Too much tilling destroys soil structure.", detail: "Limit deep ploughing to once a year. Use minimum tillage or zero-till methods for rabi crops like wheat. This preserves soil organisms, saves fuel, and reduces erosion." },
    ],
  },
  {
    id: "pest",
    label: "Pest Control",
    icon: Bug,
    color: "bg-destructive/10 text-destructive",
    tips: [
      { title: "Neem Oil Spray", summary: "Natural pest repellent for most vegetables.", detail: "Mix 5ml neem oil + 1ml liquid soap in 1 litre of water. Spray in the evening when bees are less active. Effective against aphids, whiteflies, and leaf miners. Repeat every 7-10 days." },
      { title: "Yellow Sticky Traps", summary: "Trap flying pests without chemicals.", detail: "Place yellow sticky traps at crop canopy height, 10-15 per acre. They attract whiteflies, thrips, and aphids. Check and replace every 2 weeks. Cost: ₹3-5 per trap." },
      { title: "Companion Planting", summary: "Some plants naturally repel pests.", detail: "Plant marigolds around vegetable beds to repel nematodes. Basil near tomatoes deters whiteflies. Coriander attracts beneficial predator insects. Saves pesticide costs significantly." },
    ],
  },
  {
    id: "water",
    label: "Irrigation",
    icon: Droplets,
    color: "bg-sky-light text-sky",
    tips: [
      { title: "Drip Irrigation Saves 60% Water", summary: "Direct water to roots, reduce waste.", detail: "Drip irrigation costs ₹45,000-65,000 per acre but saves 40-60% water. Government subsidy available (50-90% for small farmers). Contact your district agriculture office for PM Krishi Sinchayee Yojana benefits." },
      { title: "Mulching Reduces Evaporation", summary: "Cover soil to keep moisture in.", detail: "Use crop residues (straw, leaves) or plastic mulch. Apply 5-8cm thick layer around plants. Reduces watering frequency by 30-40%. Also suppresses weeds and regulates soil temperature." },
      { title: "Water Early Morning", summary: "Less evaporation, less disease.", detail: "Irrigate between 6-9 AM. Evening watering keeps foliage wet overnight, promoting fungal diseases. Morning watering allows leaves to dry before sunset. Saves 15-20% water versus midday irrigation." },
    ],
  },
  {
    id: "fertilizer",
    label: "Fertilizers",
    icon: FlaskConical,
    color: "bg-leaf-light text-leaf",
    tips: [
      { title: "Follow the 4R Principle", summary: "Right source, rate, time, and place.", detail: "Right Source: Match fertilizer to crop need. Right Rate: Based on soil test. Right Time: Split doses at critical growth stages. Right Place: Band placement near roots is 30% more effective than broadcasting." },
      { title: "DAP Alternatives Save Money", summary: "SSP + Urea can replace expensive DAP.", detail: "DAP (₹1,350/bag) can be replaced with SSP (₹400/bag) + Urea for phosphorus needs. SSP also provides sulphur and calcium. Consult your soil test report for exact quantities needed." },
      { title: "Vermicompost Boosts Yield", summary: "Earthworm compost improves soil biology.", detail: "Apply 2-3 tonnes vermicompost per acre. Rich in NPK + micronutrients. Start your own vermicompost pit: 10x4x3 ft pit with cow dung and Eisenia fetida earthworms. Produces 3-4 tonnes in 3 months." },
    ],
  },
];

export default function FarmingTips() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="bg-card border-b p-4">
        <h2 className="text-lg mb-1">Farming Knowledge</h2>
        <p className="text-xs text-muted-foreground">Practical tips from agricultural experts</p>
      </div>

      {!selectedCategory ? (
        <div className="p-4 space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] ${cat.color}`}
            >
              <div className="size-12 rounded-xl bg-background/50 flex items-center justify-center">
                <cat.icon className="size-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">{cat.label}</div>
                <div className="text-xs opacity-75">{cat.tips.length} tips</div>
              </div>
              <ChevronRight className="size-5 opacity-50" />
            </button>
          ))}

          {/* Quick Facts */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Did You Know?</h3>
            <div className="space-y-2">
              {[
                { emoji: "🌍", fact: "India has 15 agro-climatic zones — crop choice depends on your zone." },
                { emoji: "💧", fact: "1 kg of rice needs 3,000-5,000 litres of water to grow." },
                { emoji: "🐛", fact: "Ladybugs eat 50-60 aphids per day — they're free pest control!" },
                { emoji: "🌱", fact: "Crop rotation increases yield by 10-25% over monoculture." },
              ].map((item) => (
                <div key={item.fact} className="bg-card border rounded-lg p-3 flex items-start gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <button
            onClick={() => { setSelectedCategory(null); setExpandedTip(null); }}
            className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="size-4 rotate-180" />
            Back to categories
          </button>

          <div className="px-4 pb-4 space-y-3">
            {activeCategory?.tips.map((tip, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-all ${activeCategory.color}`}
              >
                <button
                  onClick={() => setExpandedTip(expandedTip === i ? null : i)}
                  className="w-full text-left p-4"
                >
                  <div className="font-semibold text-sm">{tip.title}</div>
                  <div className="text-xs opacity-75 mt-1">{tip.summary}</div>
                </button>
                {expandedTip === i && (
                  <div className="px-4 pb-4 text-xs leading-relaxed opacity-80 border-t border-current/10 pt-3">
                    {tip.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
