-- Migration: V2__add_oauth_support_to_users
-- Description: Add OAuth provider fields to users table for Google authentication
-- Author: AGENT
-- Date: 2025-01-15

-- Add OAuth provider fields
ALTER TABLE users 
ADD COLUMN auth_provider VARCHAR(20) DEFAULT 'LOCAL',
ADD COLUMN google_id VARCHAR(255) UNIQUE,
ADD COLUMN password_hash VARCHAR(255);

-- Make password_hash nullable for OAuth users
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Add index for Google ID lookups
CREATE INDEX idx_users_google_id ON users(google_id);

-- Add comment to document the new fields
COMMENT ON COLUMN users.auth_provider IS 'Authentication provider: LOCAL, GOOGLE';
COMMENT ON COLUMN users.google_id IS 'Google OAuth user ID';
COMMENT ON COLUMN users.password_hash IS 'Password hash (nullable for OAuth users)';
