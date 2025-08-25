import React, { useState, useEffect } from 'react';
import { MessageSquare, TrendingUp, Users, Settings, CreditCard, Bell, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getDashboardData } from '@/lib/api';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  business_name: string;
  plan: 'trial' | 'starter' | 'professional' | 'enterprise';
  trial_remaining: number;
  whatsapp_number: string;
  email: string;
}

interface Stats {
  monthlyMessages: number;
  totalConversations: number;
  averageResponseTime: number;
  satisfactionRate: number;
}

interface Conversation {
  id: string;
  customer_name: string;
  last_message: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'pending';
  language: 'en' | 'pcm' | 'yo' | 'ig';
}

const StatCard = ({ title, value, icon: Icon, change }: { 
  title: string; 
  value: string | number; 
  icon: any; 
  change?: string;
}) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p className="text-xs text-success mt-1">↑ {change}</p>
        )}
      </div>
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </Card>
);

const PlanStatus = ({ user }: { user: User | null }) => {
  if (!user) return null;

  const planDetails = {
    trial: { name: 'Free Trial', color: 'bg-yellow-100 text-yellow-800', limit: '60 messages' },
    starter: { name: 'Starter Plan', color: 'bg-blue-100 text-blue-800', limit: '1,000 messages' },
    professional: { name: 'Professional Plan', color: 'bg-green-100 text-green-800', limit: '5,000 messages' },
    enterprise: { name: 'Enterprise Plan', color: 'bg-purple-100 text-purple-800', limit: 'Unlimited' }
  };

  const current = planDetails[user.plan];

  return (
    <div className="flex items-center justify-between">
      <div>
        <Badge className={current.color}>{current.name}</Badge>
        <p className="text-sm text-muted-foreground mt-2">
          {user.plan === 'trial' ? `${user.trial_remaining} messages remaining` : current.limit}
        </p>
      </div>
      {user.plan === 'trial' && (
        <Button>Upgrade Plan</Button>
      )}
    </div>
  );
};

const ConversationList = ({ conversations }: { conversations: Conversation[] }) => {
  const getLanguageFlag = (lang: string) => {
    const flags = { en: '🇬🇧', pcm: '🇳🇬', yo: '🇳🇬', ig: '🇳🇬' };
    return flags[lang as keyof typeof flags] || '🇳🇬';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      resolved: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-4">
      {conversations.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No conversations yet</p>
          <p className="text-sm text-muted-foreground">Connect your WhatsApp to start receiving messages</p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <Card key={conversation.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span>{getLanguageFlag(conversation.language)}</span>
                <h4 className="font-medium">{conversation.customer_name}</h4>
              </div>
              <Badge className={getStatusColor(conversation.status)}>
                {conversation.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2 truncate">
              {conversation.last_message}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(conversation.timestamp).toLocaleString()}
            </p>
          </Card>
        ))
      )}
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    monthlyMessages: 0,
    totalConversations: 0,
    averageResponseTime: 0,
    satisfactionRate: 0
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Try to get user from localStorage first (for demo)
      const storedUser = localStorage.getItem('currentUser');
      let userId = null;
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        userId = user.id;
      } else {
        // For demo, use the first user in the database
        const { data } = await supabase.from('users').select('id').limit(1).single();
        userId = data?.id;
      }

      if (userId) {
        const dashboardData = await getDashboardData(userId);
        
        setUser({
          ...dashboardData.user,
          plan: dashboardData.user.plan as 'trial' | 'starter' | 'professional' | 'enterprise'
        });
        
        setStats({
          monthlyMessages: dashboardData.stats.thisMonth,
          totalConversations: dashboardData.stats.totalConversations,
          averageResponseTime: dashboardData.stats.averageResponseTime,
          satisfactionRate: 4.8 // Mock for MVP
        });

        // Transform conversations for UI
        const transformedConversations = dashboardData.conversations.map(conv => ({
          id: conv.id,
          customer_name: `Customer ${conv.id.slice(0, 8)}`,
          last_message: conv.user_message,
          timestamp: conv.created_at,
          status: 'resolved' as const,
          language: conv.language_used as 'en' | 'pcm' | 'yo' | 'ig'
        }));
        
        setConversations(transformedConversations);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Load demo data on error
      setUser({
        id: 'demo',
        business_name: 'Demo Business',
        plan: 'trial',
        trial_remaining: 45,
        whatsapp_number: '+234...1234',
        email: 'demo@business.com'
      });
      setStats({
        monthlyMessages: 12,
        totalConversations: 3,
        averageResponseTime: 1.2,
        satisfactionRate: 4.8
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
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
              <h1 className="text-xl font-semibold text-primary">OdiaBiz AI Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Welcome, {user?.business_name}</span>
              <Button size="sm">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Messages Left" 
            value={user?.trial_remaining || 0} 
            icon={MessageSquare}
            change="12 used today"
          />
          <StatCard 
            title="Total Conversations" 
            value={stats.totalConversations} 
            icon={Users}
            change="+3 this week"
          />
          <StatCard 
            title="This Month" 
            value={stats.monthlyMessages} 
            icon={TrendingUp}
            change="+23%"
          />
          <StatCard 
            title="Response Time" 
            value={`${stats.averageResponseTime}s`} 
            icon={CreditCard}
            change="15% faster"
          />
        </div>

        {/* Plan Status */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Plan Status</h2>
          <PlanStatus user={user} />
        </Card>

        {/* Recent Conversations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Conversations</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="w-64 pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <ConversationList conversations={conversations} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;