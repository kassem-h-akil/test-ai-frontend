const API_BASE = 'http://127.0.0.1:8000/api'

export async function fetchItems(filters = {}) {
  const params = new URLSearchParams()
  if (filters.name) params.set('name', filters.name)
  if (filters.description) params.set('description', filters.description)
  if (filters.created_from) params.set('created_from', filters.created_from)
  if (filters.created_to) params.set('created_to', filters.created_to)

  const qs = params.toString()
  const res = await fetch(`${API_BASE}/items${qs ? `?${qs}` : ''}`)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}
