import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Server,
  Globe,
  ArrowUp,
  ArrowDown,
  Plus,
  Flag,
  AlertTriangle,
} from 'lucide-react';

export default function Overview() {
  const kpis = [
    {
      icon: Users,
      label: 'Active Tenants',
      value: '247',
      change: '+12',
      changeLabel: 'this month',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: DollarSign,
      label: 'MRR',
      value: '$487K',
      change: '+18%',
      changeLabel: 'vs last month',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      label: 'ARR',
      value: '$5.8M',
      change: '+24%',
      changeLabel: 'YoY growth',
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Activity,
      label: 'Churn Rate',
      value: '2.3%',
      change: '-0.5%',
      changeLabel: 'vs last month',
      trend: 'down',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const usageMetrics = [
    { label: 'CV Compute Hours', value: '1,247,593', unit: 'hrs', change: '+15%' },
    { label: 'Events Processed', value: '52.3M', unit: 'events', change: '+22%' },
    { label: 'Storage Consumption', value: '847', unit: 'TB', change: '+8%' },
    { label: 'API Requests', value: '3.2B', unit: 'requests', change: '+19%' },
  ];

  const uptime = [
    { period: 'Last 24h', value: '99.98%', status: 'good' },
    { period: 'Last 7d', value: '99.95%', status: 'good' },
    { period: 'Last 30d', value: '99.92%', status: 'good' },
    { period: 'Last 90d', value: '99.87%', status: 'warning' },
  ];

  const topGrowthTenants = [
    { name: 'STC - Saudi Telecom', mrr: '$45,200', growth: '+127%', plan: 'Enterprise', users: 1247 },
    { name: 'Mobily Corporation', mrr: '$38,900', growth: '+98%', plan: 'Enterprise', users: 892 },
    { name: 'Zain KSA', mrr: '$32,400', growth: '+85%', plan: 'Professional', users: 654 },
    { name: 'Etisalat UAE', mrr: '$28,700', growth: '+72%', plan: 'Enterprise', users: 743 },
    { name: 'Vodafone Qatar', mrr: '$24,300', growth: '+68%', plan: 'Professional', users: 521 },
  ];

  const criticalIncidents = [
    {
      id: 'INC-2847',
      title: 'Azure CV API Latency Spike - EU Region',
      priority: 'P1',
      status: 'In Progress',
      owner: 'SRE Team',
      impacted: '43 tenants',
      time: '23m ago',
    },
    {
      id: 'INC-2846',
      title: 'Webhook Delivery Delays - MENA',
      priority: 'P2',
      status: 'Investigating',
      owner: 'Platform Ops',
      impacted: '12 tenants',
      time: '1h ago',
    },
  ];

  const releases = [
    { feature: 'Enhanced Heatmap Analytics v2.4', rollout: 75, tenants: 185 },
    { feature: 'Real-time Dashboard Updates', rollout: 45, tenants: 111 },
    { feature: 'Azure CV Model v3.2', rollout: 25, tenants: 62 },
  ];

  const regionalFootprint = [
    { region: 'MENA', tenants: 127, percentage: 51, color: 'bg-purple-500' },
    { region: 'Europe', tenants: 68, percentage: 28, color: 'bg-blue-500' },
    { region: 'Asia Pacific', tenants: 42, percentage: 17, color: 'bg-green-500' },
    { region: 'North America', tenants: 10, percentage: 4, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-primary mb-2 ">Executive Overview</h1>
          <p className="text-gray-600">Real-time platform health & business performance snapshot</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Tenant
          </Button>
          <Button variant="outline" className="gap-2">
            <Flag className="w-4 h-4" />
            Publish Feature Flag
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <AlertTriangle className="w-4 h-4" />
            Open Incident
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6 relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${kpi.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div className="text-3xl text-primary mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.label}</div>
                <div className="text-xs text-gray-500 mt-1">{kpi.changeLabel}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Usage Metrics */}
      <Card className="p-6">
        <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-600" />
          Platform Usage Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageMetrics.map((metric, idx) => (
            <div key={idx} className="border-l-4 border-purple-500 pl-4">
              <div className="text-2xl text-primary mb-1">
                {metric.value}
                <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
              <Badge className="bg-green-500/10 text-green-600 border-0 text-xs">
                {metric.change} this month
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Uptime & SLA */}
      <Card className="p-6">
        <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          System Uptime & SLA Compliance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {uptime.map((period, idx) => (
            <div key={idx} className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 ${period.status === 'good' ? 'bg-green-500/10' : 'bg-yellow-500/10'
                }`}>
                {period.status === 'good' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-600" />
                )}
                <span className={`text-xl ${period.status === 'good' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {period.value}
                </span>
              </div>
              <div className="text-sm text-gray-600">{period.period}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Growth Tenants */}
        <Card className="p-6">
          <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Top Growth Tenants
          </h3>
          <div className="space-y-4">
            {topGrowthTenants.map((tenant, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-primary">{tenant.name}</span>
                    <Badge className="bg-purple-500/10 text-purple-600 border-0 text-xs">
                      {tenant.plan}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">{tenant.users.toLocaleString()} users</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-primary mb-1">{tenant.mrr}</div>
                  <Badge className="bg-green-500/10 text-green-600 border-0 text-xs">
                    {tenant.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Critical Incidents */}
        <Card className="p-6">
          <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Open Critical Incidents
          </h3>
          <div className="space-y-4">
            {criticalIncidents.map((incident, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${incident.priority === 'P1' ? 'bg-red-500' : 'bg-orange-500'
                      } text-white border-0`}>
                      {incident.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{incident.id}</span>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-600 border-0 text-xs">
                    {incident.status}
                  </Badge>
                </div>
                <h4 className="text-sm text-primary mb-2">{incident.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Owner: {incident.owner}</span>
                  <span>{incident.impacted} impacted</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{incident.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Release Rollouts */}
      <Card className="p-6">
        <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
          <Flag className="w-5 h-5 text-blue-600" />
          Active Release Rollouts
        </h3>
        <div className="space-y-4">
          {releases.map((release, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary">{release.feature}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{release.tenants} tenants</span>
                  <span className="text-sm text-purple-600">{release.rollout}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
                  style={{ width: `${release.rollout}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Regional Footprint */}
      <Card className="p-6">
        <h3 className="text-lg text-primary mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Regional Footprint & Data Residency
        </h3>
        <div className="space-y-4">
          {regionalFootprint.map((region, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary">{region.region}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{region.tenants} tenants</span>
                  <span className="text-sm text-primary">{region.percentage}%</span>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${region.color} transition-all`}
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
