import ItemsTable from '../components/ItemsTable.jsx'

export default function Landing() {
  return (
    <section className="landing">
      <div className="hero">
        <h1>Build smarter with TestAI</h1>
        <p className="tagline">
          A modern starter that gets you from idea to product faster.
        </p>
      </div>

      <ItemsTable />
    </section>
  )
}
