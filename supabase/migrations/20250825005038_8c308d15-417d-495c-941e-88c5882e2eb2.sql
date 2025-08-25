-- MINIMAL SCHEMA - ONLY ESSENTIAL TABLES FOR MVP LAUNCH
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
    whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    language_pref VARCHAR(3) DEFAULT 'en',
    plan VARCHAR(20) DEFAULT 'trial',
    trial_remaining INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    language_used VARCHAR(3) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (open for MVP, will tighten later)
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);

CREATE POLICY "Conversations can be viewed" ON conversations FOR SELECT USING (true);
CREATE POLICY "Conversations can be inserted" ON conversations FOR INSERT WITH CHECK (true);

-- INSERT TEST DATA FOR DEMO
INSERT INTO users (business_name, whatsapp_number, email, language_pref, plan, trial_remaining) VALUES
('Demo Business', '+2348012345678', 'demo@business.com', 'en', 'trial', 45),
('Lagos Restaurant', '+2348087654321', 'contact@lagosrestaurant.ng', 'pcm', 'professional', 0),
('Abuja Store', '+2349012345678', 'info@abujastore.ng', 'yo', 'starter', 0)
ON CONFLICT (whatsapp_number) DO NOTHING;

-- Insert sample conversations
INSERT INTO conversations (user_id, user_message, ai_response, language_used) 
SELECT 
    u.id,
    'Hello, what are your business hours?',
    'Hello! We are open 24/7 to serve you. How can I help you today?',
    'en'
FROM users u 
WHERE u.business_name = 'Demo Business'
ON CONFLICT DO NOTHING;

INSERT INTO conversations (user_id, user_message, ai_response, language_used) 
SELECT 
    u.id,
    'How much una dey charge for delivery?',
    'Delivery na free within Lagos! Outside Lagos na ₦1,500. Wetin you wan order?',
    'pcm'
FROM users u 
WHERE u.business_name = 'Lagos Restaurant'
ON CONFLICT DO NOTHING;