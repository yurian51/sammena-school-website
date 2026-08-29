import type { AdmissionNotification } from "./notification"

const queue: AdmissionNotification[] = []

export function enqueueAdmissionNotification(notification: AdmissionNotification) { queue.push(notification); return notification }
export function listPendingAdmissionNotifications() { return [...queue] }
export function clearAdmissionNotificationQueue() { queue.length = 0 }
