import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ibnkjhfxliqnmfbosvbn.supabase.co";
const supabaseKey = 'sb_publishable_Bh3de0ISoqDQnWHIz2Yypw_3WLEs3Az'

export const supabase = createClient(supabaseUrl, supabaseKey)