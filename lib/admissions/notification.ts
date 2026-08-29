export type AdmissionNotification = { notificationId: string; reference: string; channel: "PORTAL" | "EMAIL" | "SMS"; event: "SUBMITTED" | "MORE_INFORMATION" | "ACCEPTED" | "REJECTED"; createdAt: string }

export function createAdmissionNotification(reference: string, channel: AdmissionNotification["channel"], event: AdmissionNotification["event"]): AdmissionNotification {
  return { notificationId: crypto.randomUUID(), reference, channel, event, createdAt: new Date().toISOString() }
}
