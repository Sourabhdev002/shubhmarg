-- Migration: Add email to guidance_requests
ALTER TABLE guidance_requests ADD COLUMN email TEXT;
