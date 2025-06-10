"use client";

import { Users } from "lucide-react";
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
import { week16, week17 } from "./top-ad-data"; // Import the JSON data

// Derive shared advertiser data from week16 and week17
const deriveSharedAdvertiserData = (weekData) => {
  const brands = new Set(weekData.map((item) => item.Brand));
  const sharedData = {};

  brands.forEach((brand) => {
    const brandData = weekData.find((item) => item.Brand === brand);
    const stations = [
      { name: "Mango FM", key: "Mango FM" },
      { name: "Red FM", key: "Red FM" },
      { name: "Club FM", key: "Club FM" },
      { name: "Radio Mirchi", key: "Radio Mirchi" },
    ];

    // Calculate total spend across all stations
    const totalSpend = stations.reduce(
      (sum, station) => sum + (brandData[station.key] || 0),
      0
    );

    // Only include brands with spend on at least two stations
    const activeStations = stations.filter(
      (station) => (brandData[station.key] || 0) > 0
    ).length;

    if (activeStations >= 2 && totalSpend > 0) {
      sharedData[brand] = {
        name: brand,
        data: stations.map((station) => ({
          station: station.name,
          percentage:
            totalSpend > 0
              ? Math.round(((brandData[station.key] || 0) / totalSpend) * 100)
              : 0,
        })),
      };
    }
  });

  return sharedData;
};

// Prepare shared advertiser data
const sharedAdvertiserData = {
  week16: deriveSharedAdvertiserData(week16),
  week17: deriveSharedAdvertiserData(week17),
};

// List of major advertisers (brands advertising on at least two stations)
const majorAdvertisers = Object.keys(sharedAdvertiserData.week16).filter(
  (brand) => brand in sharedAdvertiserData.week17
);

// Chart configuration with distinct colors for each station
const chartConfig = {
  mangofm: { label: "Mango FM", color: "hsl(var(--chart-1))" }, // Blue
  redfm: { label: "Red FM", color: "hsl(var(--chart-2))" }, // Green
  clubfm: { label: "Club FM", color: "hsl(var(--chart-3))" }, // Yellow
  radiomirchi: { label: "Radio Mirchi", color: "hsl(var(--chart-4))" }, // Purple
};

export default function SharedAdvertisers() {
  const [selectedAdvertisers, setSelectedAdvertisers] = useState(majorAdvertisers);
  const [selectedWeek, setSelectedWeek] = useState("week16");

  // Prepare data for horizontal stacked chart
  const chartData = majorAdvertisers
    .filter((adv) => selectedAdvertisers.includes(adv) || selectedAdvertisers.includes("all"))
    .map((adv) => ({
      advertiser: adv,
      ...Object.fromEntries(
        sharedAdvertiserData[selectedWeek][adv].data.map((d) => [
          d.station.toLowerCase().replace(" ", ""),
          d.percentage,
        ])
      ),
    }));

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const handleAdvertiserChange = (value) => {
    if (value === "all") {
      setSelectedAdvertisers(majorAdvertisers);
    } else {
      setSelectedAdvertisers([value]);
    }
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <ChartCard
      icon={<Users className="w-6 h-6" />}
      title="Shared Advertisers"
      description={`Advertisers Running Spots Across Multiple Stations (2024) - ${
        selectedWeek === "week16" ? "Week 16" : "Week 17"
      }`}
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
          <Select onValueChange={handleAdvertiserChange} defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select advertiser(s)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Advertisers</SelectItem>
              {majorAdvertisers.map((adv) => (
                <SelectItem key={adv} value={adv}>
                  {sharedAdvertiserData[selectedWeek][adv].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
      chart={
        <ChartContainer config={chartConfig} className="min-h-64 h-[600px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 66,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="advertiser"
              type="category"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) => sharedAdvertiserData[selectedWeek][value].name}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              tickFormatter={formatPercentage}
              domain={[0, 100]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  // hideLabel
                  valueFormatter={formatPercentage}
                  formatter={(value, name) => [
                    formatPercentage(value),
                    `Station: ${chartConfig[name]?.label || name}`,
                  ]}
                />
              }
            />
            <Legend />
            <Bar
            barSize={180}
              dataKey="mangofm"
              stackId="a"
              fill={chartConfig.mangofm.color}
              name={chartConfig.mangofm.label}
            />
            <Bar
            barSize={180}
              dataKey="redfm"
              stackId="a"
              fill={chartConfig.redfm.color}
              name={chartConfig.redfm.label}
            />
            <Bar
            barSize={180}
              dataKey="clubfm"
              stackId="a"
              fill={chartConfig.clubfm.color}
              name={chartConfig.clubfm.label}
            />
            <Bar
            barSize={180}
              dataKey="radiomirchi"
              stackId="a"
              fill={chartConfig.radiomirchi.color}
              name={chartConfig.radiomirchi.label}
            />
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing ad spend distribution for{" "}
          {selectedAdvertisers.length === majorAdvertisers.length
            ? "all shared advertisers"
            : selectedAdvertisers
                .map((a) => sharedAdvertiserData[selectedWeek][a].name)
                .join(", ")}{" "}
          in {selectedWeek === "week16" ? "Week 16" : "Week 17"}
        </p>
      }
    />
  );
}