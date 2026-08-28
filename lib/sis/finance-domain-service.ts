import type { FeeAccount, Payment } from "./supporting-types"
import type { FeeAccountRepository, PaymentRepository } from "./finance-repository"
import { assertPaymentAmount, assertPaymentTransition } from "./finance-service"
import { assertFeeBalance, assertPaymentBelongsToAccount } from "./finance-consistency"

export class FinanceService {
  constructor(
    private readonly schoolId: string,
    private readonly accounts: FeeAccountRepository,
    private readonly payments: PaymentRepository,
  ) {}

  async getAccount(id: string): Promise<FeeAccount | null> {
    return this.accounts.findById(id)
  }

  async saveAccount(account: FeeAccount): Promise<FeeAccount> {
    if (account.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    assertFeeBalance(account.balance)
    return this.accounts.save(account)
  }

  async createPayment(payment: Payment, account: FeeAccount): Promise<Payment> {
    if (payment.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    assertPaymentAmount(payment.amount)
    assertPaymentBelongsToAccount(payment.schoolId, account.schoolId)
    return this.payments.create(payment)
  }

  async changePaymentStatus(payment: Payment, nextStatus: Payment["status"]): Promise<Payment> {
    if (payment.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    assertPaymentTransition(payment.status, nextStatus)
    return { ...payment, status: nextStatus }
  }
}
