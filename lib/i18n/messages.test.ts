import { describe, expect, it } from "vitest"
import { messages, translate } from "./messages"

describe("English and Swahili language dictionary", () => {
  it("keeps English source strings unchanged", () => {
    expect(translate("Contact Sammena", "en")).toBe("Contact Sammena")
  })

  it("translates key user-facing flows into Swahili", () => {
    expect(translate("Contact Sammena", "sw")).toBe("Wasiliana na Sammena")
    expect(translate("Admissions Process", "sw")).toBe("Mchakato wa Udahili")
    expect(translate("Open WhatsApp", "sw")).toBe("Fungua WhatsApp")
    expect(translate("One digital front door for families, learners and the wider community.", "sw")).not.toBe(
      "One digital front door for families, learners and the wider community.",
    )
  })

  it("falls back safely when a phrase has no translation", () => {
    expect(translate("A future phrase not yet translated", "sw")).toBe("A future phrase not yet translated")
  })

  it("contains no empty Swahili translations", () => {
    for (const [source, translated] of Object.entries(messages.sw)) {
      expect(source.trim().length, `source phrase should not be empty`).toBeGreaterThan(0)
      expect(translated.trim().length, `translation for "${source}" should not be empty`).toBeGreaterThan(0)
    }
  })
})
