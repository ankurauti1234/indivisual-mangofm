"use client";

import { BarChart2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartCard from "@/components/card/charts-card";

// Sample data for different radio stations
const stationData = {
  mangofm: {
    name: "Mango FM",
    data: [
      { sector: "FMCG", spend: 2200000, fill: "hsl(var(--chart-1))" },
      { sector: "Auto", spend: 1800000, fill: "hsl(var(--chart-1))" },
      { sector: "Real Estate", spend: 1500000, fill: "hsl(var(--chart-1))" },
      { sector: "Retail", spend: 900000, fill: "hsl(var(--chart-1))" },
      { sector: "Other", spend: 600000, fill: "hsl(var(--chart-1))" },
    ],
  },
  redfm: {
    name: "Red FM",
    data: [
      { sector: "FMCG", spend: 2500000, fill: "hsl(var(--chart-2))" },
      { sector: "Auto", spend: 2000000, fill: "hsl(var(--chart-2))" },
      { sector: "Real Estate", spend: 1700000, fill: "hsl(var(--chart-2))" },
      { sector: "Retail", spend: 1100000, fill: "hsl(var(--chart-2))" },
      { sector: "Other", spend: 750000, fill: "hsl(var(--chart-2))" },
    ],
  },
  clubfm: {
    name: "Club FM",
    data: [
      { sector: "FMCG", spend: 1900000, fill: "hsl(var(--chart-3))" },
      { sector: "Auto", spend: 1600000, fill: "hsl(var(--chart-3))" },
      { sector: "Real Estate", spend: 1300000, fill: "hsl(var(--chart-3))" },
      { sector: "Retail", spend: 800000, fill: "hsl(var(--chart-3))" },
      { sector: "Other", spend: 500000, fill: "hsl(var(--chart-3))" },
    ],
  },
  radiomirchi: {
    name: "Radio Mirchi",
    data: [
      { sector: "FMCG", spend: 2700000, fill: "hsl(var(--chart-4))" },
      { sector: "Auto", spend: 2300000, fill: "hsl(var(--chart-4))" },
      { sector: "Real Estate", spend: 1900000, fill: "hsl(var(--chart-4))" },
      { sector: "Retail", spend: 1200000, fill: "hsl(var(--chart-4))" },
      { sector: "Other", spend: 850000, fill: "hsl(var(--chart-4))" },
    ],
  },
};

const chartConfig = {
  mangofm: {
    label: "Mango FM",
    color: "hsl(var(--chart-1))",
  },
  redfm: {
    label: "Red FM",
    color: "hsl(var(--chart-2))",
  },
  clubfm: {
    label: "Club FM",
    color: "hsl(var(--chart-3))",
  },
  radiomirchi: {
    label: "Radio Mirchi",
    color: "hsl(var(--chart-4))",
  },
  FMCG: {
    label: "FMCG",
  },
  Auto: {
    label: "Auto",
  },
  RealEstate: {
    label: "Real Estate",
  },
  Retail: {
    label: "Retail",
  },
  Other: {
    label: "Other",
  },
};

export default function IndustryAdSpend() {
  const [selectedStations, setSelectedStations] = useState(["mangofm"]);

  // Prepare data for stacked chart
  const chartData = [
    { sector: "FMCG", ...Object.fromEntries(Object.keys(stationData).map(station => [station, selectedStations.includes(station) ? stationData[station].data.find(d => d.sector === "FMCG").spend : 0])) },
    { sector: "Auto", ...Object.fromEntries(Object.keys(stationData).map(station => [station, selectedStations.includes(station) ? stationData[station].data.find(d => d.sector === "Auto").spend : 0])) },
    { sector: "Real Estate", ...Object.fromEntries(Object.keys(stationData).map(station => [station, selectedStations.includes(station) ? stationData[station].data.find(d => d.sector === "Real Estate").spend : 0])) },
    { sector: "Retail", ...Object.fromEntries(Object.keys(stationData).map(station => [station, selectedStations.includes(station) ? stationData[station].data.find(d => d.sector === "Retail").spend : 0])) },
    { sector: "Other", ...Object.fromEntries(Object.keys(stationData).map(station => [station, selectedStations.includes(station) ? stationData[station].data.find(d => d.sector === "Other").spend : 0])) },
  ];

  const formatCurrency = (value) => {
    return `INR ${(value / 1000000).toFixed(2)}M`;
  };

  const handleSelectChange = (value) => {
    if (value === "all") {
      setSelectedStations(Object.keys(stationData));
    } else {
      setSelectedStations([value]);
    }
  };

  return (
    <ChartCard
      icon={<BarChart2 className="w-6 h-6" />}
      title="Category-Wise Ad Spend"
      description="Industry Analysis Across Stations 2024"
      action={
        <div className="flex justify-end">
          <Select onValueChange={handleSelectChange} defaultValue="mangofm">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select station(s)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stations</SelectItem>
              <SelectItem value="mangofm">Mango FM</SelectItem>
              <SelectItem value="redfm">Red FM</SelectItem>
              <SelectItem value="clubfm">Club FM</SelectItem>
              <SelectItem value="radiomirchi">Radio Mirchi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
      chart={
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 16,
            }}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sector"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={8}
              tickFormatter={formatCurrency}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={formatCurrency}
                />
              }
            />
            <Legend />
            {selectedStations.map((station) => (
              <Bar
                key={station}
                dataKey={station}
                stackId="a"
                fill={chartConfig[station].color}
                radius={selectedStations.length === 1 ? 16 : [4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing ad spend distribution for{" "}
          {selectedStations.length === Object.keys(stationData).length
            ? "all stations"
            : selectedStations.map((s) => stationData[s].name).join(", ")}
        </p>
      }
    />
  );
}