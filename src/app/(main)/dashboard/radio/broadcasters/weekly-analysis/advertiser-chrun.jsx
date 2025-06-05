"use client";

import { AlertTriangle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Cell } from "recharts";
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

// Sample data for advertiser churn across stations by week
const churnData = {
  week16: {
    mangofm: {
      name: "Mango FM",
      data: [
        {
          metric: "Initial",
          count: 20,
          advertisers: ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF", "BrandG", "BrandH", "BrandI", "BrandJ", "BrandK", "BrandL", "BrandM", "BrandN", "BrandO", "BrandP", "BrandQ", "BrandR", "BrandS", "BrandT"],
        },
        {
          metric: "New",
          count: 5,
          advertisers: ["BrandU", "BrandV", "BrandW", "BrandX", "BrandY"],
        },
        {
          metric: "Dropped",
          count: -7,
          advertisers: ["BrandC", "BrandE", "BrandI", "BrandK", "BrandM", "BrandO", "BrandS"],
        },
        {
          metric: "Final",
          count: 18,
          advertisers: ["BrandA", "BrandB", "BrandD", "BrandF", "BrandG", "BrandH", "BrandJ", "BrandL", "BrandN", "BrandP", "BrandQ", "BrandR", "BrandT", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY"],
        },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        {
          metric: "Initial",
          count: 22,
          advertisers: ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF", "BrandG", "BrandH", "BrandI", "BrandJ", "BrandK", "BrandL", "BrandM", "BrandN", "BrandO", "BrandP", "BrandQ", "BrandR", "BrandS", "BrandT", "BrandU", "BrandV"],
        },
        {
          metric: "New",
          count: 6,
          advertisers: ["BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA", "BrandAB"],
        },
        {
          metric: "Dropped",
          count: -8,
          advertisers: ["BrandB", "BrandD", "BrandF", "BrandI", "BrandK", "BrandN", "BrandQ", "BrandT"],
        },
        {
          metric: "Final",
          count: 20,
          advertisers: ["BrandA", "BrandC", "BrandE", "BrandG", "BrandH", "BrandJ", "BrandL", "BrandM", "BrandO", "BrandP", "BrandR", "BrandS", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA", "BrandAB"],
        },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        {
          metric: "Initial",
          count: 18,
          advertisers: ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF", "BrandG", "BrandH", "BrandI", "BrandJ", "BrandK", "BrandL", "BrandM", "BrandN", "BrandO", "BrandP", "BrandQ", "BrandR"],
        },
        {
          metric: "New",
          count: 4,
          advertisers: ["BrandS", "BrandT", "BrandU", "BrandV"],
        },
        {
          metric: "Dropped",
          count: -6,
          advertisers: ["BrandC", "BrandF", "BrandI", "BrandL", "BrandO", "BrandQ"],
        },
        {
          metric: "Final",
          count: 16,
          advertisers: ["BrandA", "BrandB", "BrandD", "BrandE", "BrandG", "BrandH", "BrandJ", "BrandK", "BrandM", "BrandN", "BrandP", "BrandR", "BrandS", "BrandT", "BrandU", "BrandV"],
        },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        {
          metric: "Initial",
          count: 25,
          advertisers: ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF", "BrandG", "BrandH", "BrandI", "BrandJ", "BrandK", "BrandL", "BrandM", "BrandN", "BrandO", "BrandP", "BrandQ", "BrandR", "BrandS", "BrandT", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY"],
        },
        {
          metric: "New",
          count: 7,
          advertisers: ["BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE", "BrandAF"],
        },
        {
          metric: "Dropped",
          count: -9,
          advertisers: ["BrandA", "BrandD", "BrandG", "BrandJ", "BrandM", "BrandP", "BrandS", "BrandV", "BrandX"],
        },
        {
          metric: "Final",
          count: 23,
          advertisers: ["BrandB", "BrandC", "BrandE", "BrandF", "BrandH", "BrandI", "BrandK", "BrandL", "BrandN", "BrandO", "BrandQ", "BrandR", "BrandT", "BrandU", "BrandW", "BrandY", "BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE", "BrandAF"],
        },
      ],
    },
  },
  week17: {
    mangofm: {
      name: "Mango FM",
      data: [
        {
          metric: "Initial",
          count: 18,
          advertisers: ["BrandA", "BrandB", "BrandD", "BrandF", "BrandG", "BrandH", "BrandJ", "BrandL", "BrandN", "BrandP", "BrandQ", "BrandR", "BrandT", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY"],
        },
        {
          metric: "New",
          count: 6,
          advertisers: ["BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE"],
        },
        {
          metric: "Dropped",
          count: -5,
          advertisers: ["BrandB", "BrandF", "BrandJ", "BrandQ", "BrandV"],
        },
        {
          metric: "Final",
          count: 19,
          advertisers: ["BrandA", "BrandD", "BrandG", "BrandH", "BrandL", "BrandN", "BrandP", "BrandR", "BrandT", "BrandU", "BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE"],
        },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        {
          metric: "Initial",
          count: 20,
          advertisers: ["BrandA", "BrandC", "BrandE", "BrandG", "BrandH", "BrandJ", "BrandL", "BrandM", "BrandO", "BrandP", "BrandR", "BrandS", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA", "BrandAB"],
        },
        {
          metric: "New",
          count: 7,
          advertisers: ["BrandAC", "BrandAD", "BrandAE", "BrandAF", "BrandAG", "BrandAH", "BrandAI"],
        },
        {
          metric: "Dropped",
          count: -6,
          advertisers: ["BrandC", "BrandG", "BrandL", "BrandO", "BrandS", "BrandW"],
        },
        {
          metric: "Final",
          count: 21,
          advertisers: ["BrandA", "BrandE", "BrandH", "BrandJ", "BrandM", "BrandP", "BrandR", "BrandU", "BrandV", "BrandX", "BrandY", "BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE", "BrandAF", "BrandAG", "BrandAH", "BrandAI"],
        },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        {
          metric: "Initial",
          count: 16,
          advertisers: ["BrandA", "BrandB", "BrandD", "BrandE", "BrandG", "BrandH", "BrandJ", "BrandK", "BrandM", "BrandN", "BrandP", "BrandR", "BrandS", "BrandT", "BrandU", "BrandV"],
        },
        {
          metric: "New",
          count: 5,
          advertisers: ["BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA"],
        },
        {
          metric: "Dropped",
          count: -4,
          advertisers: ["BrandE", "BrandK", "BrandN", "BrandS"],
        },
        {
          metric: "Final",
          count: 17,
          advertisers: ["BrandA", "BrandB", "BrandD", "BrandG", "BrandH", "BrandJ", "BrandM", "BrandP", "BrandR", "BrandT", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY", "BrandZ", "BrandAA"],
        },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        {
          metric: "Initial",
          count: 23,
          advertisers: ["BrandB", "BrandC", "BrandE", "BrandF", "BrandH", "BrandI", "BrandK", "BrandL", "BrandN", "BrandO", "BrandQ", "BrandR", "BrandT", "BrandU", "BrandW", "BrandY", "BrandZ", "BrandAA", "BrandAB", "BrandAC", "BrandAD", "BrandAE", "BrandAF"],
        },
        {
          metric: "New",
          count: 8,
          advertisers: ["BrandAG", "BrandAH", "BrandAI", "BrandAJ", "BrandAK", "BrandAL", "BrandAM", "BrandAN"],
        },
        {
          metric: "Dropped",
          count: -7,
          advertisers: ["BrandC", "BrandF", "BrandI", "BrandL", "BrandQ", "BrandW", "BrandAB"],
        },
        {
          metric: "Final",
          count: 24,
          advertisers: ["BrandB", "BrandE", "BrandH", "BrandK", "BrandN", "BrandO", "BrandR", "BrandT", "BrandU", "BrandY", "BrandZ", "BrandAA", "BrandAC", "BrandAD", "BrandAE", "BrandAF", "BrandAG", "BrandAH", "BrandAI", "BrandAJ", "BrandAK", "BrandAL", "BrandAM", "BrandAN"],
        },
      ],
    },
  },
};

// Available stations
const stationOptions = [
  { value: "mangofm", label: "Mango FM" },
  { value: "redfm", label: "Red FM" },
  { value: "clubfm", label: "Club FM" },
  { value: "radiomirchi", label: "Radio Mirchi" },
];

// Chart configuration with different colors for each metric
const chartConfig = {
  Initial: { label: "Initial Advertisers", color: "hsl(var(--chart-1))" }, // Blue
  New: { label: "New Advertisers", color: "hsl(var(--chart-2))" }, // Green
  Dropped: { label: "Dropped Advertisers", color: "#ff0000" }, // Red
  Final: { label: "Final Advertisers", color: "hsl(var(--chart-4))" }, // Purple
};

export default function AdvertiserChurn() {
  const [selectedStation, setSelectedStation] = useState("mangofm");
  const [selectedWeek, setSelectedWeek] = useState("week16");

  // Get data for the selected station and week
  const chartData = churnData[selectedWeek][selectedStation].data;

  const formatNumber = (value) => {
    return `${Math.abs(value)}`;
  };

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
    // Reset station selection to default when week changes
    setSelectedStation("mangofm");
  };

  return (
    <ChartCard
      icon={<AlertTriangle className="w-6 h-6" />}
      title="Advertiser Churn"
      description={`Brands That Stopped Advertising on Competitors - ${selectedWeek === "week16" ? "Week 16" : "Week 17"} (Last 30 Days)`}
      action={
        <div className="flex justify-end space-x-4">
          <Select onValueChange={handleWeekChange} defaultValue="week16">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week16">Week 16</SelectItem>
              <SelectItem value="week17">Week 17</SelectItem>
            </SelectContent>
          </Select>
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
              dataKey="metric"
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
              domain={[-10, 'auto']} // Ensure negative values are visible
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Metric: ${label}`}
                  valueFormatter={(value, name, props) => {
                    const advertisers = props.payload.advertisers || [];
                    const displayCount = advertisers.length > 5 
                      ? `${advertisers.slice(0, 5).join(", ")} and ${advertisers.length - 5} more`
                      : advertisers.join(", ");
                    return `${Math.abs(value)} (${displayCount})`;
                  }}
                />
              }
            />
            {/* <Legend /> */}
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig[entry.metric].color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing advertiser churn for {churnData[selectedWeek][selectedStation].name} in {selectedWeek === "week16" ? "Week 16" : "Week 17"}
        </p>
      }
    />
  );
}