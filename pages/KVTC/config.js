// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_CONFIG = {
    url: 'https://mnzwlyzlevqrytlajtfc.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uendseXpsZXZxcnl0bGFqdGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDU2MjQsImV4cCI6MjA2NDA4MTYyNH0.38vdC9jonssgW29gIv34IaRraG_2z4QZcKYmSWk8DBg'
};

// Export for use in HTML files
if (typeof window !== 'undefined') {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
} 