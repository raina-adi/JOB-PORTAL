import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiSearch,
  FiMapPin,
  FiArrowRight,
  FiStar,
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiCheckCircle,
  FiFileText,
  FiBell,
  FiShield,
  FiBookmark
} from 'react-icons/fi';

import api from '../services/api';
import JobCard from '../components/JobCard';
import './Home.css';


// ========================================
// JOB CATEGORIES
// ========================================

const CATEGORIES = [
  { icon: '💻', label: 'Technology', count: 'Explore jobs' },
  { icon: '📊', label: 'Finance', count: 'Explore jobs' },
  { icon: '🎨', label: 'Design', count: 'Explore jobs' },
  { icon: '📣', label: 'Marketing', count: 'Explore jobs' },
  { icon: '⚕️', label: 'Healthcare', count: 'Explore jobs' },
  { icon: '📚', label: 'Education', count: 'Explore jobs' },
  { icon: '🏗️', label: 'Engineering', count: 'Explore jobs' },
  { icon: '🤝', label: 'Sales', count: 'Explore jobs' },
];


// ========================================
// PLATFORM STATS
// ========================================

const STATS = [
  {
    icon: <FiBriefcase />,
    value: 'Live',
    label: 'Job Listings'
  },
  {
    icon: <FiUsers />,
    value: '2',
    label: 'User Roles'
  },
  {
    icon: <FiStar />,
    value: 'Easy',
    label: 'Job Search'
  },
  {
    icon: <FiTrendingUp />,
    value: 'Real-time',
    label: 'Application Tracking'
  },
];


// ========================================
// PLATFORM FEATURES
// ========================================

const FEATURES = [
  {
    icon: <FiSearch />,
    title: 'Job Search',
    description:
      'Search for opportunities by job title, skills, category, and location.'
  },
  {
    icon: <FiFileText />,
    title: 'Easy Applications',
    description:
      'Apply for suitable positions using your profile and resume.'
  },
  {
    icon: <FiBookmark />,
    title: 'Save Jobs',
    description:
      'Save interesting job opportunities and access them later.'
  },
  {
    icon: <FiBell />,
    title: 'Notifications',
    description:
      'Stay updated with application status and important platform notifications.'
  },
  {
    icon: <FiUsers />,
    title: 'Employer Portal',
    description:
      'Employers can create job listings and manage applications.'
  },
  {
    icon: <FiShield />,
    title: 'Role-based Access',
    description:
      'Separate access and dashboards for job seekers, employers, and administrators.'
  }
];


// ========================================
// HOME PAGE
// ========================================

export default function Home() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);


  // ========================================
  // LOAD FEATURED JOBS
  // ========================================

  useEffect(() => {
    api
      .get('/jobs?limit=6&sort=newest')
      .then(({ data }) => {
        setFeaturedJobs(data.data || []);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingJobs(false);
      });
  }, []);


  // ========================================
  // SEARCH JOBS
  // ========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword) {
      params.set('keyword', keyword);
    }

    if (location) {
      params.set('location', location);
    }

    navigate(`/jobs?${params.toString()}`);
  };


  return (
    <div className="home-page">

      {/* ========================================
          HERO SECTION
      ======================================== */}

      <section className="hero-section">

        <div className="hero-bg-pattern"></div>

        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>


        <div className="container hero-content">

          <div className="hero-badge animate-float">
            <FiZap size={14} />

            <span>
              Find opportunities that match your skills
            </span>
          </div>


          <h1
            className="hero-title animate-float"
            style={{ animationDelay: '60ms' }}
          >
            Find Your{' '}
            <span className="hero-title-gradient">
              Next Opportunity
            </span>

            <br />

            All in One Place
          </h1>


          <p
            className="hero-subtitle animate-float"
            style={{ animationDelay: '120ms' }}
          >
            Search for jobs, connect with employers, apply for
            suitable positions, and track your applications from
            one simple platform.
          </p>


          {/* SEARCH FORM */}

          <form
            className="hero-search animate-float"
            onSubmit={handleSearch}
            style={{ animationDelay: '180ms' }}
          >

            <div className="hero-search-field">

              <FiSearch
                className="hero-search-icon"
                size={18}
              />

              <input
                type="text"
                placeholder="Job title, skills, or keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="hero-search-input"
              />

            </div>


            <div className="hero-search-divider"></div>


            <div className="hero-search-field">

              <FiMapPin
                className="hero-search-icon"
                size={18}
              />

              <input
                type="text"
                placeholder="City or Remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="hero-search-input"
              />

            </div>


            <button
              type="submit"
              className="btn btn-primary hero-search-btn"
            >
              Search Jobs

              <FiArrowRight size={16} />
            </button>

          </form>


          {/* POPULAR SEARCHES */}

          <div
            className="hero-popular animate-float"
            style={{ animationDelay: '240ms' }}
          >

            <span className="hero-popular-label">
              Popular:
            </span>


            {[
              'React Developer',
              'Product Manager',
              'UI Designer',
              'Data Scientist',
              'Remote'
            ].map((t) => (

              <button
                key={t}
                className="tag"
                onClick={() =>
                  navigate(`/jobs?keyword=${t}`)
                }
              >
                {t}
              </button>

            ))}

          </div>

        </div>


        {/* ========================================
            PLATFORM STATS
        ======================================== */}

        <div className="container">

          <div className="hero-stats stagger">

            {STATS.map((s) => (

              <div
                key={s.label}
                className="hero-stat animate-float"
              >

                <div className="hero-stat-icon">
                  {s.icon}
                </div>


                <div>

                  <div className="hero-stat-value">
                    {s.value}
                  </div>

                  <div className="hero-stat-label">
                    {s.label}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ========================================
          CATEGORIES
      ======================================== */}

      <section className="section categories-section">

        <div className="container">

          <div className="section-header">

            <div>

              <p className="section-eyebrow">
                Explore by Industry
              </p>

              <h2 className="section-title">
                Browse Job{' '}
                <span className="text-gradient">
                  Categories
                </span>
              </h2>

            </div>


            <Link
              to="/jobs"
              className="btn btn-outline"
              style={{ flexShrink: 0 }}
            >
              All Categories

              <FiArrowRight size={15} />
            </Link>

          </div>


          <div className="categories-grid stagger">

            {CATEGORIES.map((cat) => (

              <button
                key={cat.label}
                className="category-card animate-float"
                onClick={() =>
                  navigate(`/jobs?keyword=${cat.label}`)
                }
              >

                <span className="category-icon">
                  {cat.icon}
                </span>


                <div>

                  <p className="category-label">
                    {cat.label}
                  </p>

                  <p className="category-count">
                    {cat.count}
                  </p>

                </div>


                <FiArrowRight
                  size={14}
                  className="category-arrow"
                />

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* ========================================
          FEATURED JOBS
      ======================================== */}

      <section className="section featured-section">

        <div className="container">

          <div className="section-header">

            <div>

              <p className="section-eyebrow">
                Latest Listings
              </p>

              <h2 className="section-title">
                Latest{' '}
                <span className="text-gradient">
                  Opportunities
                </span>
              </h2>

            </div>


            <Link
              to="/jobs"
              className="btn btn-outline"
              style={{ flexShrink: 0 }}
            >
              View All Jobs

              <FiArrowRight size={15} />
            </Link>

          </div>


          {loadingJobs ? (

            <div className="jobs-skeleton-grid">

              {[...Array(6)].map((_, i) => (

                <div
                  key={i}
                  className="job-skeleton-card"
                >

                  <div
                    className="skeleton"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12
                    }}
                  ></div>


                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >

                    <div
                      className="skeleton"
                      style={{
                        height: 18,
                        width: '70%'
                      }}
                    ></div>

                    <div
                      className="skeleton"
                      style={{
                        height: 14,
                        width: '45%'
                      }}
                    ></div>

                    <div
                      className="skeleton"
                      style={{
                        height: 14,
                        width: '60%'
                      }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          ) : featuredJobs.length > 0 ? (

            <div className="featured-jobs-grid stagger">

              {featuredJobs.map((job) => (

                <JobCard
                  key={job._id}
                  job={job}
                />

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-state-icon">
                🔍
              </div>

              <h3>
                No jobs yet
              </h3>

              <p>
                Check back soon for new job opportunities.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ========================================
          HOW IT WORKS
      ======================================== */}

      <section className="section how-section">

        <div className="container">

          <div className="how-inner">

            <div className="how-content">

              <p className="section-eyebrow">
                How It Works
              </p>


              <h2 className="section-title">
                Find and Apply for Jobs{' '}
                <span className="text-gradient">
                  Easily
                </span>
              </h2>


              <p className="section-subtitle">
                Create your profile, explore job opportunities,
                apply for suitable positions, and track your
                applications from one place.
              </p>


              <div className="how-steps">

                {[
                  {
                    num: '01',
                    title: 'Create your profile',
                    desc:
                      'Add your education, skills, experience, and resume to build your profile.'
                  },
                  {
                    num: '02',
                    title: 'Find suitable jobs',
                    desc:
                      'Search and explore job opportunities based on your skills and preferred location.'
                  },
                  {
                    num: '03',
                    title: 'Apply for jobs',
                    desc:
                      'Submit applications directly through the platform using your profile.'
                  },
                  {
                    num: '04',
                    title: 'Track your applications',
                    desc:
                      'View your application status and keep track of your job applications.'
                  }
                ].map((step, i) => (

                  <div
                    key={i}
                    className="how-step"
                  >

                    <div className="how-step-num">
                      {step.num}
                    </div>


                    <div>

                      <h4 className="how-step-title">
                        {step.title}
                      </h4>

                      <p className="how-step-desc">
                        {step.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              <Link
                to="/register"
                className="btn btn-primary btn-lg"
              >
                Get Started Free

                <FiArrowRight size={18} />
              </Link>

            </div>


            {/* ========================================
                APPLICATION PREVIEW
            ======================================== */}

            <div className="how-visual">

              <div className="how-visual-card">

                <div className="how-visual-header">

                  <div className="avatar avatar-md">
                    JS
                  </div>


                  <div>

                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      Job Seeker Profile
                    </p>


                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)'
                      }}
                    >
                      Profile & Application Tracking
                    </p>

                  </div>


                  <span
                    className="badge badge-success"
                    style={{
                      marginLeft: 'auto'
                    }}
                  >
                    Active
                  </span>

                </div>


                <div className="how-visual-divider"></div>


                {[
                  {
                    company: 'Tech Solutions',
                    role: 'Software Developer',
                    status: 'Applied',
                    color: 'status-interview'
                  },
                  {
                    company: 'Digital Systems',
                    role: 'Frontend Developer',
                    status: 'Shortlisted',
                    color: 'status-shortlisted'
                  },
                  {
                    company: 'Innovate Labs',
                    role: 'Backend Developer',
                    status: 'Under Review',
                    color: 'status-under-review'
                  }
                ].map((app, i) => (

                  <div
                    key={i}
                    className="how-visual-app"
                  >

                    <div
                      className="company-logo-placeholder"
                      style={{
                        width: 36,
                        height: 36,
                        fontSize: 12,
                        borderRadius: 8
                      }}
                    >
                      {app.company
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>


                    <div
                      style={{
                        flex: 1
                      }}
                    >

                      <p
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 600
                        }}
                      >
                        {app.role}
                      </p>


                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-muted)'
                        }}
                      >
                        {app.company}
                      </p>

                    </div>


                    <span
                      className={`badge ${app.color}`}
                    >
                      {app.status}
                    </span>

                  </div>

                ))}


                <div className="how-visual-checks">

                  {[
                    'Profile information added',
                    'Resume uploaded',
                    'Applications tracked'
                  ].map((c, i) => (

                    <div
                      key={i}
                      className="how-visual-check"
                    >

                      <FiCheckCircle
                        size={14}
                        color="var(--color-success)"
                      />

                      <span>
                        {c}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          PLATFORM FEATURES
      ======================================== */}

      <section className="section testimonials-section">

        <div className="container">

          <div
            style={{
              textAlign: 'center',
              marginBottom: 'var(--space-12)'
            }}
          >

            <p className="section-eyebrow">
              Platform Features
            </p>


            <h2 className="section-title">
              Everything You Need to{' '}
              <span className="text-gradient">
                Manage Your Job Search
              </span>
            </h2>

          </div>


          <div className="testimonials-grid stagger">

            {FEATURES.map((feature, i) => (

              <div
                key={i}
                className="testimonial-card animate-float"
              >

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4
                  }}
                >
                  {feature.icon}
                </div>


                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {feature.title}
                </h3>


                <p className="testimonial-text">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ========================================
          CTA
      ======================================== */}

      <section className="cta-section">

        <div className="container">

          <div className="cta-inner">

            <div className="cta-orb"></div>


            <h2 className="cta-title">
              Ready to Find Your Next Opportunity?
            </h2>


            <p className="cta-subtitle">
              Create your profile and start exploring job
              opportunities today.
            </p>


            <div className="cta-actions">

              <Link
                to="/register"
                className="btn btn-xl"
                style={{
                  background: '#fff',
                  color: 'var(--color-primary)',
                  fontWeight: 700
                }}
              >
                Start for Free

                <FiArrowRight size={20} />
              </Link>


              <Link
                to="/jobs"
                className="btn btn-xl"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                Browse Jobs
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="footer">

        <div className="container">

          <div className="footer-grid">

            <div className="footer-brand">

              <div
                className="navbar-logo"
                style={{ marginBottom: 12 }}
              >

                <div className="navbar-logo-icon">
                  <FiBriefcase size={18} />
                </div>


                <span className="navbar-logo-text">
                  Job
                  <span className="logo-accent">
                    Portal
                  </span>
                </span>

              </div>


              <p className="footer-brand-desc">
                Connecting talent with opportunity across
                India and beyond.
              </p>

            </div>


            {/* JOB SEEKERS */}

            <div className="footer-col">

              <h5>
                Job Seekers
              </h5>

              <Link to="/jobs">
                Browse Jobs
              </Link>

              <Link to="/register?role=seeker">
                Create Account
              </Link>

              <Link to="/login">
                Sign In
              </Link>

            </div>


            {/* EMPLOYERS */}

            <div className="footer-col">

              <h5>
                Employers
              </h5>

              <Link to="/register?role=employer">
                Post a Job
              </Link>

              <Link to="/employer">
                Employer Dashboard
              </Link>

            </div>


            {/* COMPANY */}

            <div className="footer-col">

              <h5>
                Company
              </h5>

              <a href="#">
                About Us
              </a>

              <a href="#">
                Privacy Policy
              </a>

              <a href="#">
                Terms of Service
              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <p>
              © 2026 JobPortal by Raina. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}
