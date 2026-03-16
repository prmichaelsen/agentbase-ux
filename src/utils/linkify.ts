const KNOWN_TLDS =
  'com|org|net|io|me|dev|app|xyz|co|ai|gg|cc|us|uk|ca|de|fr|jp|au|in|edu|gov|info|biz'

const PROTECTED_RE = new RegExp(
  [
    '```[\\s\\S]*?```',
    '`[^`]+`',
    '!\\[[^\\]]*\\]\\([^)]*\\)',
    '\\[[^\\]]*\\]\\([^)]*\\)',
  ].join('|'),
  'g',
)

const PROTOCOL_URL_RE = /https?:\/\/[^\s<]+[^\s.,;:!?'")\]}<]/g
const WWW_URL_RE = /(?<![/\w])www\.[^\s<]+[^\s.,;:!?'")\]}<]/g
const BARE_DOMAIN_RE = new RegExp(
  `(?<![/@\\w])([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.(?:${KNOWN_TLDS})(?:\\/[^\\s<]*[^\\s.,;:!?'"\\)\\]}<])?)`,
  'g',
)

export function linkifyText(text: string): string {
  const placeholders: string[] = []
  let processed = text.replace(PROTECTED_RE, (match) => {
    const idx = placeholders.length
    placeholders.push(match)
    return `\x00PROTECTED${idx}\x00`
  })

  processed = processed.replace(PROTOCOL_URL_RE, (url) => {
    const idx = placeholders.length
    placeholders.push(`[${url}](${url})`)
    return `\x00PROTECTED${idx}\x00`
  })

  processed = processed.replace(WWW_URL_RE, (url) => {
    const idx = placeholders.length
    placeholders.push(`[${url}](https://${url})`)
    return `\x00PROTECTED${idx}\x00`
  })

  processed = processed.replace(BARE_DOMAIN_RE, (url) => {
    const idx = placeholders.length
    placeholders.push(`[${url}](https://${url})`)
    return `\x00PROTECTED${idx}\x00`
  })

  processed = processed.replace(/\x00PROTECTED(\d+)\x00/g, (_, idx) => {
    return placeholders[Number(idx)]
  })

  return processed
}
