import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p>
        <Link to="/dashboard" className="text-primary hover:underline">
          Ir al Dashboard
        </Link>
      </p>
    </div>
  )
}
