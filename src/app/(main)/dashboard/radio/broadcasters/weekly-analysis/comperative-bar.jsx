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
      "FINANCIAL SERVICES": 216
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
      "FINANCIAL SERVICES": 9
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
      "FINANCIAL SERVICES": 1200,
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
      "FINANCIAL SERVICES": 50,
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
      "READING": 1199,
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
      "READING": 29,
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
      "READING": 1635,
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
      "READING": 60,
      "INTERNET SERVICES": 35,
      "EDUCATION": 46,
      "HOME FURNISHING": 48,
      "FMCG": 13
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
      "READING": 1199,
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
      "READING": 29,
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
      "READING": 1635,
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
      "READING": 60,
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
      "LUXURY GOODS": 4808,
      "AUTOMOBILE": 2544,
      "ENTERTAINMENT": 1697,
      "HEALTHCARE": 1680,
      "INFRASTRUCTURE": 1550,
      "FINANCE": 1270,
      "PROPERTY": 450,
      "PERSONAL CARE": 402,
      "TECHNOLOGY": 60
    },
    "plays": {
      "PUBLIC INTEREST": 283,
      "CONSUMER DURABLES": 497,
      "LUXURY GOODS": 290,
      "AUTOMOBILE": 118,
      "ENTERTAINMENT": 125,
      "HEALTHCARE": 28,
      "INFRASTRUCTURE": 155,
      "FINANCE": 249,
      "PROPERTY": 15,
      "PERSONAL CARE": 36,
      "TECHNOLOGY": 4
    }
  },
  {
    "week": "week_2",
    "seconds": {
      "LUXURY GOODS": 4319,
      "PUBLIC INTEREST": 2698,
      "CONSUMER DURABLES": 2303,
      "INFRASTRUCTURE": 1030,
      "TRAVEL & TOURISM": 1020,
      "FMCG": 645,
      "PERSONAL CARE": 642,
      "ENTERTAINMENT": 630,
      "FINANCE": 624,
      "HOUSEHOLD PRODUCTS": 324,
      "AUTOMOBILE": 300,
      "HEALTHCARE": 150
    },
    "plays": {
      "LUXURY GOODS": 229,
      "PUBLIC INTEREST": 96,
      "CONSUMER DURABLES": 200,
      "INFRASTRUCTURE": 103,
      "TRAVEL & TOURISM": 16,
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

const sectors = {
  "ACCESSORIES": { name: "Accessories", color: "#34D399" },
  "AUTOMOBILE": { name: "Automobile", color: "#F472B6" },
  "CONSTRUCTIONS": { name: "Constructions", color: "#F59E0B" },
  "CONSUMER DURABLES": { name: "Consumer Durables", color: "#3B82F6" },
  "EDUCATION": { name: "Education", color: "#4ADE80" },
  "ENTERTAINMENT": { name: "Entertainment", color: "#F87171" },
  "FINANCE": { name: "Finance", color: "#2DD4BF" },
  "FINANCIAL SERVICES": { name: "Financial Services", color: "#10B981" },
  "FMCG": { name: "FMCG", color: "#FB923C" },
  "HEALTHCARE": { name: "Healthcare", color: "#60A5FA" },
  "HOME FURNISHING": { name: "Home Furnishing", color: "#22D3EE" },
  "HOUSEHOLD PRODUCTS": { name: "Household Products", color: "#E879F9" },
  "INFRASTRUCTURE": { name: "Infrastructure", color: "#818CF8" },
  "INTERNET SERVICES": { name: "Internet Services", color: "#FCA5A5" },
  "LUXURY GOODS": { name: "Luxury Goods", color: "#A78BFA" },
  "MANUFACTURING": { name: "Manufacturing", color: "#6EE7B7" },
  "MEDICINE": { name: "Medicine", color: "#5EEAD4" },
  "PERSONAL CARE": { name: "Personal Care", color: "#EAB308" },
  "PETROLEUM PRODUCTS": { name: "Petroleum Products", color: "#EF4444" },
  "PROPERTY": { name: "Property", color: "#38BDF8" },
  "PUBLIC INTEREST": { name: "Public Interest", color: "#EC4899" },
  "READING": { name: "Reading", color: "#D1D5DB" },
  "RETAIL": { name: "Retail", color: "#FBBF24" },
  "TECHNOLOGY": { name: "Technology", color: "#93C5FD" },
  "TRAVEL TOURISM": { name: "Travel & Tourism", color: "#4ADE80" }
};
  // Define weeks
  const weeks = [
    { value: "week_1", label: "Week 16 (Apr 17-23, 2025)", shortLabel: "Week 16" },
    { value: "week_2", label: "Week 17 (Apr 24-30, 2025)", shortLabel: "Week 17" },
  ];

  // Define stations
  const stations = [
    { value: "all", label: "All Stations" },
    { value: "mangofm", label: "MangoFM" },
    { value: "redfm", label: "RedFM" },
    { value: "clubfm", label: "ClubFM" },
    { value: "radiomirchi", label: "RadioMirchi" },
  ];

  // Combine and normalize data
  const rawData = {
    MangoFM: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        MangoSectorData.map(({ week, seconds, plays }) => [
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
  };

  // Convert nested data structure to flat array for filtering
  const flattenedData = Object.entries(rawData).map(([station, data]) => ({
    station,
    ...data,
  }));

  // Filter data based on selected stations and weeks
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

  return (
    <Card className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 shadow-md">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Sector-wise Ad Distribution
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Analyze sector performance for selected stations
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex gap-2">
                <Select value="" onValueChange={handleWeekSelection}>
                  <SelectTrigger className="w-40 bg-white shadow-sm border-gray-200">
                    <SelectValue placeholder={formatSelectedWeeks(selectedWeeks)} />
                  </SelectTrigger>
                  <SelectContent>
                    {weeks.map((week) => (
                      <SelectItem
                        key={week.value}
                        value={week.value}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWeeks.includes(week.value)}
                          onChange={() => handleWeekSelection(week.value)}
                          className="mr-2"
                        />
                        {week.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value="" onValueChange={handleStationSelection}>
                  <SelectTrigger className="w-48 bg-white shadow-sm border-gray-200">
                    <SelectValue placeholder={formatSelectedStations(selectedStations)} />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem
                        key={station.value}
                        value={station.value}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStations.includes(station.value)}
                          onChange={() => handleStationSelection(station.value)}
                          className="mr-2"
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
                    className="bg-white shadow-sm border-gray-200 px-4 py-2 rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    Seconds
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="plays"
                    className="bg-white shadow-sm border-gray-200 px-4 py-2 rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    Plays
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(sectors).map(([key, sector]) => (
            <div
              key={key}
              className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 shadow-sm"
            >
              <div
                className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                style={{ backgroundColor: sector.color }}
              />
              <span className="text-xs font-medium text-gray-700">
                {sector.name}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {filteredData.map((station) => (
            <div
              key={station.station}
              className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-36 flex-shrink-0">
                  <div className="text-sm font-semibold text-gray-800">
                    {station.station}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{station.region}</div>
                  <div className="text-xs text-gray-500">{station.language}</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-3">
                    {station.weeklyData.map((weekData) => {
                      const totalWeekValue = Object.values(weekData.sectors).reduce(
                        (sum, value) => sum + (value || 0),
                        0
                      );
                      console.log(
                        `Station: ${station.station}, Week: ${weekData.week}, Total ${dataType}: ${totalWeekValue}`
                      );
                      if (totalWeekValue === 0) {
                        return (
                          <div key={weekData.week} className="relative">
                            <div className="text-xs font-medium text-gray-600 mb-1.5">
                              {weeks.find((w) => w.value === weekData.week)?.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              No data available
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={weekData.week} className="relative">
                          <div className="text-xs font-medium text-gray-600 mb-1.5">
                            {weeks.find((w) => w.value === weekData.week)?.label}
                          </div>
                          <div className="relative h-8 w-full">
                            <div className="absolute inset-y-0 w-full bg-gray-200/50 rounded-full" />
                            <div
                              className="relative h-full rounded-full flex shadow-sm"
                              style={{ width: "100%" }} // Set to 100% to fill the container
                            >
                              {Object.entries(weekData.sectors)
                                .filter(([, value]) => value > 0) // Only include sectors with non-zero values
                                .map(([sectorKey, value]) => {
                                  const barWidth = (value / totalWeekValue) * 100;
                                  return (
                                    <div
                                      key={sectorKey}
                                      className="h-full flex items-center justify-center group transition-all duration-200 hover:brightness-110 relative"
                                      style={{
                                        width: `${barWidth}%`,
                                        backgroundColor:
                                          sectors[sectorKey]?.color || "#CCCCCC",
                                        minWidth: value > 0 ? "20px" : "0px",
                                      }}
                                    >
                                      <div className="text-xs font-medium text-white px-1 truncate">
                                        {formatValue(value)}
                                      </div>
                                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {sectors[sectorKey]?.name || sectorKey}:{" "}
                                        {formatValue(value)}
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