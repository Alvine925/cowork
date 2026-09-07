export async function sendEmailNotification(
  type: 'booking_created' | 'feedback_submitted' | 'package_inquiry',
  data: Record<string, any>
) {
  try {
    const res = await fetch('/api/email/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });
    return await res.json();
  } catch (err) {
    console.warn('[Email Notify Failed]', err);
    return { success: false, error: err };
  }
}
