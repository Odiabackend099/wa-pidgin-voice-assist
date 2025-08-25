// API utilities for OdiaBiz AI MVP
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  business_name: string;
  whatsapp_number: string;
  email?: string;
  language_pref: string;
  plan: 'trial' | 'starter' | 'professional' | 'enterprise';
  trial_remaining: number;
  created_at: string;
  last_active?: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  user_message: string;
  ai_response: string;
  language_used: string;
  created_at: string;
}

export interface Stats {
  totalMessages: number;
  thisMonth: number;
  planStatus: string;
  messagesLeft: number;
  totalConversations: number;
  averageResponseTime: number;
}

// Registration API
export async function registerUser(userData: {
  businessName: string;
  email: string;
  whatsappNumber: string;
  language: string;
  businessType: string;
}) {
  try {
    // Clean phone number
    let cleanNumber = userData.whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.startsWith('0')) cleanNumber = '234' + cleanNumber.slice(1);
    if (!cleanNumber.startsWith('234')) cleanNumber = '234' + cleanNumber;
    const formattedNumber = '+' + cleanNumber;

    // Insert user into database
    const { data, error } = await supabase
      .from('users')
      .insert({
        business_name: userData.businessName,
        whatsapp_number: formattedNumber,
        email: userData.email,
        language_pref: userData.language
      })
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }

    return {
      success: true,
      user: data,
      message: 'Registration successful! 🎉'
    };

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Get dashboard data
export async function getDashboardData(userId: string) {
  try {
    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Get conversations
    const { data: conversations, error: conversationsError } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (conversationsError) throw conversationsError;

    // Calculate stats
    const stats: Stats = {
      totalMessages: conversations?.length || 0,
      thisMonth: conversations?.filter(c => 
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length || 0,
      planStatus: user?.plan || 'trial',
      messagesLeft: user?.trial_remaining || 0,
      totalConversations: conversations?.length || 0,
      averageResponseTime: 1.2 // Mock for MVP
    };

    return {
      user: {
        ...user,
        whatsapp_number: user.whatsapp_number.replace(/(\d{3})(\d{3})(\d{4})$/, '...$3')
      },
      stats,
      conversations: conversations || []
    };

  } catch (error) {
    console.error('Dashboard error:', error);
    throw new Error('Failed to load dashboard data');
  }
}

// Get all users (for demo purposes)
export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error('Users fetch error:', error);
    throw new Error('Failed to fetch users');
  }
}

// Health check
export async function healthCheck() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);

    if (error) throw error;

    return {
      status: 'LIVE',
      timestamp: new Date().toISOString(),
      message: 'OdiaBiz AI MVP is running! 🇳🇬'
    };

  } catch (error) {
    console.error('Health check failed:', error);
    return {
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'System error detected'
    };
  }
}