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

// Sample data for shared advertisers across stations and weeks
const sharedAdvertiserData = {
  week16: {
    BrandA: {
      name: "Brand A",
      data: [
        { station: "Mango FM", percentage: 30 },
        { station: "Red FM", percentage: 40 },
        { station: "Club FM", percentage: 20 },
        { station: "Radio Mirchi", percentage: 10 },
      ],
    },
    BrandB: {
      name: "Brand B",
      data: [
        { station: "Mango FM", percentage: 25 },
        { station: "Red FM", percentage: 35 },
        { station: "Club FM", percentage: 30 },
        { station: "Radio Mirchi", percentage: 10 },
      ],
    },
    BrandC: {
      name: "Brand C",
      data: [
        { station: "Mango FM", percentage: 15 },
        { station: "Red FM", percentage: 45 },
        { station: "Club FM", percentage: 25 },
        { station: "Radio Mirchi", percentage: 15 },
      ],
    },
    BrandD: {
      name: "Brand D",
      data: [
        { station: "Mango FM", percentage: 20 },
        { station: "Red FM", percentage: 30 },
        { station: "Club FM", percentage: 35 },
        { station: "Radio Mirchi", percentage: 15 },
      ],
    },
    BrandE: {
      name: "Brand E",
      data: [
        { station: "Mango FM", percentage: 40 },
        { station: "Red FM", percentage: 20 },
        { station: "Club FM", percentage: 20 },
        { station: "Radio Mirchi", percentage: 20 },
      ],
    },
  },
  week17: {
    BrandA: {
      name: "Brand A",
      data: [
        { station: "Mango FM", percentage: 32 },
        { station: "Red FM", percentage: 38 },
        { station: "Club FM", percentage: 22 },
        { station: "Radio Mirchi", percentage: 8 },
      ],
    },
    BrandB: {
      name: "Brand B",
      data: [
        { station: "Mango FM", percentage: 27 },
        { station: "Red FM", percentage: 33 },
        { station: "Club FM", percentage: 32 },
        { station: "Radio Mirchi", percentage: 8 },
      ],
    },
    BrandC: {
      name: "Brand C",
      data: [
        { station: "Mango FM", percentage: 17 },
        { station: "Red FM", percentage: 43 },
        { station: "Club FM", percentage: 27 },
        { station: "Radio Mirchi", percentage: 13 },
      ],
    },
    BrandD: {
      name: "Brand D",
      data: [
        { station: "Mango FM", percentage: 22 },
        { station: "Red FM", percentage: 28 },
        { station: "Club FM", percentage: 37 },
        { station: "Radio Mirchi", percentage: 13 },
      ],
    },
    BrandE: {
      name: "Brand E",
      data: [
        { station: "Mango FM", percentage: 42 },
        { station: "Red FM", percentage: 18 },
        { station: "Club FM", percentage: 22 },
        { station: "Radio Mirchi", percentage: 18 },
      ],
    },
  },
};

// List of major advertisers
const majorAdvertisers = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE"];

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
        sharedAdvertiserData[selectedWeek][adv].data.map((d) => [d.station.toLowerCase().replace(" ", ""), d.percentage])
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
      description={`Advertisers Running Spots Across Multiple Stations (2024) - ${selectedWeek === "week16" ? "Week 16" : "Week 17"}`}
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
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 16,
            }}
            height={300}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="advertiser"
              type="category"
              tickLine={false}
              tickMargin={10}
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
                  hideLabel
                  valueFormatter={formatPercentage}
                />
              }
            />
            <Legend />
            <Bar dataKey="mangofm" stackId="a" fill={chartConfig.mangofm.color} name={chartConfig.mangofm.label} />
            <Bar dataKey="redfm" stackId="a" fill={chartConfig.redfm.color} name={chartConfig.redfm.label} />
            <Bar dataKey="clubfm" stackId="a" fill={chartConfig.clubfm.color} name={chartConfig.clubfm.label} />
            <Bar dataKey="radiomirchi" stackId="a" fill={chartConfig.radiomirchi.color} name={chartConfig.radiomirchi.label} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing ad spot distribution for{" "}
          {selectedAdvertisers.length === majorAdvertisers.length
            ? "all advertisers"
            : selectedAdvertisers.map((a) => sharedAdvertiserData[selectedWeek][a].name).join(", ")} in {selectedWeek === "week16" ? "Week 16" : "Week 17"}
        </p>
      }
    />
  );
}