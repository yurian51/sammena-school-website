export type PaymentStatus = "PENDING" | "CONFIRMED" | "REVERSED"

export function assertPaymentAmount(amount: number): void {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("INVALID_PAYMENT_AMOUNT")
  }
}

export function canTransitionPayment(
  from: PaymentStatus,
  to: PaymentStatus,
): boolean {
  const transitions: Record<PaymentStatus, readonly PaymentStatus[]> = {
    PENDING: ["CONFIRMED", "REVERSED"],
    CONFIRMED: ["REVERSED"],
    REVERSED: [],
  }

  return transitions[from].includes(to)
}

export function assertPaymentTransition(
  from: PaymentStatus,
  to: PaymentStatus,
): void {
  if (!canTransitionPayment(from, to)) {
    throw new Error(`INVALID_PAYMENT_TRANSITION:${from}:${to}`)
  }
}
