"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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

// Sample data for different radio stations and weeks with daily ad counts
const dailyAdsData = {
  week16: [
    { date: "Thu 16 May", day: "Thursday", mangofm: 52, redfm: 54, clubfm: 35, radiomirchi: 67 },
    { date: "Fri 17 May", day: "Friday", mangofm: 58, redfm: 63, clubfm: 38, radiomirchi: 70 },
    { date: "Sat 18 May", day: "Saturday", mangofm: 46, redfm: 50, clubfm: 45, radiomirchi: 56 },
    { date: "Sun 19 May", day: "Sunday", mangofm: 42, redfm: 48, clubfm: 34, radiomirchi: 52 },
    { date: "Mon 20 May", day: "Monday", mangofm: 47, redfm: 55, clubfm: 40, radiomirchi: 63 },
    { date: "Tue 21 May", day: "Tuesday", mangofm: 45, redfm: 58, clubfm: 44, radiomirchi: 60 },
    { date: "Wed 22 May", day: "Wednesday", mangofm: 50, redfm: 59, clubfm: 48, radiomirchi: 68 },
  ],
  week17: [
    { date: "Thu 23 May", day: "Thursday", mangofm: 53, redfm: 56, clubfm: 41, radiomirchi: 64 },
    { date: "Fri 24 May", day: "Friday", mangofm: 60, redfm: 65, clubfm: 36, radiomirchi: 72 },
    { date: "Sat 25 May", day: "Saturday", mangofm: 44, redfm: 52, clubfm: 47, radiomirchi: 54 },
    { date: "Sun 26 May", day: "Sunday", mangofm: 39, redfm: 44, clubfm: 31, radiomirchi: 50 },
    { date: "Mon 27 May", day: "Monday", mangofm: 49, redfm: 51, clubfm: 38, radiomirchi: 58 },
    { date: "Tue 28 May", day: "Tuesday", mangofm: 54, redfm: 59, clubfm: 43, radiomirchi: 67 },
    { date: "Wed 29 May", day: "Wednesday", mangofm: 57, redfm: 60, clubfm: 46, radiomirchi: 69 },
    { date: "Thu 30 May", day: "Thursday", mangofm: 51, redfm: 57, clubfm: 39, radiomirchi: 61 },
  ]
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
};

export default function DailyAdsLineChart() {
  const [selectedWeek, setSelectedWeek] = useState("week16");

  const chartData = dailyAdsData[selectedWeek];

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  const CustomDot = (props) => {
    const { cx, cy, payload, dataKey } = props;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill={chartConfig[dataKey]?.color}
          stroke="#fff"
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fontSize={10}
          fill={chartConfig[dataKey]?.color}
          fontWeight="600"
        >
          {payload[dataKey]}
        </text>
      </g>
    );
  };

  return (
    <ChartCard
      icon={<TrendingUp className="w-6 h-6" />}
      title="Daily Ad Count Trends"
      description={`Weekly Performance Analysis - ${selectedWeek === "week16" ? "Week 16" : "Week 17"} 2024`}
      action={
        <div className="flex justify-end">
          <Select onValueChange={handleWeekChange} defaultValue="week16">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week16">Week 16</SelectItem>
              <SelectItem value="week17">Week 17</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
      chart={
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              right: 24,
              bottom: 24,
              left: 24,
            }}
            height={300}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--muted-foreground))"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              textAnchor="end"
              height={60}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              fontSize={12}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  formatter={(value, name) => [
                    `${value} ads`,
                    chartConfig[name]?.label || name,
                  ]}
                />
              }
            />
            <Line
              type="linear"
              dataKey="mangofm"
              stroke={chartConfig.mangofm.color}
              strokeWidth={3}
              dot={<CustomDot dataKey="mangofm" />}
              activeDot={{ r: 6, stroke: chartConfig.mangofm.color, strokeWidth: 4, fill: "#fff" }}
            />
            <Line
              type="linear"
              dataKey="redfm"
              stroke={chartConfig.redfm.color}
              strokeWidth={3}
              dot={<CustomDot dataKey="redfm" />}
              activeDot={{ r: 6, stroke: chartConfig.redfm.color, strokeWidth: 4, fill: "#fff" }}
            />
            <Line
              type="linear"
              dataKey="clubfm"
              stroke={chartConfig.clubfm.color}
              strokeWidth={3}
              dot={<CustomDot dataKey="clubfm" />}
              activeDot={{ r: 6, stroke: chartConfig.clubfm.color, strokeWidth: 4, fill: "#fff" }}
            />
            <Line
              type="linear"
              dataKey="radiomirchi"
              stroke={chartConfig.radiomirchi.color}
              strokeWidth={3}
              dot={<CustomDot dataKey="radiomirchi" />}
              activeDot={{ r: 6, stroke: chartConfig.radiomirchi.color, strokeWidth: 4, fill: "#fff" }}
            />
          </LineChart>
        </ChartContainer>
      }
      footer={
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-4 text-sm">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Daily ad count trends for {selectedWeek === "week16" ? "Week 16 (May 13-19)" : "Week 17 (May 20-26)"} showing all radio stations
          </p>
        </div>
      }
    />
  );
}