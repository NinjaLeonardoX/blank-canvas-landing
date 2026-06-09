import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";

import { DashboardNav } from "@/components/dashboard-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumina" },
      { name: "description", content: "Overview of your activity and metrics." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Active Users",
    value: "2,350",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Subscriptions",
    value: "1,204",
    change: "-3.2%",
    trend: "down" as const,
    icon: CreditCard,
  },
  {
    label: "Active Now",
    value: "573",
    change: "+8.0%",
    trend: "up" as const,
    icon: Activity,
  },
];

const chartData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4700 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 7400 },
  { month: "Jul", revenue: 6800 },
  { month: "Aug", revenue: 8100 },
];

const recentActivity = [
  { name: "Olivia Martin", email: "olivia@example.com", status: "Completed", amount: "$1,999.00" },
  { name: "Jackson Lee", email: "jackson@example.com", status: "Processing", amount: "$39.00" },
  {
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    status: "Completed",
    amount: "$299.00",
  },
  { name: "William Kim", email: "will@example.com", status: "Failed", amount: "$99.00" },
  { name: "Sofia Davis", email: "sofia@example.com", status: "Completed", amount: "$39.00" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Completed: "default",
  Processing: "secondary",
  Failed: "destructive",
};

function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here's what's happening today.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={cn(
                        "mt-1 flex items-center gap-1 text-xs",
                        stat.trend === "up" ? "text-emerald-600" : "text-destructive",
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Revenue overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                        stroke="currentColor"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                        stroke="currentColor"
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        cursor={{ stroke: "var(--border)" }}
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: "0.5rem",
                          fontSize: "0.75rem",
                          color: "var(--popover-foreground)",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#fillRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent activity</CardTitle>
                  <CardDescription>Latest transactions from your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.map((row) => (
                        <TableRow key={row.email}>
                          <TableCell>
                            <div className="font-medium">{row.name}</div>
                            <div className="text-xs text-muted-foreground">{row.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Deeper insights coming soon.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Detailed analytics and breakdowns will appear here.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and export reports.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Your saved reports will be listed here.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
