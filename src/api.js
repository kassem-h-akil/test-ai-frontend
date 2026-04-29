const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

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

export async function createItem({ name, description }) {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description: description ?? '' }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Create failed: ${res.status}${text ? ` ${text}` : ''}`)
  }
  return res.json()
}

export async function updateItem(id, { name, description }) {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description: description ?? '' }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Update failed: ${res.status}${text ? ` ${text}` : ''}`)
  }
  return res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/items/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Delete failed: ${res.status}${text ? ` ${text}` : ''}`)
  }
}
