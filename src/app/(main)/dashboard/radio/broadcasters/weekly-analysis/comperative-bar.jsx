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
import { MangoSerctorData, RedSerctorData, ClubSerctorData, MirchiSerctorData } from "./sector-data";

const RadioSectorAnalysis = () => {
  const [selectedWeeks, setSelectedWeeks] = useState(["week_1"]);
  const [selectedStations, setSelectedStations] = useState(["all"]);

  // Define sectors with colors
  const sectors = {
    Accessories: { name: "Accessories", color: "#10B981" },
    Airlines: { name: "Airlines", color: "#3B82F6" },
    Automobile: { name: "Automobile", color: "#EF4444" },
    BuildingMaterials: { name: "Building Materials", color: "#8B5CF6" },
    Constructions: { name: "Constructions", color: "#F59E0B" },
    ConsumerDurables: { name: "Consumer Durables", color: "#EC4899" },
    Education: { name: "Education", color: "#06B6D4" },
    Entertainment: { name: "Entertainment", color: "#8B5CF6" },
    FMCG: { name: "FMCG", color: "#84CC16" },
    Finance: { name: "Finance", color: "#059669" },
    Government: { name: "Government", color: "#DC2626" },
    HomeFurnishing: { name: "Home Furnishing", color: "#7C3AED" },
    Manufacturing: { name: "Manufacturing", color: "#1F2937" },
    Medicine: { name: "Medicine", color: "#14B8A6" },
    Property: { name: "Property", color: "#F97316" },
    Retail: { name: "Retail", color: "#6366F1" },
    Services: { name: "Services", color: "#EF4444" },
    "Consumer Durables": { name: "Aduthaduthu Moonu Pattu", color: "#F59E0B" },
    Hospitality: { name: "Hospitality", color: "#10B981" },
  };

  // Define weeks
  const weeks = [
    { value: "week_1", label: "Week 1", shortLabel: "Week 1" },
    { value: "week_2", label: "Week 2", shortLabel: "Week 2" },
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
        MangoSerctorData.map(({ week, data }) => [week, data])
      ),
    },
    RedFM: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        RedSerctorData.map(({ week, data }) => [week, data])
      ),
    },
    ClubFM: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        ClubSerctorData.map(({ week, data }) => [week, data])
      ),
    },
    RadioMirchi: {
      region: "Kochi",
      language: "malayalam",
      weekly: Object.fromEntries(
        MirchiSerctorData.map(({ week, data }) => [week, data])
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
    // Handle "all" stations case
    const isAllSelected = selectedStations.includes("all");
    return flattenedData
      .filter((stationData) => {
        return (
          isAllSelected ||
          selectedStations.includes(stationData.station.toLowerCase())
        );
      })
      .map((stationData) => ({
        station: stationData.station,
        weeklyData: selectedWeeks.map((week) => ({
          week,
          sectors: stationData.weekly[week] || {},
        })),
        region: stationData.region,
        language: stationData.language,
      }));
  }, [selectedWeeks, selectedStations]);

  // Calculate maximum total percentage for scaling
  const maxTotalPercentage = useMemo(() => {
    const max = Math.max(
      ...filteredData.map((station) =>
        station.weeklyData.reduce((sum, weekData) => {
          const total = Object.values(weekData.sectors).reduce(
            (acc, sector) => acc + (sector.total_percentage || 0),
            0
          );
          return Math.max(sum, total);
        }, 0)
      ),
      100
    );
    console.log("maxTotalPercentage:", max);
    return max;
  }, [filteredData]);

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
      .map(
        (station) =>
          stations.find((s) => s.value === station)?.label || station
      )
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
                <Select
                  value=""
                  onValueChange={handleWeekSelection}
                >
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
                <Select
                  value=""
                  onValueChange={handleStationSelection}
                >
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
                      const totalWeekPercentage = Object.values(
                        weekData.sectors
                      ).reduce(
                        (sum, sector) => sum + (sector.total_percentage || 0),
                        0
                      );
                      console.log(
                        `Station: ${station.station}, Week: ${weekData.week}, Total: ${totalWeekPercentage}`
                      );
                      if (totalWeekPercentage === 0) {
                        return (
                          <div key={weekData.week} className="relative">
                            <div className="text-xs font-medium text-gray-600 mb-1.5">
                              {
                                weeks.find((w) => w.value === weekData.week)
                                  ?.label
                              }
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
                            {
                              weeks.find((w) => w.value === weekData.week)
                                ?.label
                            }
                          </div>
                          <div className="relative h-8 w-full">
                            <div className="absolute inset-y-0 w-full bg-gray-200/50 rounded-full" />
                            <div
                              className="relative h-full rounded-full flex shadow-sm"
                              style={{
                                width: `${Math.min(
                                  (totalWeekPercentage / maxTotalPercentage) *
                                    100,
                                  100
                                )}%`,
                              }}
                            >
                              {Object.entries(weekData.sectors).map(
                                ([sectorKey, sectorData]) => {
                                  const percentage =
                                    sectorData.total_percentage || 0;
                                  if (percentage === 0) return null;
                                  const barWidth =
                                    (percentage / totalWeekPercentage) * 100;
                                  return (
                                    <div
                                      key={sectorKey}
                                      className="h-full flex items-center justify-center group transition-all duration-200 hover:brightness-110"
                                      style={{
                                        width: `${barWidth}%`,
                                        backgroundColor:
                                          sectors[sectorKey]?.color ||
                                          "#CCCCCC",
                                        minWidth:
                                          percentage > 0 ? "20px" : "0px",
                                      }}
                                    >
                                      <div className="text-xs font-medium text-white px-1 truncate">
                                        {percentage.toFixed(1)}%
                                      </div>
                                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {sectors[sectorKey]?.name || sectorKey}:{" "}
                                        {percentage.toFixed(1)}%
                                      </div>
                                    </div>
                                  );
                                }
                              )}
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