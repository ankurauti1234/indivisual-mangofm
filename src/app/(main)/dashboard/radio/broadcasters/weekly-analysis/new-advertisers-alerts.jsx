"use client";

import { AlertCircle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useState } from "react";

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

// Sample data for new advertisers across weeks for different months, years, and stations
const newAdvertiserData = {
  "mangofm_2025-05": {
    name: "Mango FM - May 2025",
    data: [
      { week: "Week 1", newAdvertisers: 5 },
      { week: "Week 2", newAdvertisers: 8 },
      { week: "Week 3", newAdvertisers: 6 },
      { week: "Week 4", newAdvertisers: 7 },
    ],
  },
  "mangofm_2025-04": {
    name: "Mango FM - April 2025",
    data: [
      { week: "Week 1", newAdvertisers: 4 },
      { week: "Week 2", newAdvertisers: 6 },
      { week: "Week 3", newAdvertisers: 5 },
      { week: "Week 4", newAdvertisers: 8 },
    ],
  },
  "mangofm_2024-12": {
    name: "Mango FM - December 2024",
    data: [
      { week: "Week 1", newAdvertisers: 3 },
      { week: "Week 2", newAdvertisers: 7 },
      { week: "Week 3", newAdvertisers: 4 },
      { week: "Week 4", newAdvertisers: 6 },
    ],
  },
  "redfm_2025-05": {
    name: "Red FM - May 2025",
    data: [
      { week: "Week 1", newAdvertisers: 6 },
      { week: "Week 2", newAdvertisers: 9 },
      { week: "Week 3", newAdvertisers: 7 },
      { week: "Week 4", newAdvertisers: 8 },
    ],
  },
  "redfm_2025-04": {
    name: "Red FM - April 2025",
    data: [
      { week: "Week 1", newAdvertisers: 5 },
      { week: "Week 2", newAdvertisers: 7 },
      { week: "Week 3", newAdvertisers: 6 },
      { week: "Week 4", newAdvertisers: 9 },
    ],
  },
  "redfm_2024-12": {
    name: "Red FM - December 2024",
    data: [
      { week: "Week 1", newAdvertisers: 4 },
      { week: "Week 2", newAdvertisers: 8 },
      { week: "Week 3", newAdvertisers: 5 },
      { week: "Week 4", newAdvertisers: 7 },
    ],
  },
  "clubfm_2025-05": {
    name: "Club FM - May 2025",
    data: [
      { week: "Week 1", newAdvertisers: 3 },
      { week: "Week 2", newAdvertisers: 6 },
      { week: "Week 3", newAdvertisers: 4 },
      { week: "Week 4", newAdvertisers: 5 },
    ],
  },
  "clubfm_2025-04": {
    name: "Club FM - April 2025",
    data: [
      { week: "Week 1", newAdvertisers: 2 },
      { week: "Week 2", newAdvertisers: 5 },
      { week: "Week 3", newAdvertisers: 3 },
      { week: "Week 4", newAdvertisers: 6 },
    ],
  },
  "clubfm_2024-12": {
    name: "Club FM - December 2024",
    data: [
      { week: "Week 1", newAdvertisers: 2 },
      { week: "Week 2", newAdvertisers: 4 },
      { week: "Week 3", newAdvertisers: 3 },
      { week: "Week 4", newAdvertisers: 5 },
    ],
  },
  "radiomirchi_2025-05": {
    name: "Radio Mirchi - May 2025",
    data: [
      { week: "Week 1", newAdvertisers: 7 },
      { week: "Week 2", newAdvertisers: 10 },
      { week: "Week 3", newAdvertisers: 8 },
      { week: "Week 4", newAdvertisers: 9 },
    ],
  },
  "radiomirchi_2025-04": {
    name: "Radio Mirchi - April 2025",
    data: [
      { week: "Week 1", newAdvertisers: 6 },
      { week: "Week 2", newAdvertisers: 8 },
      { week: "Week 3", newAdvertisers: 7 },
      { week: "Week 4", newAdvertisers: 10 },
    ],
  },
  "radiomirchi_2024-12": {
    name: "Radio Mirchi - December 2024",
    data: [
      { week: "Week 1", newAdvertisers: 5 },
      { week: "Week 2", newAdvertisers: 9 },
      { week: "Week 3", newAdvertisers: 6 },
      { week: "Week 4", newAdvertisers: 8 },
    ],
  },
};

// Available stations, months, and years
const stationOptions = [
  { value: "mangofm", label: "Mango FM" },
  { value: "redfm", label: "Red FM" },
  { value: "clubfm", label: "Club FM" },
  { value: "radiomirchi", label: "Radio Mirchi" },
];

const monthYearOptions = [
  { value: "2025-05", label: "May 2025" },
  { value: "2025-04", label: "April 2025" },
  { value: "2024-12", label: "December 2024" },
];

const chartConfig = {
  newAdvertisers: {
    label: "New Advertisers",
    color: "hsl(var(--chart-1))",
  },
};

export default function NewAdvertisersAlerts() {
  const [selectedStation, setSelectedStation] = useState("mangofm");
  const [selectedMonthYear, setSelectedMonthYear] = useState("2025-05");

  // Get data for the selected station and month/year
  const chartData = newAdvertiserData[`${selectedStation}_${selectedMonthYear}`].data;

  const formatNumber = (value) => {
    return `${value}`;
  };

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  const handleMonthYearChange = (value) => {
    setSelectedMonthYear(value);
  };

  return (
    <ChartCard
      icon={<AlertCircle className="w-6 h-6" />}
      title="New Advertiser Alerts"
      description="Brands Recently Appearing on Competitors (Last 30 Days)"
      action={
        <div className="flex justify-end space-x-2">
          <Select onValueChange={handleStationChange} defaultValue="mangofm">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select station" />
            </SelectTrigger>
            <SelectContent>
              {stationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleMonthYearChange} defaultValue="2025-05">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select month/year" />
            </SelectTrigger>
            <SelectContent>
              {monthYearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
              dataKey="week"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              tickFormatter={formatNumber}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Week: ${label}`}
                  valueFormatter={formatNumber}
                />
              }
            />
            <Legend />
            <Bar
              dataKey="newAdvertisers"
              fill={chartConfig.newAdvertisers.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing number of new advertisers for {newAdvertiserData[`${selectedStation}_${selectedMonthYear}`].name}
        </p>
      }
    />
  );
}