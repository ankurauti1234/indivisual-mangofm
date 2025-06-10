'use client'
import React from 'react'
import StatCards from './stat-cards'
import RadioAdHeatmap from './ad-count-heatmap'
import RadioSectorAnalysis from './comperative-bar'
import IndustryAdSpend from './industry-ad-spend'
import TopAdvertisersComparison from './top-advertisers-comparison'
import AdDurationAnalysis from './ad-duration-analysis'
import AdvertiserChurn from './advertiser-chrun'
import TVChannelTreemap from './sectors-treemap'
import NewAdvertisersAlerts from './new-advertisers-alerts'
import SharedAdvertisers from './shared-advertizers'
import WhyUsBattleCards from './whu-us-battle-cards'
import UntappedLeads from './untapped-leads'
import DailyAdsLineChart from './daily-ads-line-chart'
import DailyAdCount from './daily-ad-count'

const RadioDashboard = () => {
  return (
    <div className='space-y-6'>

      <StatCards />
      <RadioAdHeatmap />
      <RadioSectorAnalysis />
      <TVChannelTreemap />


      <IndustryAdSpend/>
      <DailyAdsLineChart/>
      <TopAdvertisersComparison />
      <UntappedLeads />
      <DailyAdCount/>
      <AdDurationAnalysis />
      <SharedAdvertisers />
      <NewAdvertisersAlerts />
      <AdvertiserChurn />
      <WhyUsBattleCards/>
  
    </div>
  );
}

export default RadioDashboard