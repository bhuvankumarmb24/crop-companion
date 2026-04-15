import { useState } from "react";
import { MessageCircle, CloudSun, CalendarDays, BookOpen, Sprout } from "lucide-react";
import FarmChat from "@/components/FarmChat";
import WeatherDashboard from "@/components/WeatherDashboard";
import CropCalendar from "@/components/CropCalendar";
import FarmingTips from "@/components/FarmingTips";

const tabs = [
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "weather", label: "Weather", icon: CloudSun },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "tips", label: "Tips", icon: BookOpen },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && <FarmChat />}
        {activeTab === "weather" && <WeatherDashboard />}
        {activeTab === "calendar" && <CropCalendar />}
        {activeTab === "tips" && <FarmingTips />}
      </div>

      {/* Bottom Navigation */}
      <nav className="shrink-0 border-t bg-card flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="size-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Index;
