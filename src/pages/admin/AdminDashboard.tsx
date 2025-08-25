import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyMessages: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

interface User {
  id: string;
  business_name: string;
  email: string;
  whatsapp_number: string;
  plan: 'trial' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  created_at: string;
  last_active: string;
  monthly_usage: number;
  total_spent: number;
}

const StatCard = ({ title, value, icon: Icon, change, status }: { 
  title: string; 
  value: string | number; 
  icon: any; 
  change?: string;
  status?: 'positive' | 'negative' | 'neutral';
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${getStatusColor()}`}>{change}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

const UserTable = ({ users }: { users: User[] }) => {
  const getPlanColor = (plan: string) => {
    const colors = {
      trial: 'bg-yellow-100 text-yellow-800',
      starter: 'bg-blue-100 text-blue-800',
      professional: 'bg-green-100 text-green-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return colors[plan as keyof typeof colors] || colors.trial;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Business</th>
            <th className="text-left p-4">Contact</th>
            <th className="text-left p-4">Plan</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Usage</th>
            <th className="text-left p-4">Revenue</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-muted/50">
              <td className="p-4">
                <div>
                  <p className="font-medium">{user.business_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <div>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.whatsapp_number}</p>
                </div>
              </td>
              <td className="p-4">
                <Badge className={getPlanColor(user.plan)}>
                  {user.plan}
                </Badge>
              </td>
              <td className="p-4">
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </td>
              <td className="p-4">
                <p className="text-sm">{user.monthly_usage} messages</p>
                <p className="text-xs text-muted-foreground">
                  Last active: {new Date(user.last_active).toLocaleDateString()}
                </p>
              </td>
              <td className="p-4">
                <p className="font-medium">₦{user.total_spent.toLocaleString()}</p>
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Ban className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SystemHealth = ({ health }: { health: AdminStats['systemHealth'] }) => {
  const getHealthConfig = () => {
    switch (health) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bg: 'bg-success/10',
          message: 'All systems operational'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          message: 'Some issues detected'
        };
      case 'critical':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bg: 'bg-destructive/10',
          message: 'Critical issues require attention'
        };
    }
  };

  const config = getHealthConfig();
  const Icon = config.icon;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div>
          <h3 className="font-semibold">System Health</h3>
          <p className={`text-sm ${config.color}`}>{config.message}</p>
        </div>
      </div>
    </Card>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyMessages: 0,
    systemHealth: 'healthy'
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        totalRevenue: 18750000, // ₦18.75M
        monthlyMessages: 45623,
        systemHealth: 'healthy'
      });

      setUsers([
        {
          id: '1',
          business_name: 'Lagos Food Express',
          email: 'contact@lagosexpres.com',
          whatsapp_number: '+2348012345678',
          plan: 'professional',
          status: 'active',
          created_at: '2024-01-15',
          last_active: '2024-01-24',
          monthly_usage: 2340,
          total_spent: 45000
        },
        {
          id: '2',
          business_name: 'Abuja Tech Solutions',
          email: 'admin@abujatech.ng',
          whatsapp_number: '+2349087654321',
          plan: 'enterprise',
          status: 'active',
          created_at: '2023-11-20',
          last_active: '2024-01-24',
          monthly_usage: 8900,
          total_spent: 225000
        },
        {
          id: '3',
          business_name: 'Port Harcourt Retail',
          email: 'info@phretail.com',
          whatsapp_number: '+2347012345678',
          plan: 'starter',
          status: 'active',
          created_at: '2024-01-10',
          last_active: '2024-01-23',
          monthly_usage: 567,
          total_spent: 15000
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user =>
    user.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">OdiaBiz AI Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm">System Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers.toLocaleString()} 
            icon={Users}
            change="+12% this month"
            status="positive"
          />
          <StatCard 
            title="Active Users" 
            value={stats.activeUsers.toLocaleString()} 
            icon={TrendingUp}
            change={`${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active`}
            status="positive"
          />
          <StatCard 
            title="Monthly Revenue" 
            value={`₦${(stats.totalRevenue / 1000000).toFixed(1)}M`} 
            icon={DollarSign}
            change="+18% from last month"
            status="positive"
          />
          <StatCard 
            title="Messages Sent" 
            value={stats.monthlyMessages.toLocaleString()} 
            icon={MessageSquare}
            change="+35% this month"
            status="positive"
          />
        </div>

        {/* System Health */}
        <div className="mb-8">
          <SystemHealth health={stats.systemHealth} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">User Management</h2>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              <UserTable users={filteredUsers} />
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Analytics charts and insights will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Management</h2>
              <p className="text-muted-foreground">Payment history and transaction management will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">System Health Monitoring</h2>
              <p className="text-muted-foreground">System performance metrics and health checks will be displayed here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;