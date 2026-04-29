import { useState } from 'react'
import { createItem, updateItem } from '../api.js'

export default function ItemForm({ item, onSaved, onCancel }) {
  const isEdit = !!item
  const [name, setName] = useState(item?.name ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Name is required')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const saved = isEdit
        ? await updateItem(item.id, { name: trimmedName, description })
        : await createItem({ name: trimmedName, description })
      onSaved(saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="item-form" onSubmit={onSubmit}>
      <h3>{isEdit ? `Edit item #${item.id}` : 'Add new item'}</h3>
      {error && <p className="error">{error}</p>}

      <label>
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          disabled={submitting}
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create item'}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
