import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { inter } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '../../skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function DashBoardPage() {

  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

// Bad Practice to fetch data in parallel
//   const totalPaidInvoices = (await fetchCardData()).totalPaidInvoices;
//   const totalPendingInvoices = (await fetchCardData()).totalPendingInvoices;
//   const numberOfInvoices = (await fetchCardData()).numberOfInvoices;
//   const numberOfCustomers = (await fetchCardData()).numberOfCustomers;

  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper
            
          />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}