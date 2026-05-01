import { createClient } from '@supabase/supabase-js';

// These are your specific project details
const supabaseUrl = 'https://zrjfwasukzvmisnqlpmf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyamZ3YXN1a3p2bWlzbnFscG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MzA4MzUsImV4cCI6MjA5MzIwNjgzNX0.iiZpDmIV4aySnDcbDRbt7NUJmkR87C_uJglY7Hj2rt4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
