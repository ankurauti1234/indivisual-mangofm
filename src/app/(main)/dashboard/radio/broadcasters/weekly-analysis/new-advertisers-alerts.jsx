"use client";

import { AlertCircle } from "lucide-react";
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

// New advertiser data for each station (16-04-2025 to 30-04-2025)
const newAdvertiserData = {
  clubfm: {
    name: "Club FM",
    advertisers: [
      "AQUA STAR",
      "BPL",
      "Euro Guard",
      "INTER SQUARE MALL",
      "KCG COLLEGE OF TECHNOLOGY",
      "KELVINATOR",
      "MATHRUBHUMI BOOKS",
      "NOLTA",
      "RAJAGIRI HOSPITAL",
      "SBI"
    ]
  },
  mangofm: {
    name: "Mango FM",
    advertisers: [
      "AQUA STAR",
      "BPL",
      "CENTER SQURE MALL",
      "FUTUREACE HOSPITAL",
      "KELVINATOR",
      "MUTHOOT FINANCE",
      "NISAU & EDROOTS",
      "VANITHA JEWELLERY",
      "WELCARE HOSPITAL"
    ]
  },
  radiomirchi: {
    name: "Radio Mirchi",
    advertisers: [
      "GOVT OF UTTARAKHAND",
      "KELVINATOR",
      "ORS",
      "RAJAGIRI HOSPITAL",
      "VETO",
      "WHF"
    ]
  },
  redfm: {
    name: "Red FM",
    advertisers: [
      "AQUA STAR",
      "BPL",
      "CENTER SQURE MALL",
      "FEDARAL BANK",
      "KELVINATOR",
      "NISAU & EDROOTS",
      "PITTAPPILLIL AGENCIES",
      "RAJAGIRI HOSPITAL",
      "SURYA TV"
    ]
  }
};

// Available stations
const stationOptions = [
  { value: "clubfm", label: "Club FM" },
  { value: "mangofm", label: "Mango FM" },
  { value: "radiomirchi", label: "Radio Mirchi" },
  { value: "redfm", label: "Red FM" }
];

export default function NewAdvertisersAlerts() {
  const [selectedStation, setSelectedStation] = useState("clubfm");

  // Get data for the selected station
  const selectedData = newAdvertiserData[selectedStation];

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  return (
    <ChartCard
      icon={<AlertCircle className="w-6 h-6" />}
      title="New Advertiser Alerts"
      description="Brands Recently Appearing on Competitors (16-04-2025 to 30-04-2025)"
      action={
        <div className="flex justify-end">
          <Select onValueChange={handleStationChange} defaultValue="clubfm">
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
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-left p-3 font-semibold">New Advertiser</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.advertisers.map((advertiser, index) => (
                  <tr key={advertiser} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="p-3 font-medium">{advertiser}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      footer={
        <p className="text-sm text-gray-500">
          Total: {selectedData.advertisers.length} new advertisers for {selectedData.name}
        </p>
      }
    />
  );
}