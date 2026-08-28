import { describe, expect, it } from "vitest"
import { assertEnrollmentTransition } from "../enrollment-service"
import { assertValidScore } from "../assessment-service"
import { assertPaymentTransition } from "../finance-service"
import { assertPrimaryGuardianCount } from "../guardian-service"

 describe("SIS business rules", () => {
  it("allows valid enrollment progression", () => {
    expect(() => assertEnrollmentTransition("PENDING", "ACTIVE")).not.toThrow()
    expect(() => assertEnrollmentTransition("ACTIVE", "PROMOTED")).not.toThrow()
  })

  it("rejects terminal enrollment transitions", () => {
    expect(() => assertEnrollmentTransition("GRADUATED", "ACTIVE")).toThrow()
    expect(() => assertEnrollmentTransition("CANCELLED", "ACTIVE")).toThrow()
  })

  it("rejects scores outside the assessment range", () => {
    expect(() => assertValidScore(75, 100)).not.toThrow()
    expect(() => assertValidScore(-1, 100)).toThrow()
    expect(() => assertValidScore(101, 100)).toThrow()
  })

  it("enforces payment lifecycle", () => {
    expect(() => assertPaymentTransition("PENDING", "CONFIRMED")).not.toThrow()
    expect(() => assertPaymentTransition("CONFIRMED", "PENDING")).toThrow()
    expect(() => assertPaymentTransition("REVERSED", "CONFIRMED")).toThrow()
  })

  it("allows at most one primary guardian", () => {
    expect(() => assertPrimaryGuardianCount(0)).not.toThrow()
    expect(() => assertPrimaryGuardianCount(1)).not.toThrow()
    expect(() => assertPrimaryGuardianCount(2)).toThrow()
  })
})
