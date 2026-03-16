/**
 * Share a URL via the native share sheet (mobile) or copy to clipboard (desktop).
 */
export async function shareOrCopyUrl(url: string): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> {
  try {
    if (navigator.share) {
      await navigator.share({ url })
      return 'shared'
    }
  } catch (err) {
    if ((err as DOMException)?.name === 'AbortError') return 'cancelled'
  }
  const copied = await copyToClipboard(url)
  return copied ? 'copied' : 'failed'
}

/**
 * Copy text to the clipboard with fallback for insecure contexts.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch { /* fall through to fallback */ }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    return true
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}
