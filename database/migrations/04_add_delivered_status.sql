-- Migration: Add delivered status to request_status enum

ALTER TYPE request_status ADD VALUE 'delivered';
