import React, { useState, useMemo } from "react";
import { Radio, Filter } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const MangoSectorData = [
  {
    "week": "week_1",
    "seconds": {
      "ENTERTAINMENT": 11770,
      "ACCESSORIES": 9593,
      "PUBLIC INTEREST": 9474,
      "AUTOMOBILE": 5683,
      "CONSUMER DURABLES": 4474,
      "PROPERTY": 3420,
      "INFRASTRUCTURE": 1850,
      "EDUCATION": 1402,
      "CONSTRUCTIONS": 1260,
      "INTERNET SERVICES": 1084,
      "PETROLEUM PRODUCTS": 1072,
      "RETAIL": 810,
      "FMCG": 676,
      "FINANCE": 216
    },
    "plays": {
      "ENTERTAINMENT": 447,
      "ACCESSORIES": 460,
      "PUBLIC INTEREST": 297,
      "AUTOMOBILE": 280,
      "CONSUMER DURABLES": 353,
      "PROPERTY": 76,
      "INFRASTRUCTURE": 185,
      "EDUCATION": 54,
      "CONSTRUCTIONS": 126,
      "INTERNET SERVICES": 56,
      "PETROLEUM PRODUCTS": 72,
      "RETAIL": 54,
      "FMCG": 36,
      "FINANCE": 9
    }
  },
  {
    "week": "week_2",
    "seconds": {
      "ACCESSORIES": 13060,
      "ENTERTAINMENT": 5917,
      "AUTOMOBILE": 3840,
      "CONSUMER DURABLES": 3359,
      "PUBLIC INTEREST": 3185,
      "INFRASTRUCTURE": 2710,
      "EDUCATION": 2482,
      "CONSTRUCTIONS": 1250,
      "FINANCE": 1200,
      "PETROLEUM PRODUCTS": 935,
      "HEALTHCARE": 660,
      "FMCG": 623,
      "RETAIL": 240
    },
    "plays": {
      "ACCESSORIES": 614,
      "ENTERTAINMENT": 249,
      "AUTOMOBILE": 192,
      "CONSUMER DURABLES": 264,
      "PUBLIC INTEREST": 76,
      "INFRASTRUCTURE": 227,
      "EDUCATION": 95,
      "CONSTRUCTIONS": 125,
      "FINANCE": 50,
      "PETROLEUM PRODUCTS": 63,
      "HEALTHCARE": 58,
      "FMCG": 35,
      "RETAIL": 16
    }
  }
]

const RedSectorData = [
  {
    "week": "week_1",
    "seconds": {
      "CONSUMER DURABLES": 16095,
      "PUBLIC INTEREST": 13840,
      "ENTERTAINMENT": 13801,
      "ACCESSORIES": 11326,
      "AUTOMOBILE": 9381,
      "FINANCE": 3446,
      "HEALTHCARE": 3337,
      "FMCG": 3068,
      "HOME FURNISHING": 2358,
      "EDUCATION": 2060,
      "CONSTRUCTIONS": 1732,
      "INFRASTRUCTURE": 1720,
      "MANUFACTURING": 1548,
      "PETROLEUM PRODUCTS": 1080,
      "RETAIL": 930,
      "CONSUMER ELECTRONICS INDUSTRY": 597,
      "PROPERTY": 360,
      "TRAVEL&TOURISM": 12
    },
    "plays": {
      "CONSUMER DURABLES": 1120,
      "PUBLIC INTEREST": 433,
      "ENTERTAINMENT": 721,
      "ACCESSORIES": 1315,
      "AUTOMOBILE": 522,
      "FINANCE": 325,
      "HEALTHCARE": 381,
      "FMCG": 549,
      "HOME FURNISHING": 260,
      "EDUCATION": 62,
      "CONSTRUCTIONS": 213,
      "INFRASTRUCTURE": 172,
      "MANUFACTURING": 327,
      "PETROLEUM PRODUCTS": 72,
      "RETAIL": 93,
      "CONSUMER ELECTRONICS INDUSTRY": 41,
      "PROPERTY": 12,
      "TRAVEL&TOURISM": 2
    }
  },
  {
    "week": "week_2",
    "seconds": {
      "ACCESSORIES": 11964,
      "ENTERTAINMENT": 10422,
      "CONSUMER DURABLES": 8005,
      "PUBLIC INTEREST": 6675,
      "AUTOMOBILE": 5875,
      "FINANCE": 4056,
      "HEALTHCARE": 3412,
      "FMCG": 2988,
      "HOME FURNISHING": 2760,
      "INFRASTRUCTURE": 2470,
      "CONSTRUCTIONS": 1658,
      "MANUFACTURING": 1637,
      "PROPERTY": 1200,
      "PETROLEUM PRODUCTS": 1035,
      "EDUCATION": 880,
      "CONSUMER ELECTRONICS INDUSTRY": 390,
      "TRAVEL&TOURISM": 120
    },
    "plays": {
      "ACCESSORIES": 1315,
      "ENTERTAINMENT": 550,
      "CONSUMER DURABLES": 647,
      "PUBLIC INTEREST": 201,
      "AUTOMOBILE": 352,
      "FINANCE": 332,
      "HEALTHCARE": 357,
      "FMCG": 520,
      "HOME FURNISHING": 279,
      "INFRASTRUCTURE": 207,
      "CONSTRUCTIONS": 214,
      "MANUFACTURING": 302,
      "PROPERTY": 40,
      "PETROLEUM PRODUCTS": 69,
      "EDUCATION": 26,
      "CONSUMER ELECTRONICS INDUSTRY": 24,
      "TRAVEL&TOURISM": 20
    }
  }
]

const ClubSectorData = [
  {
    "week": "week_1",
    "seconds": {
      "CONSUMER DURABLES": 14939,
      "PUBLIC INTEREST": 11719,
      "ACCESSORIES": 8414,
      "ENTERTAINMENT": 4303,
      "HEALTHCARE": 4162,
      "RETAIL": 2979,
      "AUTOMOBILE": 1920,
      "INFRASTRUCTURE": 1860,
      "FMCG": 1585,
      "HOME FURNISHING": 1345,
      "E-COMMERCE": 1199,
      "INTERNET SERVICES": 1080,
      "EDUCATION": 986
    },
    "plays": {
      "CONSUMER DURABLES": 857,
      "PUBLIC INTEREST": 326,
      "ACCESSORIES": 453,
      "ENTERTAINMENT": 155,
      "HEALTHCARE": 95,
      "RETAIL": 225,
      "AUTOMOBILE": 96,
      "INFRASTRUCTURE": 186,
      "FMCG": 113,
      "HOME FURNISHING": 84,
      "E-COMMERCE": 29,
      "INTERNET SERVICES": 36,
      "EDUCATION": 32
    }
  },
  {
    "week": "week_2",
    "seconds": {
      "CONSUMER DURABLES": 9519,
      "ACCESSORIES": 8037,
      "ENTERTAINMENT": 6598,
      "PUBLIC INTEREST": 3561,
      "INFRASTRUCTURE": 2450,
      "HEALTHCARE": 2211,
      "RETAIL": 1930,
      "AUTOMOBILE": 1860,
      "E-COMMERCE": 1635,
      "INTERNET SERVICES": 1050,
      "EDUCATION": 920,
      "HOME FURNISHING": 790,
      "FMCG": 260
    },
    "plays": {
      "CONSUMER DURABLES": 576,
      "ACCESSORIES": 405,
      "ENTERTAINMENT": 159,
      "PUBLIC INTEREST": 93,
      "INFRASTRUCTURE": 199,
      "HEALTHCARE": 65,
      "RETAIL": 152,
      "AUTOMOBILE": 93,
      "E-COMMERCE": 60,
      "INTERNET SERVICES": 35,
      "EDUCATION": 46,
      "HOME FURNISHING": 48,
      "FMCG": 13
    }
  }
]

const MirchiSectorData = [
  {
    "week": "week_1",
    "seconds": {
      "PUBLIC INTEREST": 10668,
      "CONSUMER DURABLES": 6709,
      "ACCESSORIES": 4808,
      "AUTOMOBILE": 2544,
      "ENTERTAINMENT": 1697,
      "HEALTHCARE": 1680,
      "INFRASTRUCTURE": 1550,
      "FINANCE": 1030,
      "PROPERTY": 450,
      "PERSONAL CARE": 402,
      "TRAVEL&TOURISM": 240,
      "TECHNOLOGY": 60
    },
    "plays": {
      "PUBLIC INTEREST": 283,
      "CONSUMER DURABLES": 497,
      "ACCESSORIES": 290,
      "AUTOMOBILE": 118,
      "ENTERTAINMENT": 125,
      "HEALTHCARE": 28,
      "INFRASTRUCTURE": 155,
      "FINANCE": 233,
      "PROPERTY": 15,
      "PERSONAL CARE": 36,
      "TRAVEL&TOURISM": 16,
      "TECHNOLOGY": 4
    }
  },
  {
    "week": "week_2",
    "seconds": {
      "ACCESSORIES": 4319,
      "PUBLIC INTEREST": 2698,
      "CONSUMER DURABLES": 2303,
      "INFRASTRUCTURE": 1030,
      "TRAVEL&TOURISM": 1020,
      "FMCG": 645,
      "PERSONAL CARE": 642,
      "ENTERTAINMENT": 630,
      "FINANCE": 624,
      "HOUSEHOLD PRODUCTS": 324,
      "AUTOMOBILE": 300,
      "HEALTHCARE": 150
    },
    "plays": {
      "ACCESSORIES": 229,
      "PUBLIC INTEREST": 96,
      "CONSUMER DURABLES": 200,
      "INFRASTRUCTURE": 103,
      "TRAVEL&TOURISM": 16,
      "FMCG": 43,
      "PERSONAL CARE": 32,
      "ENTERTAINMENT": 53,
      "FINANCE": 140,
      "HOUSEHOLD PRODUCTS": 34,
      "AUTOMOBILE": 12,
      "HEALTHCARE": 10
    }
  }
]

const RadioSectorAnalysis = () => {
  const [selectedWeeks, setSelectedWeeks] = useState(["week_1"]);
  const [selectedStations, setSelectedStations] = useState(["all"]);
  const [dataType, setDataType] = useState("seconds");
  const [highlightedSector, setHighlightedSector] = useState(null);

  const sectors = {
    "ACCESSORIES": { name: "Accessories", color: "#34D399" },               // Emerald
    "AUTOMOBILE": { name: "Automobile", color: "#F472B6" },                 // Pink
    "CONSTRUCTIONS": { name: "Constructions", color: "#F59E0B" },           // Amber
    "CONSUMER DURABLES": { name: "Consumer Durables", color: "#3B82F6" },   // Blue
    "CONSUMER ELECTRONICS INDUSTRY": { name: "Consumer Electronics Industry", color: "#8B5CF6" }, // Violet
    "E-COMMERCE": { name: "E-Commerce", color: "#EC4899" },                 // Fuchsia
    "EDUCATION": { name: "Education", color: "#4ADE80" },                   // Green
    "ENTERTAINMENT": { name: "Entertainment", color: "#F87171" },           // Red
    "FINANCE": { name: "Finance", color: "#60A5FA" },                       // Light Blue
    "FMCG": { name: "FMCG", color: "#A78BFA" },                             // Purple
    "HEALTHCARE": { name: "Healthcare", color: "#10B981" },                // Teal
    "HOME FURNISHING": { name: "Home Furnishing", color: "#E879F9" },       // Orchid
    "HOUSEHOLD PRODUCTS": { name: "Household Products", color: "#FCD34D" }, // Yellow
    "INFRASTRUCTURE": { name: "Infrastructure", color: "#FB923C" },         // Orange
    "INTERNET SERVICES": { name: "Internet Services", color: "#22D3EE" },   // Cyan
    "MANUFACTURING": { name: "Manufacturing", color: "#C084FC" },           // Light Purple
    "PERSONAL CARE": { name: "Personal Care", color: "#F87171" },           // Light Red
    "PETROLEUM PRODUCTS": { name: "Petroleum Products", color: "#6EE7B7" }, // Mint
    "PROPERTY": { name: "Property", color: "#FBBF24" },                     // Golden
    "PUBLIC INTEREST": { name: "Public Interest", color: "#93C5FD" },       // Sky Blue
    "RETAIL": { name: "Retail", color: "#FCA5A5" },                         // Salmon
    "TECHNOLOGY": { name: "Technology", color: "#818CF8" },                 // Indigo
    "TRAVEL&TOURISM": { name: "Travel & Tourism", color: "#FDBA74" },       // Peach
  };

  const weeks = [
    { value: "week_1", label: "Week 16 (Apr 17-23, 2025)", shortLabel: "Week 16" },
    { value: "week_2", label: "Week 17 (Apr 24-30, 2025)", shortLabel: "Week 17" },
  ];

  const stations = [
    { value: "all", label: "All Stations" },
    { value: "radio mango", label: "Radio Mango" },
    { value: "radiomirchi", label: "Radio Mirchi" },
    { value: "redfm", label: "Red FM" },
    { value: "clubfm", label: "Club FM" },
  ];

  const rawData = {
    "Radio Mango": {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        MangoSectorData.map(({ week, seconds, plays }) => [
          week,
          { seconds, plays },
        ])
      ),
    },
    RadioMirchi: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        MirchiSectorData.map(({ week, seconds, plays }) => [
          week,
          { seconds, plays },
        ])
      ),
    },
    RedFM: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        RedSectorData.map(({ week, seconds, plays }) => [
          week,
          { seconds, plays },
        ])
      ),
    },
    ClubFM: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        ClubSectorData.map(({ week, seconds, plays }) => [
          week,
          { seconds, plays },
        ])
      ),
    },
  };

  const flattenedData = Object.entries(rawData).map(([station, data]) => ({
    station,
    ...data,
  }));

  const filteredData = useMemo(() => {
    const isAllSelected = selectedStations.includes("all");
    return flattenedData
      .filter((stationData) =>
        isAllSelected || selectedStations.includes(stationData.station.toLowerCase())
      )
      .map((stationData) => ({
        station: stationData.station,
        weeklyData: selectedWeeks.map((week) => ({
          week,
          sectors: stationData.weekly[week]?.[dataType] || {},
        })),
        region: stationData.region,
        language: stationData.language,
      }));
  }, [selectedWeeks, selectedStations, dataType]);

  const formatSelectedWeeks = (selected) => {
    if (selected.length === 0) return "Select weeks";
    return selected
      .map((week) => weeks.find((w) => w.value === week)?.shortLabel)
      .sort(
        (a, b) =>
          weeks.findIndex((w) => w.shortLabel === a) -
          weeks.findIndex((w) => w.shortLabel === b)
      )
      .join(", ");
  };

  const formatSelectedStations = (selected) => {
    if (selected.length === 0) return "Select stations";
    if (selected.includes("all")) return "All Stations";
    return selected
      .map((station) => stations.find((s) => s.value === station)?.label || station)
      .join(", ");
  };

  const handleWeekSelection = (value) => {
    setSelectedWeeks((prev) =>
      prev.includes(value)
        ? prev.filter((week) => week !== value)
        : [...prev, value]
    );
  };

  const handleStationSelection = (value) => {
    if (value === "all") {
      setSelectedStations(["all"]);
    } else {
      setSelectedStations((prev) => {
        const newSelection = prev.includes(value)
          ? prev.filter((station) => station !== value)
          : [...prev.filter((station) => station !== "all"), value];
        return newSelection.length === 0 ? ["all"] : newSelection;
      });
    }
  };

  const formatValue = (value) => {
    if (dataType === "seconds") {
      return `${Math.round(value)}s`;
    }
    return `${Math.round(value)}`;
  };

  const toggleSectorHighlight = (sectorKey) => {
    setHighlightedSector((prev) => (prev === sectorKey ? null : sectorKey));
  };

  return (
    <Card className="w-full bg-card shadow-lg rounded-lg border border-border">
      <CardHeader className="p-6 border-b">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2 shadow-md">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Sector-wise Ad Distribution
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Interactive sector performance across radio stations
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                <Select value="" onValueChange={handleWeekSelection}>
                  <SelectTrigger className="w-40 bg-popover shadow-sm border-border rounded-md">
                    <SelectValue placeholder={formatSelectedWeeks(selectedWeeks)} />
                  </SelectTrigger>
                  <SelectContent className="rounded-md shadow-lg bg-popover">
                    {weeks.map((week) => (
                      <SelectItem
                        key={week.value}
                        value={week.value}
                        className="flex items-center gap-2 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWeeks.includes(week.value)}
                          onChange={() => handleWeekSelection(week.value)}
                          className="h-4 w-4"
                        />
                        {week.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value="" onValueChange={handleStationSelection}>
                  <SelectTrigger className="w-48 bg-popover shadow-sm border-border rounded-md">
                    <SelectValue placeholder={formatSelectedStations(selectedStations)} />
                  </SelectTrigger>
                  <SelectContent className="rounded-md shadow-lg bg-popover">
                    {stations.map((station) => (
                      <SelectItem
                        key={station.value}
                        value={station.value}
                        className="flex items-center gap-2 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStations.includes(station.value)}
                          onChange={() => handleStationSelection(station.value)}
                          className="h-4 w-4"
                        />
                        {station.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ToggleGroup
                  type="single"
                  value={dataType}
                  onValueChange={(value) => value && setDataType(value)}
                  className="flex gap-2"
                >
                  <ToggleGroupItem
                    value="seconds"
                    className="bg-popover shadow-sm border-border px-4 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                  >
                    Seconds
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="plays"
                    className="bg-popover shadow-sm border-border px-4 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                  >
                    Plays
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-card">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {Object.entries(sectors).map(([key, sector]) => (
            <button
              key={key}
              onClick={() => toggleSectorHighlight(key)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 shadow-sm transition-all duration-200 ${
                highlightedSector === key
                  ? "bg-accent ring-2 ring-primary"
                  : "bg-popover hover:bg-muted"
              }`}
            >
              <div
                className="h-2.5 w-2.5 rounded-full ring-1 ring-border"
                style={{ backgroundColor: sector.color }}
              />
              <span className="text-xs font-medium text-foreground">
                {sector.name}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {filteredData.map((station) => (
            <div
              key={station.station}
              className="bg-card rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-36 flex-shrink-0">
                  <div className="text-sm font-semibold text-foreground">
                    {station.station}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{station.region}</div>
                  <div className="text-xs text-muted-foreground">{station.language}</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    {station.weeklyData.map((weekData) => {
                      const totalWeekValue = Object.values(weekData.sectors).reduce(
                        (sum, value) => sum + (value || 0),
                        0
                      );
                      if (totalWeekValue === 0) {
                        return (
                          <div key={weekData.week} className="relative">
                            <div className="text-xs font-medium text-foreground mb-2">
                              {weeks.find((w) => w.value === weekData.week)?.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              No data available
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={weekData.week} className="relative">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-medium text-foreground">
                              {weeks.find((w) => w.value === weekData.week)?.label}
                            </div>
                            <div className="text-xs font-semibold text-foreground">
                              Total: {formatValue(totalWeekValue)}
                            </div>
                          </div>
                          <div className="relative h-10 w-full">
                            <div className="absolute inset-y-0 w-full bg-muted rounded-md shadow-inner" />
                            <div
                              className="relative h-full rounded-md flex shadow-sm"
                              style={{ width: "100%" }}
                            >
                              {Object.entries(weekData.sectors)
                                .filter(([, value]) => value > 0)
                                .sort(([, a], [, b]) => b - a) // Sort in descending order
                                .map(([sectorKey, value]) => {
                                  const barWidth = (value / totalWeekValue) * 100;
                                  const percentage = ((value / totalWeekValue) * 100).toFixed(1);
                                  const isHighlighted =
                                    highlightedSector === null || highlightedSector === sectorKey;
                                  return (
                                    <div
                                      key={sectorKey}
                                      className="h-full flex items-center justify-center group transition-all duration-200 relative hover:scale-105"
                                      style={{
                                        width: `${barWidth}%`,
                                        backgroundColor: sectors[sectorKey]?.color || "#CCCCCC",
                                        minWidth: value > 0 ? "24px" : "0px",
                                        opacity: isHighlighted ? 1 : 0.1,
                                        transformOrigin: "center",
                                        boxShadow: isHighlighted
                                          ? "inset 0 0 6px rgba(0,0,0,0.15)"
                                          : "none",
                                      }}
                                    >
                                      <div className="text-xs font-semibold text-white px-1.5 truncate drop-shadow">
                                        {formatValue(value)}
                                      </div>
                                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2.5 py-1 bg-background text-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                                        {sectors[sectorKey]?.name || sectorKey}: {formatValue(value)} ({percentage}%)
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RadioSectorAnalysis;