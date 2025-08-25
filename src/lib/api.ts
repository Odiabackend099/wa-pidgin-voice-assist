// Production-ready API utilities with error handling
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

// Registration API with production error handling
export async function registerUser(userData: {
  businessName: string;
  email: string;
  whatsappNumber: string;
  language: string;
  businessType: string;
}) {
  try {
    // Validate required fields
    if (!userData.businessName || !userData.whatsappNumber) {
      throw new Error('Business name and WhatsApp number are required');
    }

    // Clean and format phone number
    let cleanNumber = userData.whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.startsWith('0')) cleanNumber = '234' + cleanNumber.slice(1);
    if (!cleanNumber.startsWith('234')) cleanNumber = '234' + cleanNumber;
    const formattedNumber = '+' + cleanNumber;

    // Validate Nigerian phone number format
    if (!/^\+234[789][01]\d{8}$/.test(formattedNumber)) {
      throw new Error('Please enter a valid Nigerian phone number');
    }

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
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('This WhatsApp number is already registered');
      }
      throw new Error('Registration failed. Please try again.');
    }

    console.log('User registered successfully:', data.id);

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

// Dashboard data with production error handling
export async function getDashboardData(userId: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('User fetch error:', userError);
      throw new Error('Failed to load user data');
    }

    // Get conversations
    const { data: conversations, error: conversationsError } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (conversationsError) {
      console.error('Conversations fetch error:', conversationsError);
      // Don't throw error for conversations, use empty array
    }

    // Calculate stats
    const conversationData = conversations || [];
    const stats: Stats = {
      totalMessages: conversationData.length,
      thisMonth: conversationData.filter(c => 
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length,
      planStatus: user?.plan || 'trial',
      messagesLeft: user?.trial_remaining || 0,
      totalConversations: conversationData.length,
      averageResponseTime: 1.2 // Mock for MVP
    };

    return {
      user: {
        ...user,
        whatsapp_number: user.whatsapp_number.replace(/(\d{3})(\d{3})(\d{4})$/, '...$3')
      },
      stats,
      conversations: conversationData
    };

  } catch (error) {
    console.error('Dashboard error:', error);
    throw error;
  }
}

// Get all users for admin (production-ready)
export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50); // Limit for performance

    if (error) {
      console.error('Users fetch error:', error);
      throw new Error('Failed to fetch users');
    }

    return data || [];

  } catch (error) {
    console.error('Users fetch error:', error);
    throw error;
  }
}

// Production health check with proper error handling
export async function healthCheck() {
  try {
    // Test database connectivity with proper count syntax
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Health check database error:', error);
      throw error;
    }

    return {
      status: 'LIVE',
      timestamp: new Date().toISOString(),
      message: 'OdiaBiz AI MVP is running! 🇳🇬',
      userCount: count || 0,
      services: {
        database: 'healthy',
        api: 'healthy'
      }
    };

  } catch (error) {
    console.error('Health check failed:', error);
    return {
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'System error detected',
      userCount: 0,
      services: {
        database: 'error',
        api: 'error'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Test WhatsApp connection (mock for MVP)
export async function testWhatsAppConnection(userPhone: string) {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For MVP, always return success
    return {
      success: true,
      message: 'WhatsApp connection test successful! 📱',
      testNumber: '+1 415 523 8886',
      instructions: 'Send "hello" to the test number to verify connection'
    };

  } catch (error) {
    console.error('WhatsApp test error:', error);
    return {
      success: false,
      message: 'WhatsApp connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Send test message (mock for MVP)
export async function sendTestMessage(message: string) {
  try {
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Test message sent successfully! 📤',
      response: 'Hi! This is your OdiaBiz AI assistant. Welcome to the future of Nigerian customer service! 🇳🇬'
    };

  } catch (error) {
    console.error('Send message error:', error);
    return {
      success: false,
      message: 'Failed to send test message',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}