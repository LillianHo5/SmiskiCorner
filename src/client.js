import { createClient } from '@supabase/supabase-js'

const URL = 'https://bmgksiqpcqkhjnxdzhwm.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZ2tzaXFwY3FraGpueGR6aHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNzA0ODEsImV4cCI6MTk5Nzg0NjQ4MX0.5wnWf9G80OUUsLy4UTeVM1-KObIArwDs-N8tP3_Vutw';

export const supabase = createClient(URL, API_KEY);