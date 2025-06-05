"use client";

import { Target } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for brands advertising on stations by week
const stationDataByWeek = {
  week16: {
    mangofm: {
      name: "Mango FM",
      advertisers: [
        { brand: "BrandA", ads: 50 },
        { brand: "BrandB", ads: 30 },
        { brand: "BrandC", ads: 40 },
      ],
    },
    redfm: {
      name: "Red FM",
      advertisers: [
        { brand: "BrandX", ads: 50 },
        { brand: "BrandY", ads: 30 },
        { brand: "BrandZ", ads: 40 },
        { brand: "BrandAA", ads: 20 },
      ],
    },
    clubfm: {
      name: "Club FM",
      advertisers: [
        { brand: "BrandX", ads: 25 },
        { brand: "BrandY", ads: 15 },
        { brand: "BrandAB", ads: 30 },
        { brand: "BrandAC", ads: 10 },
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      advertisers: [
        { brand: "BrandY", ads: 35 },
        { brand: "BrandZ", ads: 45 },
        { brand: "BrandAA", ads: 25 },
        { brand: "BrandAD", ads: 50 },
      ],
    },
  },
  week17: {
    mangofm: {
      name: "Mango FM",
      advertisers: [
        { brand: "BrandA", ads: 55 },
        { brand: "BrandB", ads: 35 },
        { brand: "BrandC", ads: 45 },
        { brand: "BrandAE", ads: 20 }, // New brand in week 17
      ],
    },
    redfm: {
      name: "Red FM",
      advertisers: [
        { brand: "BrandX", ads: 52 },
        { brand: "BrandY", ads: 32 },
        { brand: "BrandZ", ads: 42 },
        { brand: "BrandAA", ads: 22 },
        { brand: "BrandAF", ads: 28 }, // New brand in week 17
      ],
    },
    clubfm: {
      name: "Club FM",
      advertisers: [
        { brand: "BrandX", ads: 28 },
        { brand: "BrandY", ads: 18 },
        { brand: "BrandAB", ads: 32 },
        { brand: "BrandAC", ads: 12 },
        { brand: "BrandAG", ads: 15 }, // New brand in week 17
      ],
    },
    radiomirchi: {
      name: "Radio Mirchi",
      advertisers: [
        { brand: "BrandY", ads: 38 },
        { brand: "BrandZ", ads: 48 },
        { brand: "BrandAA", ads: 28 },
        { brand: "BrandAD", ads: 53 },
        { brand: "BrandAH", ads: 30 }, // New brand in week 17
      ],
    },
  },
};

// List of stations
const stationOptions = [
  { value: "mangofm", label: "Mango FM" },
  { value: "redfm", label: "Red FM" },
  { value: "clubfm", label: "Club FM" },
  { value: "radiomirchi", label: "Radio Mirchi" },
];

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

export default function UntappedLeads() {
  const [selectedStation, setSelectedStation] = useState("mangofm");
  const [selectedWeek, setSelectedWeek] = useState("week16");

  // Get current week's data
  const currentWeekData = stationDataByWeek[selectedWeek];

  // Get brands that advertise on other stations but not on the selected station
  const getUntappedLeads = () => {
    const selectedStationAdvertisers = new Set(currentWeekData[selectedStation].advertisers.map(a => a.brand));
    const untappedLeads = [];

    // Collect brands from other stations
    Object.keys(currentWeekData).forEach(station => {
      if (station !== selectedStation) {
        currentWeekData[station].advertisers.forEach(advertiser => {
          if (!selectedStationAdvertisers.has(advertiser.brand)) {
            const existingLead = untappedLeads.find(lead => lead.brand === advertiser.brand);
            if (existingLead) {
              existingLead.stations.push(currentWeekData[station].name);
              existingLead.ads += advertiser.ads;
            } else {
              untappedLeads.push({
                brand: advertiser.brand,
                stations: [currentWeekData[station].name],
                ads: advertiser.ads,
              });
            }
          }
        });
      }
    });

    // Sort by number of ads (descending) for better prioritization
    return untappedLeads.sort((a, b) => b.ads - a.ads);
  };

  const untappedLeads = getUntappedLeads();

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <ChartCard
      icon={<Target className="w-6 h-6" />}
      title="Competitor Advertisers NOT on Your Station"
      description={`Untapped Leads Advertising on Competitors - ${selectedWeek === 'week16' ? 'Week 16' : 'Week 17'} (2024)`}
      action={
        <div className="flex gap-2">
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Competitor Stations</th>
                <th scope="col" className="px-6 py-3">Number of Ads</th>
              </tr>
            </thead>
            <tbody>
              {untappedLeads.length > 0 ? (
                untappedLeads.map((lead, index) => (
                  <tr key={lead.brand} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-medium text-gray-900">{lead.brand}</td>
                    <td className="px-6 py-4">{lead.stations.join(", ")}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.ads} ads
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-400">
                    No untapped leads found for {currentWeekData[selectedStation].name} in {selectedWeek === 'week16' ? 'Week 16' : 'Week 17'}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
      footer={
        <p className="text-sm text-gray-500">
          Showing untapped leads not advertising on {currentWeekData[selectedStation].name} in {selectedWeek === 'week16' ? 'Week 16' : 'Week 17'}
        </p>
      }
    />
  );
}