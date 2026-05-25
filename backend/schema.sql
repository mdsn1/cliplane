-- Cliplane Supabase Schema
-- Run this in your Supabase SQL editor

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'inactive',
    plan TEXT NOT NULL DEFAULT 'free',
    pro_token TEXT UNIQUE,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_pro_token ON subscriptions(pro_token);

CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Anonymous analytics — no URLs, no IPs
CREATE TABLE IF NOT EXISTS downloads_analytics (
    id BIGSERIAL PRIMARY KEY,
    platform TEXT NOT NULL,
    quality TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_platform ON downloads_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON downloads_analytics(timestamp);

-- DMCA submissions
CREATE TABLE IF NOT EXISTS dmca_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    infringing_url TEXT NOT NULL,
    original_url TEXT NOT NULL,
    statement TEXT NOT NULL,
    signature TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dmca_status ON dmca_submissions(status);
CREATE INDEX IF NOT EXISTS idx_dmca_created ON dmca_submissions(created_at);

-- Download history (pro users only, 30-day retention)
CREATE TABLE IF NOT EXISTS download_history (
    id BIGSERIAL PRIMARY KEY,
    pro_token TEXT NOT NULL,
    title TEXT,
    platform TEXT,
    quality TEXT,
    original_url TEXT,
    downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_history_token ON download_history(pro_token);
CREATE INDEX IF NOT EXISTS idx_history_downloaded_at ON download_history(downloaded_at);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE dmca_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_history ENABLE ROW LEVEL SECURITY;

-- Only service role can access these tables (backend uses service key)
CREATE POLICY "Service role only" ON subscriptions FOR ALL USING (false);
CREATE POLICY "Service role only" ON downloads_analytics FOR ALL USING (false);
CREATE POLICY "Service role only" ON dmca_submissions FOR ALL USING (false);
CREATE POLICY "Service role only" ON contact_submissions FOR ALL USING (false);
CREATE POLICY "Service role only" ON download_history FOR ALL USING (false);

-- Allow service role (bypasses RLS automatically in Supabase)
-- The backend uses SUPABASE_SERVICE_KEY which bypasses RLS
