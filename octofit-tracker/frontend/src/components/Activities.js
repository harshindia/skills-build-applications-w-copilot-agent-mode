import React, { useEffect, useMemo, useState } from 'react';

const ENDPOINT = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

console.log('Activities endpoint', ENDPOINT);

function Activities() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchActivities() {
    console.log('Fetching Activities from', ENDPOINT);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      console.log('Fetched Activities data', data);
      const payload = Array.isArray(data) ? data : data?.results ?? [];
      setItems(payload);
    } catch (err) {
      console.error('Activities fetch error', err);
      setError(err.message || 'Unknown error');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }
    const query = searchTerm.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  }, [items, searchTerm]);

  const columns = filteredItems.length ? Object.keys(filteredItems[0]) : [];

  function openModal(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="mb-0 text-muted">Data loaded from the Django REST API endpoint.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="button" onClick={fetchActivities} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={() => setSearchTerm('')}>
            Clear
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-3 align-items-center mb-4">
          <div className="col-md-8">
            <label htmlFor="activitiesSearch" className="form-label visually-hidden">
              Filter activities
            </label>
            <input
              id="activitiesSearch"
              type="search"
              className="form-control"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="col-md-4 text-md-end">
            <p className="mb-0 text-muted">
              Showing {filteredItems.length} of {items.length} activities
            </p>
          </div>
        </form>

        {error && <div className="alert alert-danger">Error: {error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredItems.length ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? item.pk ?? index}>
                    {columns.map((column) => {
                      const value = item[column];
                      return <td key={column}>{typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}</td>;
                    })}
                    <td>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openModal(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning">No activities found.</div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <>
          <div className="modal d-block fade show modal-custom" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop-custom" onClick={closeModal} />
        </>
      )}
    </div>
  );
}

export default Activities;
