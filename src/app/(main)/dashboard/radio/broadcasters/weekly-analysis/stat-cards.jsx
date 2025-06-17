"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckSquare, ScrollText, Users, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatCards = () => {
  const [selectedWeek, setSelectedWeek] = useState("week_16");

  // Data for Week 1
  const week16Data = {
    topAdvertisersByCount: [
      { name: "Ajmal Bismi", value: 1200 },
      { name: "Govt of Kerala", value: 929 },
      { name: "Euro Guard", value: 698 },
      { name: "Anaswara Jewellers", value: 535 },
    ],
    topAdvertisersBySeconds: [
      { name: "Govt of Kerala", value: 24062 },
      { name: "Ajmal Bismi", value: 17836 },
      { name: "Malabar Gold & Diamonds", value: 13168 },
      { name: "Information & Public Relation Department", value: 12471 },
    ],
    topStationsByCount: [
      { name: "Red FM", value: 6620 },
      { name: "Club FM", value: 2687 },
      { name: "Radio Mango", value: 2505 },
      { name: "Radio Mirchi", value: 1800 },
    ],
    topStationsBySeconds: [
      { name: "Red FM", value: 86691 },
      { name: "Club FM", value: 56491 },
      { name: "Radio Mango", value: 52784 },
      { name: "Radio Mirchi", value: 31838 },
    ],
  };

  // Data for Week 2
  const week17Data = {
    topAdvertisersByCount: [
      { name: "MYG Future", value: 638 },
      { name: "Euro Guard", value: 606 },
      { name: "Anaswara Jewellers", value: 546 },
      { name: "Malabar Gold & Diamonds", value: 456 },
    ],
    topAdvertisersBySeconds: [
      { name: "Image Mobiles & Computers", value: 12288 },
      { name: "Malabar Gold & Diamonds", value: 11418 },
      { name: "Govt of Kerala", value: 10684 },
      { name: "Red FM", value: 7942 },
    ],
    topStationsByCount: [
      { name: "Red FM", value: 5455 },
      { name: "Radio Mango", value: 2064 },
      { name: "Club FM", value: 1944 },
      { name: "Radio Mirchi", value: 968 },
    ],
    topStationsBySeconds: [
      { name: "Red FM", value: 65547 },
      { name: "Radio Mango", value: 39461 },
      { name: "Club FM", value: 40821 },
      { name: "Radio Mirchi", value: 14685 },
    ],
  };

  // Select data based on the current week
  const currentData = selectedWeek === "week_16" ? week16Data : week17Data;

  const sections = [
    {
      title: "Top Advertisers by Ad Count",
      data: currentData.topAdvertisersByCount,
      description: "Advertisers with the highest number of ad plays",
      icon: <ScrollText className="text-gray-600" size={20} />,
      formatValue: (value) => `${value} plays`,
      // trend: selectedWeek === "week_16" ? "+2.1%" : "+2.5%",
      isPositive: true,
    },
    {
      title: "Top Advertisers by Airtime",
      data: currentData.topAdvertisersBySeconds,
      description: "Advertisers with the most accumulated ad seconds",
      icon: <BarChart className="text-gray-600" size={20} />,
      formatValue: (value) => `${Math.round(value / 60)} mins`,
      // trend: selectedWeek === "week_16" ? "+1.5%" : "-0.8%",
      isPositive: selectedWeek === "week_16",
    },
    {
      title: "Top Stations by Ad Count",
      data: currentData.topStationsByCount,
      description: "Radio stations with the highest number of ad plays",
      icon: <CheckSquare className="text-gray-600" size={20} />,
      formatValue: (value) => `${value} plays`,
      // trend: selectedWeek === "week_16" ? "+1.8%" : "+2.3%",
      isPositive: true,
    },
    {
      title: "Top Stations by Airtime",
      data: currentData.topStationsBySeconds,
      description: "Radio stations with the most accumulated ad seconds",
      icon: <Users className="text-gray-600" size={20} />,
      formatValue: (value) => `${Math.round(value / 60)} mins`,
      // trend: selectedWeek === "week_16" ? "+1.2%" : "-0.5%",
      isPositive: selectedWeek === "week_16",
    },
  ];

  const weeks = [
    { value: "week_16", label: "Week 16 (Apr 14-20, 2025)" },
    { value: "week_17", label: "Week 17 (Apr 21-27, 2025)" },
  ];

  const renderTrend = (trend, isPositive) => {
    if (!trend) return null;
    const color = isPositive ? "text-green-500" : "text-red-500";
    const Icon = isPositive ? ArrowUp : ArrowDown;
    return (
      <div className={`flex items-center text-xs ${color}`}>
        <Icon size={12} className="mr-1" />
        <span>{trend}</span>
        <span className="text-gray-400 text-xs ml-1">vs last month</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Week Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Ad Performance Rankings</h2>
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-56 bg-white shadow-sm border-gray-200">
            <SelectValue placeholder="Select Week" />
          </SelectTrigger>
          <SelectContent>
            {weeks.map((week) => (
              <SelectItem key={week.value} value={week.value}>
                {week.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section, index) => (
          <Card
            key={index}
            className="rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <CardHeader className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-800">
                  {section.title}
                </CardTitle>
                <div className="p-1.5 bg-gray-100 rounded-md">{section.icon}</div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{section.description}</p>
              {renderTrend(section.trend, section.isPositive)}
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {section.data.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{idx + 1}. {item.name}</span>
                    <span className="font-medium text-gray-800">
                      {section.formatValue(item.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatCards;