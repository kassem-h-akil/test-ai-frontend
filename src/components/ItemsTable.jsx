import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const initialFilters = {
  name: '',
  description: '',
  created_from: '',
  created_to: '',
}

function toIsoStart(dateStr) {
  return dateStr ? `${dateStr}T00:00:00` : ''
}

function toIsoEnd(dateStr) {
  return dateStr ? `${dateStr}T23:59:59` : ''
}

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

export default function ItemsTable() {
  const [filters, setFilters] = useState(initialFilters)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchItems({
        name: filters.name || undefined,
        description: filters.description || undefined,
        created_from: toIsoStart(filters.created_from) || undefined,
        created_to: toIsoEnd(filters.created_to) || undefined,
      })
      setItems(data)
    } catch (err) {
      setError(err.message)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    load()
  }

  const onReset = () => {
    setFilters(initialFilters)
    setTimeout(load, 0)
  }

  return (
    <section className="items">
      <div className="items-head">
        <h2>Store items</h2>
        <button type="button" className="btn btn-ghost" onClick={load} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <form className="filters" onSubmit={onSubmit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            value={filters.name}
            onChange={onChange('name')}
            placeholder="Search by name"
          />
        </label>
        <label>
          <span>Description</span>
          <input
            type="text"
            value={filters.description}
            onChange={onChange('description')}
            placeholder="Search description"
          />
        </label>
        <label>
          <span>Created from</span>
          <input type="date" value={filters.created_from} onChange={onChange('created_from')} />
        </label>
        <label>
          <span>Created to</span>
          <input type="date" value={filters.created_to} onChange={onChange('created_to')} />
        </label>
        <div className="filter-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Apply
          </button>
          <button type="button" className="btn btn-ghost" onClick={onReset} disabled={loading}>
            Reset
          </button>
        </div>
      </form>

      {error && <p className="error">Could not load items: {error}</p>}

      <div className="table-wrap">
        <table className="datatable">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th style={{ width: '200px' }}>Created date</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">No items match these filters.</td>
              </tr>
            )}
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.description}</td>
                <td>{formatDate(it.created_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
