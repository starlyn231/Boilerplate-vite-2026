import { Activity, ShoppingCart, Users } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const stats = [
  { label: 'Usuarios', value: '3,782', change: '+11.01%', icon: Users },
  { label: 'Pedidos', value: '5,359', change: '-9.05%', icon: ShoppingCart },
  { label: 'Sesiones activas', value: '1,204', change: '+4.35%', icon: Activity },
]

const monthlySales = [
  { month: 'Ene', ventas: 186 },
  { month: 'Feb', ventas: 305 },
  { month: 'Mar', ventas: 237 },
  { month: 'Abr', ventas: 273 },
  { month: 'May', ventas: 209 },
  { month: 'Jun', ventas: 314 },
]

const salesConfig = {
  ventas: { label: 'Ventas', color: 'var(--chart-1)' },
} satisfies ChartConfig

const traffic = [
  { day: 'Lun', visitas: 120 },
  { day: 'Mar', visitas: 200 },
  { day: 'Mié', visitas: 150 },
  { day: 'Jue', visitas: 280 },
  { day: 'Vie', visitas: 190 },
  { day: 'Sáb', visitas: 240 },
  { day: 'Dom', visitas: 160 },
]

const trafficConfig = {
  visitas: { label: 'Visitas', color: 'var(--chart-2)' },
} satisfies ChartConfig

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex-row items-center justify-between">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span
                  className={cn(
                    'text-xs font-medium',
                    stat.change.startsWith('+')
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-destructive',
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas mensuales</CardTitle>
            <CardDescription>Datos de ejemplo — conéctalo a tu API cuando esté lista.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesConfig} className="h-64 w-full">
              <BarChart data={monthlySales}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="ventas" fill="var(--color-ventas)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tráfico semanal</CardTitle>
            <CardDescription>Datos de ejemplo — conéctalo a tu API cuando esté lista.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trafficConfig} className="h-64 w-full">
              <AreaChart data={traffic}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="visitas"
                  type="monotone"
                  fill="var(--color-visitas)"
                  fillOpacity={0.2}
                  stroke="var(--color-visitas)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
