import { describe, expect, it } from "vitest"
import { escapeCsvCell, isExportDataset, toCsv } from "./csv"

describe("CSV export", () => {
  it("quotes cells containing commas, quotes or newlines", () => {
    expect(escapeCsvCell('Hello, "world"\nnext')).toBe('"Hello, ""world""\nnext"')
  })

  it("neutralises spreadsheet formulas", () => {
    // Text becomes '=HYPERLINK("http://x") and is then quoted because it contains quotes.
    expect(escapeCsvCell('=HYPERLINK("http://x")')).toBe('"\'=HYPERLINK(""http://x"")"')
    expect(escapeCsvCell("+61 400")).toBe("'+61 400")
    expect(escapeCsvCell("@sum")).toBe("'@sum")
  })

  it("renders nulls as empty cells and keeps numbers", () => {
    expect(escapeCsvCell(null)).toBe("")
    expect(escapeCsvCell(12)).toBe("12")
  })

  it("builds a BOM-prefixed table in header order", () => {
    const csv = toCsv(["Name", "Admission"], [{ name: "Amina", admission: "S001" }], ["name", "admission"])
    expect(csv.startsWith("\uFEFF")).toBe(true)
    expect(csv).toContain("Name,Admission\r\nAmina,S001")
  })

  it("accepts only known datasets", () => {
    expect(isExportDataset("students")).toBe(true)
    expect(isExportDataset("../secrets")).toBe(false)
  })
})
