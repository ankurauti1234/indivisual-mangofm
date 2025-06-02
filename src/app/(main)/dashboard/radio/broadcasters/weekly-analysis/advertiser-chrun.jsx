"use client";

import { BarChart2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

// Sample data for advertiser churn across stations
const churnData = {
  mangofm: {
    name: "Mango FM",
    data: [
      { status: "New", count: 5, fill: "hsl(var(--chart-1))", advertisers: ["BrandK", "BrandL", "BrandM", "BrandN", "BrandO"] },
      { status: "Dropped", count: -3, fill: "hsl(var(--chart-5))", advertisers: ["BrandA", "BrandB", "BrandC"] },
    ],
  },
  redfm: {
    name: "Red FM",
    data: [
      { status: "New", count: 4, fill: "hsl(var(--chart-1))", advertisers: ["BrandP", "BrandQ", "BrandR", "BrandS"] },
      { status: "Dropped", count: -4, fill: "hsl(var(--chart-5))", advertisers: ["BrandD", "BrandE", "BrandF", "BrandG"] },
    ],
  },
  clubfm: {
    name: "Club FM",
    data: [
      { status: "New", count: 6, fill: "hsl(var(--chart-1))", advertisers: ["BrandT", "BrandU", "BrandV", "BrandW", "BrandX", "BrandY"] },
      { status: "Dropped", count: -2, fill: "hsl(var(--chart-5))", advertisers: ["BrandH", "BrandI"] },
    ],
  },
  radiomirchi: {
    name: "Radio Mirchi",
    data: [
      { status: "New", count: 3, fill: "hsl(var(--chart-1))", advertisers: ["BrandZ", "BrandAA", "BrandAB"] },
      { status: "Dropped", count: -5, fill: "hsl(var(--chart-5))", advertisers: ["BrandJ", "BrandK", "BrandL", "BrandM", "BrandN"] },
    ],
  },
};

const chartConfig = {
  New: {
    label: "New Advertisers",
    color: "hsl(var(--chart-1))",
  },
  Dropped: {
    label: "Dropped Advertisers",
    color: "hsl(var(--chart-5))",
  },
  mangofm: {
    label: "Mango FM",
  },
  redfm: {
    label: "Red FM",
  },
  clubfm: {
    label: "Club FM",
  },
  radiomirchi: {
    label: "Radio Mirchi",
  },
};

export default function AdvertiserChurn() {
  const [selectedStation, setSelectedStation] = useState("mangofm");

  // Prepare data for bar chart (use selected station or aggregate for 'all')
  const chartData = selectedStation === "all"
    ? [
        {
          station: "All Stations",
          New: Object.values(churnData).reduce(
            (sum, station) => sum + (station.data.find((d) => d.status === "New")?.count || 0),
            0
          ),
          Dropped: Object.values(churnData).reduce(
            (sum, station) => sum + (station.data.find((d) => d.status === "Dropped")?.count || 0),
            0
          ),
          droppedAdvertisers: [
            ...new Set(
              Object.values(churnData)
                .flatMap((station) => station.data.find((d) => d.status === "Dropped")?.advertisers || [])
                .slice(0, 5)
            ),
          ],
        },
      ]
    : [
        {
          station: selectedStation,
          New: churnData[selectedStation].data.find((d) => d.status === "New")?.count || 0,
          Dropped: churnData[selectedStation].data.find((d) => d.status === "Dropped")?.count || 0,
          droppedAdvertisers: churnData[selectedStation].data.find((d) => d.status === "Dropped")?.advertisers || [],
        },
      ];

  const formatCount = (value) => {
    return value >= 0 ? `+${value}` : `${value}`;
  };

  return (
    <ChartCard
      icon={<BarChart2 className="w-6 h-6" />}
      title="Advertiser Churn"
      description="Who Dropped Off Competitors? 2024"
      action={
        <div className="flex justify-end">
          <Select
            onValueChange={setSelectedStation}
            defaultValue="mangofm"
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select station" />
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
              dataKey="station"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (value === "All Stations" ? value : chartConfig[value]?.label)}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={8}
              tickFormatter={formatCount}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => {
                    if (name === "Dropped") {
                      return [
                        formatCount(value),
                        `Dropped Advertisers: ${props.payload.droppedAdvertisers.join(", ")}`,
                      ];
                    }
                    return [formatCount(value), name];
                  }}
                />
              }
            />
            <Bar
              dataKey="New"
              fill={chartConfig.New.color}
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey="Dropped"
              fill={chartConfig.Dropped.color}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing advertiser churn for{" "}
          {selectedStation === "all" ? "all stations" : churnData[selectedStation].name}
        </p>
      }
    />
  );
}