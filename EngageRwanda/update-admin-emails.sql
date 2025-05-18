-- Update all existing admin records to add email addresses
UPDATE admin 
SET email = username || '@engagerwanda.com' 
WHERE email IS NULL;

-- Show updated records
SELECT id, username, email, agency_id FROM admin; 