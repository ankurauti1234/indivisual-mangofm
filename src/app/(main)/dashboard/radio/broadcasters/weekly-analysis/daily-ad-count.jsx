"use client";

import { BarChart2 } from "lucide-react";
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

// Sample data for average ad counts per day across stations and weeks
const dailyAdData = {
  week16: {
    mangofm: {
      name: "Mango FM",
      data: [
        { day: "Mon", count: 120 },
        { day: "Tue", count: 130 },
        { day: "Wed", count: 125 },
        { day: "Thu", count: 140 },
        { day: "Fri", count: 150 },
        { day: "Sat", count: 160 },
        { day: "Sun", count: 110 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { day: "Mon", count: 135 },
        { day: "Tue", count: 145 },
        { day: "Wed", count: 140 },
        { day: "Thu", count: 155 },
        { day: "Fri", count: 165 },
        { day: "Sat", count: 175 },
        { day: "Sun", count: 120 },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        { day: "Mon", count: 110 },
        { day: "Tue", count: 120 },
        { day: "Wed", count: 115 },
        { day: "Thu", count: 130 },
        { day: "Fri", count: 140 },
        { day: "Sat", count: 150 },
        { day: "Sun", count: 100 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { day: "Mon", count: 145 },
        { day: "Tue", count: 155 },
        { day: "Wed", count: 150 },
        { day: "Thu", count: 165 },
        { day: "Fri", count: 175 },
        { day: "Sat", count: 185 },
        { day: "Sun", count: 130 },
      ],
    },
  },
  week17: {
    mangofm: {
      name: "Mango FM",
      data: [
        { day: "Mon", count: 125 },
        { day: "Tue", count: 135 },
        { day: "Wed", count: 130 },
        { day: "Thu", count: 145 },
        { day: "Fri", count: 155 },
        { day: "Sat", count: 165 },
        { day: "Sun", count: 115 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { day: "Mon", count: 140 },
        { day: "Tue", count: 150 },
        { day: "Wed", count: 145 },
        { day: "Thu", count: 160 },
        { day: "Fri", count: 170 },
        { day: "Sat", count: 180 },
        { day: "Sun", count: 125 },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        { day: "Mon", count: 115 },
        { day: "Tue", count: 125 },
        { day: "Wed", count: 120 },
        { day: "Thu", count: 135 },
        { day: "Fri", count: 145 },
        { day: "Sat", count: 155 },
        { day: "Sun", count: 105 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { day: "Mon", count: 150 },
        { day: "Tue", count: 160 },
        { day: "Wed", count: 155 },
        { day: "Thu", count: 170 },
        { day: "Fri", count: 180 },
        { day: "Sat", count: 190 },
        { day: "Sun", count: 135 },
      ],
    },
  },
};

// List of stations
const stations = ["mangofm", "redfm", "clubfm", "radiomirchi"];

// Chart configuration with distinct colors for each station
const chartConfig = {
  mangofm: { label: "Mango FM", color: "hsl(var(--chart-1))" },
  redfm: { label: "Red FM", color: "hsl(var(--chart-2))" },
  clubfm: { label: "Club FM", color: "hsl(var(--chart-3))" },
  radiomirchi: { label: "Radio Mirchi", color: "hsl(var(--chart-4))" },
};

export default function DailyAdCount() {
  const [selectedStation, setSelectedStation] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("week16");

  // Prepare data for bar chart
  const chartData = [
    { day: "Mon", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Mon").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Mon").count },
    { day: "Tue", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Tue").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Tue").count },
    { day: "Wed", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Wed").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Wed").count },
    { day: "Thu", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Thu").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Thu").count },
    { day: "Fri", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Fri").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Fri").count },
    { day: "Sat", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Sat").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Sat").count },
    { day: "Sun", count: selectedStation === "all" ? stations.reduce((sum, s) => sum + dailyAdData[selectedWeek][s].data.find(d => d.day === "Sun").count, 0) / stations.length : dailyAdData[selectedWeek][selectedStation].data.find(d => d.day === "Sun").count },
  ];

  const formatCount = (value) => {
    return Math.round(value);
  };

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <ChartCard
      icon={<BarChart2 className="w-6 h-6" />}
      title="Daily Ad Count"
      description={`Average Ad Counts per Day - ${selectedWeek === "week16" ? "Week 16" : "Week 17"} (2024)`}
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
          <Select onValueChange={handleStationChange} defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select station" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stations</SelectItem>
              {stations.map((station) => (
                <SelectItem key={station} value={station}>
                  {dailyAdData[selectedWeek][station].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
      chart={
        <ChartContainer config={chartConfig} className="h-96 w-full">
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
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              tickFormatter={formatCount}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={formatCount}
                  formatter={(value, name, props) => [
                    `${formatCount(value)} ads`,
                    `Station: ${selectedStation === "all" ? "Average (All Stations)" : dailyAdData[selectedWeek][selectedStation].name}`,
                  ]}
                />
              }
            />
            <Legend />
            <Bar
              dataKey="count"
              fill={selectedStation === "all" ? "hsl(var(--chart-5))" : chartConfig[selectedStation].color}
              name={selectedStation === "all" ? "Average (All Stations)" : chartConfig[selectedStation].label}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing average ad counts per day for{" "}
          {selectedStation === "all" ? "all stations" : dailyAdData[selectedWeek][selectedStation].name} in {selectedWeek === "week16" ? "Week 16" : "Week 17"}
        </p>
      }
    />
  );
}