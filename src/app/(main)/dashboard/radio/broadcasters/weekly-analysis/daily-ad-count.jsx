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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Sample data
const dailyAdData = {
  week16: {
    clubfm: {
      name: "Club FM",
      data: [
        { day: "Thu", count: 440, seconds: 8702 },
        { day: "Fri", count: 407, seconds: 8452 },
        { day: "Sat", count: 483, seconds: 11049 },
        { day: "Sun", count: 427, seconds: 7477 },
        { day: "Mon", count: 281, seconds: 6556 },
        { day: "Tue", count: 262, seconds: 6004 },
        { day: "Wed", count: 387, seconds: 8326 },
      ],
    },
    mangofm: {
      name: "Mango FM",
      data: [
        { day: "Thu", count: 461, seconds: 10111 },
        { day: "Fri", count: 479, seconds: 10344 },
        { day: "Sat", count: 353, seconds: 7151 },
        { day: "Sun", count: 293, seconds: 5698 },
        { day: "Mon", count: 280, seconds: 6167 },
        { day: "Tue", count: 286, seconds: 6207 },
        { day: "Wed", count: 353, seconds: 7110 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { day: "Thu", count: 347, seconds: 6472 },
        { day: "Fri", count: 355, seconds: 6162 },
        { day: "Sat", count: 351, seconds: 5767 },
        { day: "Sun", count: 220, seconds: 4948 },
        { day: "Mon", count: 0, seconds: 0 },
        { day: "Tue", count: 250, seconds: 4176 },
        { day: "Wed", count: 287, seconds: 5060 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { day: "Thu", count: 1112, seconds: 15172 },
        { day: "Fri", count: 1011, seconds: 12686 },
        { day: "Sat", count: 929, seconds: 12163 },
        { day: "Sun", count: 813, seconds: 11136 },
        { day: "Mon", count: 896, seconds: 11833 },
        { day: "Tue", count: 905, seconds: 11264 },
        { day: "Wed", count: 956, seconds: 12611 },
      ],
    },
  },
  week17: {
    clubfm: {
      name: "Club FM",
      data: [
        { day: "Thu", count: 383, seconds: 7090 },
        { day: "Fri", count: 298, seconds: 6123 },
        { day: "Sat", count: 309, seconds: 6444 },
        { day: "Sun", count: 0, seconds: 0 },
        { day: "Mon", count: 282, seconds: 6076 },
        { day: "Tue", count: 326, seconds: 7370 },
        { day: "Wed", count: 350, seconds: 8200 },
      ],
    },
    mangofm: {
      name: "Mango FM",
      data: [
        { day: "Thu", count: 412, seconds: 8221 },
        { day: "Fri", count: 299, seconds: 5658 },
        { day: "Sun", count: 271, seconds: 5050 },
        { day: "Sat", count: 192, seconds: 3501 },
        { day: "Mon", count: 274, seconds: 4970 },
        { day: "Tue", count: 300, seconds: 5884 },
        { day: "Wed", count: 316, seconds: 6386 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { day: "Thu", count: 251, seconds: 3894 },
        { day: "Fri", count: 242, seconds: 3741 },
        { day: "Sat", count: 213, seconds: 2851 },
        { day: "Sun", count: 0, seconds: 0 },
        { day: "Mon", count: 265, seconds: 4378 },
        { day: "Tue", count: 0, seconds: 0 },
        { day: "Wed", count: 0, seconds: 0 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { day: "Thu", count: 928, seconds: 11535 },
        { day: "Fri", count: 767, seconds: 9612 },
        { day: "Sat", count: 737, seconds: 7603 },
        { day: "Sun", count: 531, seconds: 6662 },
        { day: "Mon", count: 771, seconds: 8704 },
        { day: "Tue", count: 843, seconds: 10893 },
        { day: "Wed", count: 891, seconds: 12039 },
      ],
    },
  },
};

// List of stations
const stations = ["mangofm", "redfm", "clubfm", "radiomirchi"];

// Chart configuration
const chartConfig = {
  mangofm: { label: "Mango FM", color: "hsl(var(--chart-1))" },
  redfm: { label: "Red FM", color: "hsl(var(--chart-2))" },
  clubfm: { label: "Club FM", color: "hsl(var(--chart-3))" },
  radiomirchi: { label: "Radio Mirchi", color: "hsl(var(--chart-4))" },
};

export default function DailyAdCount() {
  const [selectedStation, setSelectedStation] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("week16");
  const [showSeconds, setShowSeconds] = useState(false);

  // Prepare data for bar chart
  const chartData = [
    {
      day: "Mon",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Mon")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Mon")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Tue",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Tue")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Tue")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Wed",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Wed")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Wed")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Thu",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Thu")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Thu")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Fri",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Fri")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Fri")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Sat",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Sat")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Sat")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
    {
      day: "Sun",
      ...(selectedStation === "all"
        ? stations.reduce(
            (acc, s) => ({
              ...acc,
              [s]: dailyAdData[selectedWeek][s].data.find((d) => d.day === "Sun")[showSeconds ? "seconds" : "count"] || 0,
            }),
            {},
          )
        : {
            count:
              dailyAdData[selectedWeek][selectedStation].data.find((d) => d.day === "Sun")[showSeconds ? "seconds" : "count"] || 0,
          }),
    },
  ];

  const formatValue = (value) => {
    return Math.round(value).toLocaleString() + (showSeconds ? "s" : "");
  };

  return (
    <ChartCard
      icon={<BarChart2 className="w-6 h-6" />}
      title={showSeconds ? "Daily Ad Duration" : "Daily Ad Count"}
      description={`${showSeconds ? "Total Ad Duration (seconds)" : "Total Ad Counts"} per Day - ${
        selectedWeek === "week16" ? "Week 16" : "Week 17"
      } (2024)`}
      action={
        <div className="flex justify-end space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch id="unit-toggle" checked={showSeconds} onCheckedChange={setShowSeconds} />
            <Label htmlFor="unit-toggle">{showSeconds ? "Seconds" : "Counts"}</Label>
          </div>
          <Select onValueChange={setSelectedWeek} defaultValue="week16">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week16">Week 16</SelectItem>
              <SelectItem value="week17">Week 17</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedStation} defaultValue="all">
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
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={6} tickFormatter={formatValue} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={formatValue}
                  formatter={(value, name) => {
                    const stationId = selectedStation === "all" ? name : selectedStation;
                    const stationLabel =
                      selectedStation === "all"
                        ? chartConfig[stationId]?.label || dailyAdData[selectedWeek][stationId]?.name || "Unknown"
                        : dailyAdData[selectedWeek][selectedStation].name;
                    return [`${formatValue(value)} ${showSeconds ? "seconds" : "ads"}`, `Station: ${stationLabel}`];
                  }}
                />
              }
            />
            <Legend />
            {selectedStation === "all" ? (
              stations.map((station, index) => (
                <Bar
                  key={station}
                  dataKey={station}
                  fill={chartConfig[station].color}
                  name={chartConfig[station].label}
                  stackId="a"
                  radius={index === stations.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey="count"
                fill={chartConfig[selectedStation].color}
                name={chartConfig[selectedStation].label}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing {showSeconds ? "total ad duration" : "total ad counts"} per day for{" "}
          {selectedStation === "all" ? "all stations" : dailyAdData[selectedWeek][selectedStation].name} in{" "}
          {selectedWeek === "week16" ? "Week 16" : "Week 17"}
        </p>
      }
    />
  );
}