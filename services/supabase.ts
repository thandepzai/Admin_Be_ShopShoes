import { SUPABASE_CONFIG } from '@/const/app-const'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	'https://ikunmdgrxuoyltqjiolb.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdW5tZGdyeHVveWx0cWppb2xiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTQyNjUwMiwiZXhwIjoyMDE1MDAyNTAyfQ.1pYM_jcSQkiar4d-v1CZRUVdfdbRGMQu7dH6dr-0ELQ'
)
