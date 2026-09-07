import { supabase } from './supabase'

export interface SystemConfig {
  paystackSecretKey: string
  paystackPublicKey: string
  brevoApiKey: string
  brevoSenderName: string
  brevoSenderEmail: string
  adminEmail: string
}

let cachedConfig: SystemConfig | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 60 * 1000 // Cache for 1 minute

/**
 * Fetches application credentials from Supabase `system_settings` table,
 * falling back to process.env environment variables if not present in the database.
 */
export async function getSystemConfig(): Promise<SystemConfig> {
  const now = Date.now()
  if (cachedConfig && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedConfig
  }

  // Defaults / Environment variable fallbacks
  const envConfig: SystemConfig = {
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || '',
    paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '',
    brevoApiKey: process.env.BREVO_API_KEY || '',
    brevoSenderName: process.env.BREVO_SENDER_NAME || 'Paper Street Workspaces',
    brevoSenderEmail: process.env.BREVO_SENDER_EMAIL || 'otienoalvine925@gmail.com',
    adminEmail: process.env.ADMIN_EMAIL || 'otienoalvine925@gmail.com',
  }

  try {
    const { data, error } = await supabase
      .from('system_settings')
      .select('key, value')

    if (!error && data && data.length > 0) {
      const dbMap: Record<string, string> = {}
      for (const row of data) {
        if (row.key && row.value) {
          dbMap[row.key.toLowerCase().trim()] = row.value.trim()
        }
      }

      const mergedConfig: SystemConfig = {
        paystackSecretKey: dbMap['paystack_secret_key'] || envConfig.paystackSecretKey,
        paystackPublicKey: dbMap['paystack_public_key'] || envConfig.paystackPublicKey,
        brevoApiKey: dbMap['brevo_api_key'] || envConfig.brevoApiKey,
        brevoSenderName: dbMap['brevo_sender_name'] || envConfig.brevoSenderName,
        brevoSenderEmail: dbMap['brevo_sender_email'] || envConfig.brevoSenderEmail,
        adminEmail: dbMap['admin_email'] || envConfig.adminEmail,
      }

      cachedConfig = mergedConfig
      cacheTimestamp = now
      return mergedConfig
    }
  } catch (err) {
    console.warn('[config-service] Could not fetch settings from Supabase, using env fallback:', err)
  }

  cachedConfig = envConfig
  cacheTimestamp = now
  return envConfig
}
