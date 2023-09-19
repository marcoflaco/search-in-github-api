export default function RepositoryList({ items }) {
  return (
    <>
      {items.map((repo) => (
        <div key={repo.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{repo.name}</h3>
            <p className="card-text">{repo.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}
