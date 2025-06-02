"use client";
import React, { useState } from "react";
import { Radio, Clock, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { week1, week2 } from "./heatmap-data.js";

const RadioAdHeatmap = () => {
  const [selectedWeek, setSelectedWeek] = useState("week_16");
  const [hoveredCell, setHoveredCell] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const data = selectedWeek === "week_16" ? week1 : week2;

  const weeks = [
    { value: "week_16", label: "Week 16 (Apr 17-23, 2025)" },
    { value: "week_17", label: "Week 17 (Apr 24-30, 2025)" },
  ];

  const processData = (data) => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const stations = ["RED FM", "Club FM", "Mango", "Mirchi"];

    const matrix = stations.map((station) => {
      const stationData = { station };
      hours.forEach((hour) => {
        const match = data.find((d) => d.hour === hour);
        stationData[hour] = match ? match.stations[station]?.minutes || 0 : 0;
      });
      return stationData;
    });

    return matrix;
  };

  const matrix = processData(data);

  const values = matrix.flatMap((row) =>
    Object.values(row).filter((val) => typeof val === "number")
  );
  const min = Math.min(...values);
  const max = Math.max(...values);

  const getColor = (value) => {
    if (!value) return "rgb(244, 245, 247)";
    const normalizedValue = (value - min) / (max - min);
    return `rgba(242, 100, 50, ${0.3 + normalizedValue * 0.6})`; // Adjusted opacity for better contrast
  };

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const getTimeOfDay = (hour) => {
    const hourNum = parseInt(hour);
    if (hourNum >= 5 && hourNum < 12) return "Morning (5:00–11:59)";
    if (hourNum >= 12 && hourNum < 17) return "Afternoon (12:00–16:59)";
    if (hourNum >= 17 && hourNum < 21) return "Evening (17:00–20:59)";
    return "Night (21:00–4:59)";
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Radio className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Ad Airtime Heatmap
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                Hourly ad duration across radio stations
              </CardDescription>
            </div>
          </div>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-56 bg-white shadow-sm border-gray-200">
              <SelectValue placeholder="Select Week" />
            </SelectTrigger>
            <SelectContent>
              {weeks.map((week) => (
                <SelectItem key={week.value} value={week.value}>
                  {week.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div
              className="grid gap-px bg-gray-200"
              style={{
                gridTemplateColumns: "120px repeat(24, minmax(40px, 1fr))",
              }}
            >
              <div className="bg-gray-100 font-medium text-sm text-gray-700 p-3 rounded-tl-lg">
                Station
              </div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="bg-gray-100 p-2 text-center relative group"
                  onMouseEnter={() => setHoveredCell(hour)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <div className="text-xs font-medium text-gray-600">
                    {hour}
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {getTimeOfDay(hour)}
                  </div>
                </div>
              ))}
            </div>

            {matrix.map((row, idx) => (
              <div
                key={idx}
                className="grid gap-px bg-gray-200"
                style={{
                  gridTemplateColumns: "120px repeat(24, minmax(40px, 1fr))",
                }}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div
                  className={`p-3 font-medium text-sm text-gray-700 bg-gray-100 transition-colors h-12 flex items-center ${
                    hoveredRow === idx ? "text-primary font-semibold" : ""
                  }`}
                >
                  {row.station}
                </div>
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="relative group"
                    style={{
                      backgroundColor: getColor(row[hour]),
                    }}
                  >
                    <div className="h-12 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-800">
                        {row[hour].toFixed(1)}
                      </span>
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {`${row.station}: ${row[hour].toFixed(1)} mins at ${hour}`}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
              <span className="text-sm text-gray-600">Ad Duration:</span>
              <div className="h-4 w-48 rounded-md bg-gradient-to-r from-[#F2643233] to-[#F26430]" />
              <span className="text-sm text-gray-600">Higher</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">Hover for details</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50 text-sm text-gray-500 border-t">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>24-hour ad airtime distribution by station</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadioAdHeatmap;