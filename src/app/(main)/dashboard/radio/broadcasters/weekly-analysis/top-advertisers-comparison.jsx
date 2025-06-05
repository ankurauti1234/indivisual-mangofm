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

// Sample data for top advertisers across stations for different weeks
const advertiserDataByWeek = {
  week16: {
    mangofm: {
      name: "Mango FM",
      data: [
        { advertiser: "BrandA", spend: 1200000 },
        { advertiser: "BrandB", spend: 1000000 },
        { advertiser: "BrandC", spend: 800000 },
        { advertiser: "BrandD", spend: 600000 },
        { advertiser: "BrandE", spend: 500000 },
        { advertiser: "BrandF", spend: 400000 },
        { advertiser: "BrandG", spend: 350000 },
        { advertiser: "BrandH", spend: 300000 },
        { advertiser: "BrandI", spend: 250000 },
        { advertiser: "BrandJ", spend: 200000 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { advertiser: "BrandA", spend: 1400000 },
        { advertiser: "BrandB", spend: 1100000 },
        { advertiser: "BrandC", spend: 900000 },
        { advertiser: "BrandD", spend: 700000 },
        { advertiser: "BrandE", spend: 600000 },
        { advertiser: "BrandF", spend: 450000 },
        { advertiser: "BrandG", spend: 400000 },
        { advertiser: "BrandH", spend: 350000 },
        { advertiser: "BrandI", spend: 300000 },
        { advertiser: "BrandJ", spend: 250000 },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        { advertiser: "BrandA", spend: 1000000 },
        { advertiser: "BrandB", spend: 900000 },
        { advertiser: "BrandC", spend: 700000 },
        { advertiser: "BrandD", spend: 500000 },
        { advertiser: "BrandE", spend: 400000 },
        { advertiser: "BrandF", spend: 350000 },
        { advertiser: "BrandG", spend: 300000 },
        { advertiser: "BrandH", spend: 250000 },
        { advertiser: "BrandI", spend: 200000 },
        { advertiser: "BrandJ", spend: 150000 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { advertiser: "BrandA", spend: 1600000 },
        { advertiser: "BrandB", spend: 1300000 },
        { advertiser: "BrandC", spend: 1000000 },
        { advertiser: "BrandD", spend: 800000 },
        { advertiser: "BrandE", spend: 700000 },
        { advertiser: "BrandF", spend: 600000 },
        { advertiser: "BrandG", spend: 500000 },
        { advertiser: "BrandH", spend: 450000 },
        { advertiser: "BrandI", spend: 400000 },
        { advertiser: "BrandJ", spend: 350000 },
      ],
    },
  },
  week17: {
    mangofm: {
      name: "Mango FM",
      data: [
        { advertiser: "BrandA", spend: 1350000 },
        { advertiser: "BrandB", spend: 1150000 },
        { advertiser: "BrandC", spend: 850000 },
        { advertiser: "BrandD", spend: 650000 },
        { advertiser: "BrandE", spend: 550000 },
        { advertiser: "BrandF", spend: 420000 },
        { advertiser: "BrandG", spend: 380000 },
        { advertiser: "BrandH", spend: 320000 },
        { advertiser: "BrandI", spend: 270000 },
        { advertiser: "BrandJ", spend: 220000 },
      ],
    },
    redfm: {
      name: "Red FM",
      data: [
        { advertiser: "BrandA", spend: 1500000 },
        { advertiser: "BrandB", spend: 1200000 },
        { advertiser: "BrandC", spend: 950000 },
        { advertiser: "BrandD", spend: 750000 },
        { advertiser: "BrandE", spend: 650000 },
        { advertiser: "BrandF", spend: 480000 },
        { advertiser: "BrandG", spend: 430000 },
        { advertiser: "BrandH", spend: 370000 },
        { advertiser: "BrandI", spend: 320000 },
        { advertiser: "BrandJ", spend: 280000 },
      ],
    },
    clubfm: {
      name: "Club FM",
      data: [
        { advertiser: "BrandA", spend: 1100000 },
        { advertiser: "BrandB", spend: 980000 },
        { advertiser: "BrandC", spend: 750000 },
        { advertiser: "BrandD", spend: 550000 },
        { advertiser: "BrandE", spend: 450000 },
        { advertiser: "BrandF", spend: 380000 },
        { advertiser: "BrandG", spend: 330000 },
        { advertiser: "BrandH", spend: 280000 },
        { advertiser: "BrandI", spend: 230000 },
        { advertiser: "BrandJ", spend: 180000 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      data: [
        { advertiser: "BrandA", spend: 1750000 },
        { advertiser: "BrandB", spend: 1400000 },
        { advertiser: "BrandC", spend: 1100000 },
        { advertiser: "BrandD", spend: 850000 },
        { advertiser: "BrandE", spend: 750000 },
        { advertiser: "BrandF", spend: 650000 },
        { advertiser: "BrandG", spend: 550000 },
        { advertiser: "BrandH", spend: 480000 },
        { advertiser: "BrandI", spend: 430000 },
        { advertiser: "BrandJ", spend: 380000 },
      ],
    },
  },
};

// List of top 10 advertisers
const topAdvertisers = [
  "BrandA",
  "BrandB",
  "BrandC",
  "BrandD",
  "BrandE",
  "BrandF",
  "BrandG",
  "BrandH",
  "BrandI",
  "BrandJ",
];

const chartConfig = {
  BrandA: { label: "Brand A", color: "hsl(var(--chart-1))" },
  BrandB: { label: "Brand B", color: "hsl(var(--chart-2))" },
  BrandC: { label: "Brand C", color: "hsl(var(--chart-3))" },
  BrandD: { label: "Brand D", color: "hsl(var(--chart-4))" },
  BrandE: { label: "Brand E", color: "hsl(var(--chart-5))" },
  BrandF: { label: "Brand F", color: "hsl(var(--chart-6))" },
  BrandG: { label: "Brand G", color: "hsl(var(--chart-7))" },
  BrandH: { label: "Brand H", color: "hsl(var(--chart-8))" },
  BrandI: { label: "Brand I", color: "hsl(var(--chart-9))" },
  BrandJ: { label: "Brand J", color: "hsl(var(--chart-10))" },
  mangofm: { label: "Mango FM" },
  redfm: { label: "Red FM" },
  clubfm: { label: "Club FM" },
  radiomirchi: { label: "Radio Mirchi" },
};

function ChartCard({ icon, title, description, action, chart, footer }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
        {action}
      </CardHeader>
      <CardContent>
        {chart}
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  );
}

export default function TopAdvertisersComparison() {
  const [selectedAdvertisers, setSelectedAdvertisers] = useState(["BrandA"]);
  const [selectedWeek, setSelectedWeek] = useState("week16");

  // Get current week's data
  const currentWeekData = advertiserDataByWeek[selectedWeek];

  // Prepare data for horizontal stacked chart
  const chartData = [
    {
      station: "mangofm",
      ...Object.fromEntries(
        topAdvertisers.map((adv) => [
          adv,
          selectedAdvertisers.includes(adv)
            ? currentWeekData["mangofm"].data.find((d) => d.advertiser === adv)
                ?.spend || 0
            : 0,
        ])
      ),
    },
    {
      station: "redfm",
      ...Object.fromEntries(
        topAdvertisers.map((adv) => [
          adv,
          selectedAdvertisers.includes(adv)
            ? currentWeekData["redfm"].data.find((d) => d.advertiser === adv)
                ?.spend || 0
            : 0,
        ])
      ),
    },
    {
      station: "clubfm",
      ...Object.fromEntries(
        topAdvertisers.map((adv) => [
          adv,
          selectedAdvertisers.includes(adv)
            ? currentWeekData["clubfm"].data.find((d) => d.advertiser === adv)
                ?.spend || 0
            : 0,
        ])
      ),
    },
    {
      station: "radiomirchi",
      ...Object.fromEntries(
        topAdvertisers.map((adv) => [
          adv,
          selectedAdvertisers.includes(adv)
            ? currentWeekData["radiomirchi"].data.find(
                (d) => d.advertiser === adv
              )?.spend || 0
            : 0,
        ])
      ),
    },
  ];

  const formatCurrency = (value) => {
    return `INR ${(value / 1000000).toFixed(2)}M`;
  };

  const handleAdvertiserSelectChange = (value) => {
    if (value === "all") {
      setSelectedAdvertisers(topAdvertisers);
    } else {
      setSelectedAdvertisers([value]);
    }
  };

  const handleWeekSelectChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <ChartCard
      icon={<BarChart2 className="w-6 h-6" />}
      title="Top Advertisers Comparison"
      description={`Your Station vs. Competitors - ${selectedWeek === 'week16' ? 'Week 16' : 'Week 17'} 2024`}
      action={
        <div className="flex gap-2">
          <Select onValueChange={handleWeekSelectChange} defaultValue="week16">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week16">Week 16</SelectItem>
              <SelectItem value="week17">Week 17</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleAdvertiserSelectChange} defaultValue="BrandA">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select advertiser(s)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Advertisers</SelectItem>
              {topAdvertisers.map((adv) => (
                <SelectItem key={adv} value={adv}>
                  {chartConfig[adv].label}
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
              dataKey="station"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis
              type="number"
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
            {selectedAdvertisers.map((adv) => (
              <Bar
                key={adv}
                dataKey={adv}
                stackId="a"
                fill={chartConfig[adv].color}
                radius={selectedAdvertisers.length === 1 ? 16 : [4, 0, 0, 4]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing ad spend distribution for{" "}
          {selectedAdvertisers.length === topAdvertisers.length
            ? "all advertisers"
            : selectedAdvertisers.map((a) => chartConfig[a].label).join(", ")}{" "}
          in {selectedWeek === 'week16' ? 'Week 16' : 'Week 17'}
        </p>
      }
    />
  );
}