const trainers = [
  {
    id: 1,
    name: 'Alex Carter',
    specialty: 'Strength & Conditioning',
    level: 'Intermediate',
    tags: ['Strength', 'Form', 'Barbell'],
  },
  {
    id: 2,
    name: 'Mina Lee',
    specialty: 'Yoga & Mobility',
    level: 'All Levels',
    tags: ['Yoga', 'Breathing', 'Recovery'],
  },
  {
    id: 3,
    name: 'Diego Silva',
    specialty: 'HIIT & Weight Loss',
    level: 'Advanced',
    tags: ['HIIT', 'Fat burn', 'Cardio'],
  },
  {
    id: 4,
    name: 'Hana Kim',
    specialty: 'Pilates & Rehab',
    level: 'Beginner',
    tags: ['Pilates', 'Core', 'Rehab'],
  },
]

export default function Trainers() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Trainers</h1>
        <p>Find the perfect coach based on your goals, level, and style.</p>
      </div>

      <div className="pill-tabs">
        <button type="button" className="pill active">
          All
        </button>
        <button type="button" className="pill">
          Strength
        </button>
        <button type="button" className="pill">
          Yoga
        </button>
        <button type="button" className="pill">
          HIIT
        </button>
      </div>

      <div className="trainer-grid extended">
        {trainers.map((t) => (
          <div key={t.id} className="trainer-card">
            <div className="trainer-avatar" />
            <h3>{t.name}</h3>
            <p className="trainer-tag">{t.specialty}</p>
            <p className="trainer-desc">
              Level: <strong>{t.level}</strong>
            </p>
            <div className="tag-row">
              {t.tags.map((tag) => (
                <span key={tag} className="mini-tag">
                  {tag}
                </span>
              ))}
            </div>
            <button type="button" className="btn-xs full">
              Book session
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
