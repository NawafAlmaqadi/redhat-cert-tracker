'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TRACKS } from '@/data/certs';

function allCerts(track) {
  return track.levels.flatMap(l => l.certs);
}

function Badge({ type }) {
  const map = {
    technologist: ['badge-level', 'Technologist'],
    required:     ['badge-required', 'Required'],
    elective:     ['badge-elective', 'Elective'],
    architect:    ['badge-rhca', 'RHCA'],
  };
  const [cls, label] = map[type] || ['badge-level', type];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// ── CertCard ───────────────────────────────────────────────────────
function CertCard({ cert, trackColor, completed, onToggle, saving, isGuest }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  function handleCheck() {
    if (!saving) onToggle(cert.code, !completed);
  }

  return (
    <div
      className={`cert-card${completed ? ' completed' : ''}${cert.type === 'architect' ? ' rhca-card' : ''}`}
      style={{ '--track-color': trackColor }}
    >
      <div className="cert-card-top">
        <button
          className="cert-checkbox"
          onClick={handleCheck}
          title="Mark as completed"
          disabled={saving}
        >
          {completed && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </button>
        <div className="cert-info">
          <div className="cert-code">{cert.code}</div>
          <div className="cert-name">{cert.name}</div>
        </div>
      </div>

      <div className="cert-badges">
        <span className="badge badge-level">Level {cert.level}</span>
        <Badge type={cert.type} />
        {cert.prereqs.length > 0 && (
          <span className="badge badge-prereq">Prereq: {cert.prereqs.join(', ')}</span>
        )}
      </div>

      {expanded && (
        <div className="cert-details">
          <div className="cert-details-row"><span className="cert-details-label">Credential:</span><span>{cert.credential}</span></div>
          <div className="cert-details-row"><span className="cert-details-label">Duration:</span><span>{cert.duration}</span></div>
          <div className="cert-details-row"><span className="cert-details-label">Version:</span><span>{cert.version}</span></div>
          <div className="cert-details-row"><span className="cert-details-label">Prereqs:</span><span>{cert.prereqs.join(', ') || 'None'}</span></div>
          <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{cert.desc}</p>
          <a href={cert.url} target="_blank" rel="noopener" className="cert-link" onClick={e => e.stopPropagation()}>
            View on Red Hat ↗
          </a>
        </div>
      )}

      <button className={`cert-expand-btn${expanded ? ' open' : ''}`} onClick={() => setExpanded(v => !v)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
        Details
      </button>
    </div>
  );
}

// ── TrackSection ───────────────────────────────────────────────────
function TrackSection({ track, completedSet, onToggle, saving, isGuest }) {
  const certs = allCerts(track);
  const done = certs.filter(c => completedSet.has(c.code)).length;
  const total = certs.filter(c => c.type !== 'architect').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <section className="track-section" id={`section-${track.id}`}>
      <div className="track-header">
        <div className="track-icon" style={{ background: track.color }}>
          {track.name[0]}
        </div>
        <div className="track-info">
          <div className="track-name">{track.name}</div>
          <div className="track-desc">{track.desc}</div>
        </div>
        <div className="track-progress-mini">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{done}/{total}</span>
          <div className="track-bar-wrap">
            <div className="track-bar-fill" style={{ width: `${pct}%`, background: track.color }} />
          </div>
        </div>
      </div>

      {track.levels.map((level, li) => (
        <div key={li} className="level-group">
          <div className="level-label">
            {level.label}
            {level.sublabel && <span className="level-sublabel"> — {level.sublabel}</span>}
          </div>
          <div className="certs-grid">
            {level.certs.map(cert => (
              <CertCard
                key={cert.code + track.id}
                cert={cert}
                trackColor={track.color}
                completed={completedSet.has(cert.code)}
                onToggle={onToggle}
                saving={saving}
                isGuest={isGuest}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);         // null = guest, object = logged in
  const [completedSet, setCompletedSet] = useState(new Set());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [activeTrack, setActiveTrack] = useState('all');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState(null);

  // Try to load user — if not logged in, show as guest (don't redirect)
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          setCompletedSet(new Set(data.completedCerts));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('rh_theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('rh_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  function showToast(msg, type = 'info') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function handleToggle(code, completed) {
    // Guest: update local state only — not saved to DB
    if (isGuest) {
      if (completed) {
        setCompletedSet(s => new Set([...s, code]));
      } else {
        setCompletedSet(s => { const n = new Set(s); n.delete(code); return n; });
      }
      return;
    }

    setSaving(true);
    const prev = new Set(completedSet);
    if (completed) {
      setCompletedSet(s => new Set([...s, code]));
    } else {
      setCompletedSet(s => { const n = new Set(s); n.delete(code); return n; });
    }
    try {
      const res = await fetch('/api/certs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, completed }),
      });
      if (!res.ok) throw new Error();
      showToast(completed ? `${code} marked complete` : `${code} unmarked`, completed ? 'success' : 'info');
    } catch {
      setCompletedSet(prev);
      showToast('Failed to save. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!confirm('Reset all your certification progress? This cannot be undone.')) return;
    setSaving(true);
    try {
      await fetch('/api/certs', { method: 'DELETE' });
      setCompletedSet(new Set());
      showToast('Progress reset', 'info');
    } catch {
      showToast('Reset failed. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setCompletedSet(new Set());
    showToast('Signed out', 'info');
  }

  const isGuest = !user;
  const allCertsFlat = TRACKS.flatMap(allCerts);
  const totalExams = allCertsFlat.filter(c => c.type !== 'architect').length;
  const completedCount = allCertsFlat.filter(c => completedSet.has(c.code) && c.type !== 'architect').length;
  const rhcaCount = TRACKS.filter(t => {
    const req = t.rhcaRequirement;
    const reqDone = req.required.filter(c => completedSet.has(c)).length;
    const electives = t.levels.flatMap(l => l.certs.filter(c => c.type === 'elective').map(c => c.code));
    const elDone = electives.filter(c => completedSet.has(c)).length;
    return reqDone === req.required.length && elDone >= (req.electivesNeeded || 0);
  }).length;

  function certMatchesFilters(cert) {
    const q = search.toLowerCase();
    if (q && !cert.code.toLowerCase().includes(q) && !cert.name.toLowerCase().includes(q)) return false;
    if (levelFilter && String(cert.level) !== levelFilter) return false;
    if (statusFilter === 'completed' && !completedSet.has(cert.code)) return false;
    if (statusFilter === 'pending' && completedSet.has(cert.code)) return false;
    return true;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <svg className="logo-hat" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L36 14v12l-16 10L4 26V14L20 4z" fill="var(--rh-red)" />
              <path d="M20 4L4 14l16 10 16-10L20 4z" fill="var(--rh-red-light)" />
            </svg>
            <span className="logo-text">Red Hat <span>Tracker</span></span>
          </div>
          <div className="header-spacer" />
          <div className="header-actions">
            {isGuest ? (
              <>
                <Link href="/login" className="btn btn-ghost">Sign in</Link>
                <Link href="/register" className="btn btn-primary" style={{ padding: '7px 14px', fontSize: '0.85rem' }}>
                  Create account
                </Link>
              </>
            ) : (
              <>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  👤 {user.displayName}
                </span>
                <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                <button className="btn btn-ghost" onClick={handleLogout}>Sign out</button>
              </>
            )}
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      {/* Guest banner */}
      {isGuest && (
        <div className="guest-banner">
          🚧 <strong>BETA</strong> — Create your account to save your progress.{' '}
          <Link href="/register">Sign up free →</Link>
        </div>
      )}

      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Red Hat <span>Certification</span> Tracker</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">Exams Passed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalExams - completedCount}</div>
            <div className="stat-label">Remaining</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalExams ? Math.round((completedCount / totalExams) * 100) : 0}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{rhcaCount}</div>
            <div className="stat-label">RHCA Tracks Complete</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="chips">
          {[{ id: 'all', name: 'All Tracks' }, ...TRACKS].map(t => (
            <button
              key={t.id}
              className={`chip${activeTrack === t.id ? ' active' : ''}`}
              onClick={() => setActiveTrack(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="filter-bar">
          <input
            className="search-input"
            placeholder="Search certs or exam codes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-select" value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
            <option value="">All Levels</option>
            <option value="1">Level 1 — Technologist</option>
            <option value="2">Level 2 — Admin</option>
            <option value="3">Level 3 — Engineer</option>
            <option value="4">Level 4 — Specialist</option>
            <option value="5">Level 5 — Architect</option>
          </select>
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Track Sections */}
      <main className="main-content">
        {TRACKS.map(track => {
          const trackVisible = activeTrack === 'all' || activeTrack === track.id;
          const filteredTrack = {
            ...track,
            levels: track.levels.map(lvl => ({
              ...lvl,
              certs: lvl.certs.filter(certMatchesFilters),
            })).filter(lvl => lvl.certs.length > 0),
          };
          if (!trackVisible || filteredTrack.levels.length === 0) return null;

          return (
            <TrackSection
              key={track.id}
              track={filteredTrack}
              completedSet={completedSet}
              onToggle={handleToggle}
              saving={saving}
              isGuest={isGuest}
            />
          );
        })}
      </main>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? '✓' : 'ℹ'} {toast.msg}
        </div>
      )}
    </div>
  );
}
