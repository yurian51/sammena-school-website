export function assertPaymentBelongsToAccount(
  paymentSchoolId: string,
  accountSchoolId: string,
): void {
  if (paymentSchoolId !== accountSchoolId) {
    throw new Error("PAYMENT_ACCOUNT_SCHOOL_MISMATCH")
  }
}

export function assertFeeBalance(balance: number): void {
  if (!Number.isFinite(balance) || balance < 0) {
    throw new Error("INVALID_FEE_BALANCE")
  }
}
