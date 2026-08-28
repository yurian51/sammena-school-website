export function sql(strings: TemplateStringsArray, ...values: readonly unknown[]) {
  let text = ""
  const params: unknown[] = []
  for (let i = 0; i < strings.length; i += 1) {
    text += strings[i]
    if (i < values.length) {
      params.push(values[i])
      text += `$${params.length}`
    }
  }
  return { text, params } as const
}
