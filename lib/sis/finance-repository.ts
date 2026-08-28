import type { FeeAccount, Payment } from "./supporting-types"

export interface FeeAccountRepository {
  readonly schoolId: string
  findById(id: string): Promise<FeeAccount | null>
  findByStudent(studentId: string, academicYearId: string): Promise<FeeAccount | null>
  save(account: FeeAccount): Promise<FeeAccount>
}

export interface PaymentRepository {
  readonly schoolId: string
  findById(id: string): Promise<Payment | null>
  findByReference(reference: string): Promise<Payment | null>
  listByFeeAccount(feeAccountId: string): Promise<Payment[]>
  create(payment: Payment): Promise<Payment>
}
