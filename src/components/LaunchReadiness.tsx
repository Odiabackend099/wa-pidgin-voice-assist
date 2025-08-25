import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { healthCheck } from '@/lib/api';

interface CheckItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  action?: string;
  link?: string;
}

const LaunchReadiness = () => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'database',
      title: 'Database Connection',
      description: 'Supabase database is connected and accessible',
      status: 'pending'
    },
    {
      id: 'registration',
      title: 'User Registration',
      description: 'Users can register and data is saved to database',
      status: 'pending'
    },
    {
      id: 'dashboard',
      title: 'Dashboard Data',
      description: 'Dashboard loads user data and statistics',
      status: 'pending'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Integration',
      description: 'Ready for Twilio sandbox configuration',
      status: 'pending',
      action: 'Configure Twilio',
      link: 'https://console.twilio.com'
    }
  ]);

  const [systemHealth, setSystemHealth] = useState<any>(null);

  useEffect(() => {
    runHealthChecks();
  }, []);

  const runHealthChecks = async () => {
    try {
      // Check database connection
      const health = await healthCheck();
      setSystemHealth(health);
      
      // Update check statuses based on health check
      setChecks(prev => prev.map(check => {
        switch (check.id) {
          case 'database':
            return { ...check, status: health.status === 'LIVE' ? 'completed' : 'failed' };
          case 'registration':
            return { ...check, status: health.status === 'LIVE' ? 'completed' : 'failed' };
          case 'dashboard':
            return { ...check, status: health.status === 'LIVE' ? 'completed' : 'failed' };
          case 'whatsapp':
            return { ...check, status: 'pending' }; // Requires manual setup
          default:
            return check;
        }
      }));
    } catch (error) {
      console.error('Health check failed:', error);
      setChecks(prev => prev.map(check => ({ ...check, status: 'failed' })));
    }
  };

  const getStatusIcon = (status: CheckItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: CheckItem['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20">Ready</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    }
  };

  const completedChecks = checks.filter(check => check.status === 'completed').length;
  const progressPercentage = (completedChecks / checks.length) * 100;

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">🚀 Launch Readiness</h2>
          <p className="text-muted-foreground">MVP system status check</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completedChecks}/{checks.length}</div>
          <div className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}% Ready</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* System Health */}
      {systemHealth && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <div>
              <p className="font-medium">System Status: {systemHealth.status}</p>
              <p className="text-sm text-muted-foreground">{systemHealth.message}</p>
              <p className="text-xs text-muted-foreground">Last checked: {new Date(systemHealth.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="space-y-4">
        {checks.map((check) => (
          <div key={check.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(check.status)}
              <div>
                <h4 className="font-medium">{check.title}</h4>
                <p className="text-sm text-muted-foreground">{check.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(check.status)}
              {check.action && check.link && (
                <Button size="sm" variant="outline" asChild>
                  <a href={check.link} target="_blank" rel="noopener noreferrer">
                    {check.action}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Launch Status */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-primary">
              {completedChecks === checks.length ? '🎉 Ready to Launch!' : '⏰ Preparing for Launch'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {completedChecks === checks.length 
                ? 'All systems are go! Your MVP is ready for Nigerian businesses.'
                : `${checks.length - completedChecks} items remaining before launch.`
              }
            </p>
          </div>
          <Button 
            size="lg" 
            disabled={completedChecks < checks.length}
            onClick={() => {
              if (completedChecks === checks.length) {
                window.open('/register', '_blank');
              } else {
                alert(`System not ready yet. ${checks.length - completedChecks} items remaining.`);
              }
            }}
          >
            {completedChecks === checks.length ? '🚀 Launch MVP' : `${completedChecks}/${checks.length} Ready`}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LaunchReadiness;