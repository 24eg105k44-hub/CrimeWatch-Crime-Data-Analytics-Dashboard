import React, { useMemo, useState, useEffect } from 'react'
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, CalendarDays,
  ChevronDown, ChevronLeft, ChevronRight, Clock3, Download, FileText, Filter,
  LayoutDashboard, MapPin, Menu, Search, Shield, ShieldAlert, SlidersHorizontal,
  Target, Users, X, BarChart3, Settings, CircleHelp, Eye, MoreHorizontal,
  CheckCircle2, AlertCircle, TrendingUp, Plus, PhoneCall, Radio, Send, Check, RefreshCw,
  Info, Trash2
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'

const API_BASE_URL = 'https://crimewatch-backend-t8yo.onrender.com/api/incidents'
const TIPS_API_URL = 'https://crimewatch-backend-t8yo.onrender.com/api/tips'

const trendData = [
  { month: 'Jan', reported: 420, solved: 286 },
  { month: 'Feb', reported: 385, solved: 271 },
  { month: 'Mar', reported: 510, solved: 342 },
  { month: 'Apr', reported: 465, solved: 325 },
  { month: 'May', reported: 570, solved: 390 },
  { month: 'Jun', reported: 495, solved: 356 },
  { month: 'Jul', reported: 620, solved: 422 },
  { month: 'Aug', reported: 548, solved: 398 },
  { month: 'Sep', reported: 590, solved: 431 },
  { month: 'Oct', reported: 525, solved: 401 },
  { month: 'Nov', reported: 645, solved: 450 },
  { month: 'Dec', reported: 578, solved: 419 }
]

const categoryData = [
  { name: 'Theft', value: 32, color: '#f04452' },
  { name: 'Assault', value: 24, color: '#ff8a65' },
  { name: 'Burglary', value: 19, color: '#f6bd60' },
  { name: 'Fraud', value: 14, color: '#7c83fd' },
  { name: 'Other', value: 11, color: '#64748b' }
]

const initialCases = [
  {
    id: 'CR-2481',
    type: 'Burglary',
    category: 'Burglary',
    area: 'Central District',
    address: '402 Oak Street, Suite 300',
    date: 'Oct 10, 2026',
    time: '09:42 AM',
    status: 'Under review',
    level: 'High',
    officer: 'Det. Marcus Vance (Badge #482)',
    description: 'Commercial forced entry alarm at retail property. Rear glass door shattered, cash registers emptied and inventory disturbed.',
    evidence: 'CCTV footage recovered from adjacent alleyway; forensic fingerprint samples collected.'
  },
  {
    id: 'CR-2480',
    type: 'Vehicle theft',
    category: 'Theft',
    area: 'North Quarter',
    address: '810 Pine Ridge Ave (Parking Lot B)',
    date: 'Oct 10, 2026',
    time: '08:17 AM',
    status: 'Investigating',
    level: 'Medium',
    officer: 'Officer Sarah Chen (Badge #619)',
    description: 'Late-model silver SUV reported missing from office garage overnight. Keyless relay device suspected.',
    evidence: 'Automated License Plate Reader (ALPR) hit registered at highway 101 North exit.'
  },
  {
    id: 'CR-2479',
    type: 'Assault',
    category: 'Assault',
    area: 'East Borough',
    address: 'Corner of 14th St & Lexington',
    date: 'Oct 09, 2026',
    time: '11:36 PM',
    status: 'Resolved',
    level: 'High',
    officer: 'Sgt. David Miller (Badge #304)',
    description: 'Physical altercation outside entertainment venue. Paramedics dispatched, victim treated for minor injuries.',
    evidence: 'Suspect detained on-scene; witness statements recorded by patrol officers.'
  },
  {
    id: 'CR-2478',
    type: 'Online fraud',
    category: 'Fraud',
    area: 'West End',
    address: '742 Meadowbrook Court',
    date: 'Oct 09, 2026',
    time: '06:24 PM',
    status: 'Investigating',
    level: 'Low',
    officer: 'Cyber Unit Spec. Rivera (Badge #912)',
    description: 'Elder financial scam involving fraudulent cryptocurrency investment portal. Losses estimated at $4,500.',
    evidence: 'Transaction hashes, spoofed email headers, and IP connection logs secured.'
  },
  {
    id: 'CR-2477',
    type: 'Street theft',
    category: 'Theft',
    area: 'Central District',
    address: 'Metro Transit Station, Exit 2',
    date: 'Oct 09, 2026',
    time: '02:05 PM',
    status: 'Under review',
    level: 'Medium',
    officer: 'Transit Officer Gomez (Badge #114)',
    description: 'Pickpocketing report during peak commuter transit hour. Smartphone and credit cards taken.',
    evidence: 'Station turnstile timestamp and surveillance camera feed queued for review.'
  },
  {
    id: 'CR-2476',
    type: 'Vandalism',
    category: 'Other',
    area: 'South Industrial',
    address: 'Warehouse Sector 4, Dock 12',
    date: 'Oct 08, 2026',
    time: '04:15 AM',
    status: 'Resolved',
    level: 'Low',
    officer: 'Officer Tyler Ross (Badge #753)',
    description: 'Graffiti tagging and security fence breach on commercial distribution perimeter.',
    evidence: 'Paint canisters recovered; security patrol logs filed.'
  },
  {
    id: 'CR-2475',
    type: 'Armed robbery',
    category: 'Assault',
    area: 'East Borough',
    address: '228 Highland Ave Convenience Store',
    date: 'Oct 08, 2026',
    time: '10:48 PM',
    status: 'Investigating',
    level: 'High',
    officer: 'Det. Marcus Vance (Badge #482)',
    description: 'Armed robbery at 24-hour convenience store. Suspect displayed firearm and demanded cash till.',
    evidence: 'High-definition store camera audio/video; ballistic casings logged.'
  },
  {
    id: 'CR-2474',
    type: 'Identity theft',
    category: 'Fraud',
    area: 'Central District',
    address: '350 Financial Plaza',
    date: 'Oct 07, 2026',
    time: '11:15 AM',
    status: 'Under review',
    level: 'Medium',
    officer: 'Cyber Unit Spec. Rivera (Badge #912)',
    description: 'Unauthorized credit accounts opened using victim credentials at multiple banking institutions.',
    evidence: 'Credit bureau inquiry trails and forged identification scans gathered.'
  },
  {
    id: 'CR-2473',
    type: 'Residential burglary',
    category: 'Burglary',
    area: 'West End',
    address: '1150 Elmwood Drive',
    date: 'Oct 07, 2026',
    time: '03:30 PM',
    status: 'Resolved',
    level: 'High',
    officer: 'Sgt. David Miller (Badge #304)',
    description: 'Forced side-window entry while homeowners were away. Jewelry and lockbox taken.',
    evidence: 'Stolen goods recovered at local pawn shop; suspect apprehended.'
  },
  {
    id: 'CR-2472',
    type: 'Bicycle theft',
    category: 'Theft',
    area: 'North Quarter',
    address: 'University Arts Plaza Bike Rack',
    date: 'Oct 06, 2026',
    time: '01:20 PM',
    status: 'Resolved',
    level: 'Low',
    officer: 'Campus Liaison Ward (Badge #210)',
    description: 'Cable lock cut; high-end electric commuter bicycle stolen.',
    evidence: 'Serial number verified on national database; bike recovered in North park.'
  },
  {
    id: 'CR-2471',
    type: 'Narcotics possession',
    category: 'Other',
    area: 'South Industrial',
    address: 'Freight Terminal Way & 3rd',
    date: 'Oct 06, 2026',
    time: '09:05 PM',
    status: 'Investigating',
    level: 'Medium',
    officer: 'Task Force K-9 Unit (Badge #508)',
    description: 'Suspicious vehicle search yielded controlled substances packaged for distribution.',
    evidence: 'Narcotics sealed into evidence locker; chemical lab verification underway.'
  },
  {
    id: 'CR-2470',
    type: 'Aggravated assault',
    category: 'Assault',
    area: 'Central District',
    address: 'Grand Avenue & 6th St',
    date: 'Oct 05, 2026',
    time: '01:45 AM',
    status: 'Resolved',
    level: 'High',
    officer: 'Officer Sarah Chen (Badge #619)',
    description: 'Late night altercation resulting in blunt force injury. Emergency dispatch unit arrived within 3 minutes.',
    evidence: 'Surveillance footage from hotel valet confirmed suspect identity.'
  }
]

const districtData = [
  { district: 'Central District', code: 'Central', reported: 48, resolved: 34, risk: 'High', trend: '+8.4%' },
  { district: 'East Borough', code: 'East', reported: 42, resolved: 31, risk: 'High', trend: '+5.1%' },
  { district: 'North Quarter', code: 'North', reported: 29, resolved: 23, risk: 'Medium', trend: '-2.3%' },
  { district: 'South Industrial', code: 'South', reported: 25, resolved: 18, risk: 'Medium', trend: '+1.0%' },
  { district: 'West End', code: 'West', reported: 14, resolved: 12, risk: 'Low', trend: '-9.5%' }
]

const clearanceRateData = [
  { month: 'Jan', rate: 68 },
  { month: 'Feb', rate: 70 },
  { month: 'Mar', rate: 67 },
  { month: 'Apr', rate: 70 },
  { month: 'May', rate: 68 },
  { month: 'Jun', rate: 72 },
  { month: 'Jul', rate: 68 },
  { month: 'Aug', rate: 73 },
  { month: 'Sep', rate: 73 },
  { month: 'Oct', rate: 76 },
  { month: 'Nov', rate: 70 },
  { month: 'Dec', rate: 72 }
]

const dayOfWeekData = [
  { day: 'Mon', incidents: 18 },
  { day: 'Tue', incidents: 22 },
  { day: 'Wed', incidents: 19 },
  { day: 'Thu', incidents: 25 },
  { day: 'Fri', incidents: 38 },
  { day: 'Sat', incidents: 44 },
  { day: 'Sun', incidents: 32 }
]

const communityAdvisories = [
  {
    id: 1,
    title: 'Commercial Corridor Lockout Notice',
    area: 'Central District (Oak & Grand)',
    type: 'alert',
    desc: 'Businesses are urged to inspect rear commercial service doors and test perimeter alarms following overnight forced entry reports.',
    time: '2 hours ago',
    badge: 'High Priority'
  },
  {
    id: 2,
    title: 'Transit Hub Pickpocket Awareness',
    area: 'Central Transit Hub & Subway Line 2',
    type: 'info',
    desc: 'Uniformed patrol presence doubled around turnstile gates during 4:00 PM – 7:00 PM peak commute periods.',
    time: 'Yesterday',
    badge: 'Advisory'
  },
  {
    id: 3,
    title: 'Neighborhood Watch Lighting Initiative',
    area: 'East Borough & North Residential Sectors',
    type: 'check',
    desc: 'Public lighting repairs completed at 18 residential intersections. Citizen patrol teams reported 22% reduction in unlit alley complaints.',
    time: '3 days ago',
    badge: 'Resolved'
  }
]

const safetyScores = [
  { area: 'West End', score: 88, status: 'Safe Sector', color: '#38c995' },
  { area: 'North Quarter', score: 79, status: 'Moderate Safety', color: '#38c995' },
  { area: 'South Industrial', score: 72, status: 'Industrial Watch', color: '#f6bd60' },
  { area: 'Central District', score: 66, status: 'High Vigilance', color: '#f6bd60' },
  { area: 'East Borough', score: 61, status: 'Reinforced Patrols', color: '#f04452' }
]

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Crime Reports', icon: FileText },
  { label: 'Hotspot Analysis', icon: Target },
  { label: 'Trends & Insights', icon: BarChart3 },
  { label: 'Community', icon: Users }
]

function StatCard({ icon: Icon, label, value, delta, positive, accent, note }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${accent}`}><Icon size={18}/></span>
        <span className="stat-label">{label}</span>
        <button className="icon-button tiny" aria-label={`More about ${label}`}><MoreHorizontal size={17}/></button>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-bottom">
        <span className={`delta ${positive ? 'up' : 'down'}`}>
          {positive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {delta}
        </span>
        <span className="stat-note">{note}</span>
      </div>
    </article>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [period, setPeriod] = useState('This year')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [areaFilter, setAreaFilter] = useState('All areas')
  const [showFilters, setShowFilters] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState('')
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [selectedCase, setSelectedCase] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Community tip form state
  const [tipArea, setTipArea] = useState('Central District')
  const [tipCategory, setTipCategory] = useState('Suspicious Activity')
  const [tipDesc, setTipDesc] = useState('')
  const [submittingTip, setSubmittingTip] = useState(false)

  // New incident form state
  const [newCaseType, setNewCaseType] = useState('Burglary')
  const [newCaseCategory, setNewCaseCategory] = useState('Burglary')
  const [newCaseArea, setNewCaseArea] = useState('Central District')
  const [newCaseAddress, setNewCaseAddress] = useState('')
  const [newCasePriority, setNewCasePriority] = useState('Medium')
  const [newCaseDesc, setNewCaseDesc] = useState('')

  function notify(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  // Fetch incidents from Spring Boot backend (GET /api/incidents)
  async function fetchIncidents() {
    setLoading(true)
    setApiError(null)
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} (${response.statusText || 'Server Error'})`)
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        // Map backend fields accurately
        const mapped = data.map(item => ({
          id: item.id || '',
          type: item.type || '',
          category: item.category || 'Other',
          area: item.area || 'Unknown',
          address: item.address || '',
          date: item.date || '',
          time: item.time || '',
          status: item.status || 'Under review',
          level: item.level || 'Medium',
          officer: item.officer || 'Unassigned',
          description: item.description || '',
          evidence: item.evidence || ''
        }))
        setCases(mapped)
        notify(`Synchronized ${mapped.length} incidents from backend API`)
      } else {
        throw new Error('API returned unexpected response structure')
      }
    } catch (err) {
      console.warn('Backend fetch failed, utilizing cached fallback records:', err.message)
      setApiError(`Could not reach backend API at ${API_BASE_URL} (${err.message}). Showing local fallback data.`)
      setCases(initialCases)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncidents()
  }, [])

  // Comprehensive Reset View function
  function handleResetView() {
    setSearch('')
    setStatusFilter('All statuses')
    setCategoryFilter('All categories')
    setPriorityFilter('All priorities')
    setAreaFilter('All areas')
    setPeriod('This year')
    setCurrentPage(1)
    setSelectedCase(null)
    notify('Dashboard filters reset to initial values')
  }

  // Filtered cases for search, category, status, priority, and area
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const query = search.trim().toLowerCase()
      const matchesSearch =
        !query ||
        `${c.id} ${c.type} ${c.category} ${c.area} ${c.address || ''} ${c.officer || ''} ${c.description || ''} ${c.status} ${c.level}`
          .toLowerCase()
          .includes(query)
      const matchesStatus = statusFilter === 'All statuses' || c.status === statusFilter
      const matchesCategory = categoryFilter === 'All categories' || c.category === categoryFilter
      const matchesPriority = priorityFilter === 'All priorities' || c.level === priorityFilter
      const matchesArea = areaFilter === 'All areas' || c.area === areaFilter
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesArea
    })
  }, [cases, search, statusFilter, categoryFilter, priorityFilter, areaFilter])

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredCases.length / itemsPerPage))
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredCases.slice(start, start + itemsPerPage)
  }, [filteredCases, currentPage, itemsPerPage])

  // Quick summary counts
  const highPriorityCount = useMemo(() => cases.filter(c => c.level === 'High').length, [cases])
  const underReviewCount = useMemo(() => cases.filter(c => c.status === 'Under review').length, [cases])
  const resolvedCount = useMemo(() => cases.filter(c => c.status === 'Resolved').length, [cases])
  const investigatingCount = useMemo(() => cases.filter(c => c.status === 'Investigating').length, [cases])

  // Export CSV functionality
  function exportCases() {
    const rows = [
      ['Case ID', 'Crime Type', 'Category', 'District Area', 'Address', 'Date', 'Time', 'Status', 'Priority', 'Officer'],
      ...filteredCases.map(c => [c.id, c.type, c.category, c.area, c.address || '', c.date, c.time, c.status, c.level, c.officer || ''])
    ]
    const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `crimewatch-report-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    notify(`Exported ${filteredCases.length} incidents to CSV`)
  }

  // Status changer inside incident modal (PATCH /api/incidents/{id}/status)
  async function handleUpdateStatus(caseId, nextStatus) {
    // Optimistic local state update
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: nextStatus } : c))
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => ({ ...prev, status: nextStatus }))
    }

    try {
      const res = await fetch(`${API_BASE_URL}/${encodeURIComponent(caseId)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      if (res.ok) {
        const updated = await res.json()
        setCases(prev => prev.map(c => c.id === caseId ? { ...c, ...updated } : c))
        if (selectedCase && selectedCase.id === caseId) {
          setSelectedCase(prev => ({ ...prev, ...updated }))
        }
        notify(`Incident ${caseId} status updated to ${nextStatus} on backend`)
      } else {
        notify(`Status updated locally (backend returned HTTP ${res.status})`)
      }
    } catch (err) {
      notify(`Status updated locally (backend offline: ${err.message})`)
    }
  }

  
  async function handleDeleteIncident(caseId) {
    if (deletingId) return

    const confirmed = window.confirm(
      `Are you sure you want to delete incident ${caseId}? This cannot be undone.`
    )

    if (!confirmed) return

    setDeletingId(caseId)

    try {
      const res = await fetch(
        `${API_BASE_URL}/${encodeURIComponent(caseId)}`,
        { method: 'DELETE' }
      )

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      setCases(prev => prev.filter(c => c.id !== caseId))

      if (selectedCase?.id === caseId) {
        setSelectedCase(null)
      }

      notify(`Incident ${caseId} deleted successfully`)
    } catch (err) {
      notify(`Could not delete ${caseId}: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }


  // Create new incident (POST /api/incidents)
  async function handleAddIncident(e) {
    e.preventDefault()
    if (!newCaseAddress.trim() || !newCaseDesc.trim()) {
      notify('Please fill in both the location address and incident details')
      return
    }
    const newId = `CR-${2482 + cases.length}`
    const now = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateStr = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')}, ${now.getFullYear()}`
    const hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const timeStr = `${String(formattedHours).padStart(2, '0')}:${minutes} ${ampm}`

    const newIncident = {
      id: newId,
      type: newCaseType,
      category: newCaseCategory,
      area: newCaseArea,
      address: newCaseAddress,
      date: dateStr,
      time: timeStr,
      status: 'Under review',
      level: newCasePriority,
      officer: 'Dispatch Duty Desk',
      description: newCaseDesc,
      evidence: 'Initial citizen/patrol dispatch call recorded.'
    }

    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncident)
      })
      if (res.ok) {
        const saved = await res.json()
        setCases(prev => [saved, ...prev])
        notify(`Logged and saved incident: ${saved.id}`)
      } else {
        setCases(prev => [newIncident, ...prev])
        notify(`Logged locally (backend returned HTTP ${res.status})`)
      }
    } catch (err) {
      setCases(prev => [newIncident, ...prev])
      notify(`Logged locally: ${newId} (backend offline)`)
    }

    setShowAddModal(false)
    setNewCaseAddress('')
    setNewCaseDesc('')
  }

  // Submit community tip (POST /api/tips)
  async function handleSubmitTip(e) {
    e.preventDefault()
    const trimmedDesc = tipDesc.trim()
    if (!trimmedDesc) {
      notify('Please provide tip observations before submitting')
      return
    }

    if (submittingTip) return
    setSubmittingTip(true)

    try {
      const res = await fetch(TIPS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          area: tipArea,
          category: tipCategory,
          observations: trimmedDesc
        })
      })

      if (res.ok) {
        const saved = await res.json()
        notify(`Anonymous tip (${saved.id || 'Logged'}) for ${saved.area || tipArea} submitted successfully`)
        setTipDesc('')
      } else {
        const errorBody = await res.json().catch(() => null)
        let errorMsg = `Server error (HTTP ${res.status})`
        if (errorBody && errorBody.validationErrors) {
          errorMsg = Object.values(errorBody.validationErrors).join('; ')
        } else if (errorBody && errorBody.message) {
          errorMsg = errorBody.message
        }
        notify(`Tip submission failed: ${errorMsg}`)
      }
    } catch (err) {
      notify(`Connection error: Could not reach backend API at ${TIPS_API_URL}`)
    } finally {
      setSubmittingTip(false)
    }
  }

  // Render view router
  function renderView() {
    switch (activeNav) {
      case 'Crime Reports':
        return renderCrimeReportsView()
      case 'Hotspot Analysis':
        return renderHotspotView()
      case 'Trends & Insights':
        return renderTrendsView()
      case 'Community':
        return renderCommunityView()
      case 'Overview':
      default:
        return renderOverviewView()
    }
  }

  // 1. Overview View
  function renderOverviewView() {
    return (
      <>
        {apiError && (
          <section className="notice-bar" style={{ borderColor: '#f0445255', background: 'linear-gradient(90deg, rgba(240,68,82,0.18), rgba(21,25,40,0.8))', marginBottom: 16 }}>
            <div className="notice-symbol" style={{ color: '#ff6672', background: 'rgba(240,68,82,0.2)' }}>
              <AlertTriangle size={16}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <strong style={{ color: '#ff8a93' }}>Backend Connection Notice: </strong>
                <span>{apiError}</span>
              </div>
              <button className="button secondary compact" style={{ marginLeft: 16 }} onClick={fetchIncidents}>
                <RefreshCw size={13}/> Retry Connection
              </button>
            </div>
          </section>
        )}

        <section className="notice-bar">
          <div className="notice-symbol"><Activity size={16}/></div>
          <div>
            <strong>Operational overview</strong>
            <span>Active monitoring mode. Verified intelligence active across all 5 municipal sectors.</span>
          </div>
          <button onClick={() => notify('CrimeWatch prototype with dynamic multi-view analytics.')} aria-label="More information">
            <CircleHelp size={17}/>
          </button>
        </section>

        <section className="stats-grid">
          <StatCard icon={FileText} label="Total reported incidents" value="6,284" delta="8.2%" positive={false} accent="red" note="vs. previous period"/>
          <StatCard icon={Shield} label="Cases resolved" value="4,812" delta="12.6%" positive accent="green" note="vs. previous period"/>
          <StatCard icon={Activity} label="Active investigations" value="1,072" delta="4.3%" positive={false} accent="amber" note="vs. previous period"/>
          <StatCard icon={AlertTriangle} label="High-priority cases" value={`${highPriorityCount}`} delta="2.1%" positive={false} accent="violet" note="vs. previous period"/>
        </section>

        <section className="charts-grid">
          <article className="panel trend-panel">
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">INCIDENT MONITORING</div>
                <h2>Crime trends</h2>
                <p>Reported incidents vs. cases resolved ({period})</p>
              </div>
              <div className="panel-actions">
                <select value={period} onChange={e => { setPeriod(e.target.value); notify(`Displaying trends for ${e.target.value}`); }} aria-label="Chart period">
                  <option>This year</option>
                  <option>Last 6 months</option>
                  <option>Last 30 days</option>
                </select>
                <button className="icon-button" onClick={() => notify(`Period filtered to: ${period}`)} aria-label="Chart information">
                  <MoreHorizontal size={18}/>
                </button>
              </div>
            </div>
            <div className="chart-legend">
              <span><i className="legend-dot red-dot"/> Reported</span>
              <span><i className="legend-dot muted-dot"/> Resolved</span>
            </div>
            <div className="trend-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={period === 'Last 6 months' ? trendData.slice(6) : period === 'Last 30 days' ? trendData.slice(10) : trendData}
                  margin={{ top: 8, right: 6, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="reportedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f04452" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f04452" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8290a8" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#8290a8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#252d40" strokeDasharray="3 5" vertical={false}/>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }} dy={9}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <Tooltip contentStyle={{ background: '#11192b', border: '1px solid #2b354a', borderRadius: 10, color: '#eef2fa', fontSize: 12 }}/>
                  <Area type="monotone" dataKey="reported" name="Reported" stroke="#f04452" strokeWidth={2.5} fill="url(#reportedFill)" activeDot={{ r: 4, strokeWidth: 0 }}/>
                  <Area type="monotone" dataKey="solved" name="Resolved" stroke="#8290a8" strokeWidth={2} fill="url(#resolvedFill)" activeDot={{ r: 4, strokeWidth: 0 }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-footer">
              <span><span className="footer-pulse"/> Trend updates with selected filter ({period})</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveNav('Trends & Insights')}>Deep dive into trends <ArrowUpRight size={13}/></span>
            </div>
          </article>

          <article className="panel category-panel">
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">CASE BREAKDOWN</div>
                <h2>Crime categories</h2>
                <p>Share of recorded incident types</p>
              </div>
              <button className="icon-button" onClick={() => notify('Crime categories aggregate all recorded incident classifications')} aria-label="Category chart information">
                <MoreHorizontal size={18}/>
              </button>
            </div>
            <div className="donut-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="67%" outerRadius="88%" paddingAngle={4} stroke="none">
                    {categoryData.map(item => <Cell key={item.name} fill={item.color}/>)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#11192b', border: '1px solid #2b354a', borderRadius: 10, color: '#eef2fa', fontSize: 12 }} formatter={value => [`${value}%`, 'Share']}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <strong>100<span>%</span></strong>
                <small>CASES</small>
              </div>
            </div>
            <div className="category-legend">
              {categoryData.map(item => (
                <div className="category-row" key={item.name}>
                  <span className="category-name"><i style={{ background: item.color }}/>{item.name}</span>
                  <strong>{item.value}%</strong>
                  <div className="category-track"><span style={{ width: `${item.value}%`, background: item.color }}/></div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Recent Overview Preview */}
        <section className="panel reports-panel">
          <div className="reports-heading">
            <div>
              <div className="panel-kicker">LATEST ACTIVITY</div>
              <h2>Recent crime reports</h2>
              <p>Quick preview of recent incident filings. Click any eye icon to view complete dossier.</p>
            </div>
            <button className="button secondary compact" onClick={() => setActiveNav('Crime Reports')}>
              Open full Incident Directory <ArrowUpRight size={15}/>
            </button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <Search size={16}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search case ID, type, area..." aria-label="Search crime reports"/>
              {search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14}/></button>}
            </div>
            <button className={`filter-button ${showFilters ? 'selected' : ''}`} onClick={() => setShowFilters(v => !v)}>
              <Filter size={15}/> Filters <ChevronDown size={14}/>
            </button>
            <span className="result-count">{filteredCases.length} records found</span>
          </div>

          {showFilters && (
            <div className="filter-row">
              <label htmlFor="overviewStatusFilter">Case status</label>
              <select id="overviewStatusFilter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option>All statuses</option>
                <option>Under review</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
              <label htmlFor="overviewCategoryFilter" style={{ marginLeft: 12 }}>Category</label>
              <select id="overviewCategoryFilter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option>All categories</option>
                <option>Theft</option>
                <option>Assault</option>
                <option>Burglary</option>
                <option>Fraud</option>
                <option>Other</option>
              </select>
              <button className="clear-filter" onClick={() => { setStatusFilter('All statuses'); setCategoryFilter('All categories'); setSearch(''); }}>
                Clear filters
              </button>
            </div>
          )}

          <div className="table-scroll">
            {loading && cases.length === 0 ? (
              <div className="empty-state">
                <Activity size={18} style={{ display: 'inline', verticalAlign: -3, marginRight: 8, color: '#f04452' }}/>
                Connecting to backend API at {API_BASE_URL}...
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>CASE ID</th>
                    <th>CRIME TYPE</th>
                    <th>LOCATION</th>
                    <th>DATE & TIME</th>
                    <th>STATUS</th>
                    <th>PRIORITY</th>
                    <th>DOSSIER</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.slice(0, 5).map(c => (
                    <tr key={c.id}>
                      <td><span className="case-id">{c.id}</span></td>
                      <td><span className="crime-type"><span className="crime-type-dot"/> {c.type}</span></td>
                      <td><span className="location-cell"><MapPin size={13}/>{c.area}</span></td>
                      <td><span className="date-cell">{c.date}</span><span className="time-cell">{c.time}</span></td>
                      <td><span className={`status status-${c.status.toLowerCase().replaceAll(' ', '-')}`}><i/>{c.status}</span></td>
                      <td><span className={`priority priority-${c.level.toLowerCase()}`}>{c.level}</span></td>
                      
                      <td>
                        <button className="row-action" onClick={() => setSelectedCase(c)} aria-label={`View dossier for ${c.id}`} title="View incident details">
                          <Eye size={16}/>
                        </button>
                        <button
                          className="row-action delete-action"
                          onClick={() => handleDeleteIncident(c.id)}
                          aria-label={`Delete incident ${c.id}`}
                          title="Delete incident"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && filteredCases.length === 0 && <div className="empty-state">No reports match your filters. Try clicking "Reset view".</div>}
          </div>

          <div className="table-footer">
            <span>Showing preview of <strong>{Math.min(5, filteredCases.length)}</strong> of <strong>{filteredCases.length}</strong> incidents</span>
            <button className="button secondary compact" onClick={() => setActiveNav('Crime Reports')}>
              View all {cases.length} in Directory <ArrowUpRight size={13}/>
            </button>
          </div>
        </section>
      </>
    )
  }

  // 2. Crime Reports View
  function renderCrimeReportsView() {
    return (
      <section>
        {apiError && (
          <div className="notice-bar" style={{ borderColor: '#f0445255', background: 'linear-gradient(90deg, rgba(240,68,82,0.18), rgba(21,25,40,0.8))', marginBottom: 16 }}>
            <div className="notice-symbol" style={{ color: '#ff6672', background: 'rgba(240,68,82,0.2)' }}>
              <AlertTriangle size={16}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <strong style={{ color: '#ff8a93' }}>Backend Connection Notice: </strong>
                <span>{apiError}</span>
              </div>
              <button className="button secondary compact" style={{ marginLeft: 16 }} onClick={fetchIncidents}>
                <RefreshCw size={13}/> Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* KPI Strip */}
        <div className="reports-kpis">
          <div className="kpi-card">
            <div className="kpi-card-label">Matching Incidents</div>
            <div className="kpi-card-val">{filteredCases.length}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-card-label">High Priority</div>
            <div className="kpi-card-val" style={{ color: '#ff6672' }}>{filteredCases.filter(c => c.level === 'High').length}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-card-label">Under Investigation</div>
            <div className="kpi-card-val" style={{ color: '#8eacff' }}>{filteredCases.filter(c => c.status === 'Investigating').length}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-card-label">Cases Resolved</div>
            <div className="kpi-card-val" style={{ color: '#38c995' }}>{filteredCases.filter(c => c.status === 'Resolved').length}</div>
          </div>
        </div>

        <div className="panel reports-panel" style={{ paddingBottom: 20 }}>
          <div className="reports-heading">
            <div>
              <div className="panel-kicker">INCIDENT LOG DIRECTORY</div>
              <h2>Crime Reports & Incident Management</h2>
              <p>Filter, search, inspect dossiers, and log official crime reports across sectors.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="button secondary compact" onClick={fetchIncidents} title="Sync from Spring Boot backend">
                <RefreshCw size={14}/> Sync API
              </button>
              <button className="button secondary compact" onClick={exportCases}>
                <Download size={15}/> Export CSV
              </button>
              <button className="button primary compact" onClick={() => setShowAddModal(true)}>
                <Plus size={15}/> Log Incident
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="table-toolbar" style={{ marginTop: 14 }}>
            <div className="search-box" style={{ width: 'min(420px, 100%)' }}>
              <Search size={16}/>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by case ID, keyword, officer, address..."
                aria-label="Search incident records"
              />
              {search && <button onClick={() => { setSearch(''); setCurrentPage(1); }} aria-label="Clear search"><X size={14}/></button>}
            </div>
            <span className="result-count">{filteredCases.length} incidents found</span>
          </div>

          {/* Expanded multi-parameter filter row */}
          <div className="filter-bar-expanded">
            <div className="filter-control">
              <label htmlFor="categorySelect">Category:</label>
              <select
                id="categorySelect"
                value={categoryFilter}
                onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              >
                <option>All categories</option>
                <option>Theft</option>
                <option>Assault</option>
                <option>Burglary</option>
                <option>Fraud</option>
                <option>Other</option>
              </select>
            </div>

            <div className="filter-control">
              <label htmlFor="statusSelect">Status:</label>
              <select
                id="statusSelect"
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option>All statuses</option>
                <option>Under review</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="filter-control">
              <label htmlFor="prioritySelect">Priority:</label>
              <select
                id="prioritySelect"
                value={priorityFilter}
                onChange={e => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
              >
                <option>All priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="filter-control">
              <label htmlFor="areaSelect">District:</label>
              <select
                id="areaSelect"
                value={areaFilter}
                onChange={e => { setAreaFilter(e.target.value); setCurrentPage(1); }}
              >
                <option>All areas</option>
                <option>Central District</option>
                <option>East Borough</option>
                <option>North Quarter</option>
                <option>South Industrial</option>
                <option>West End</option>
              </select>
            </div>

            <button
              className="button secondary compact"
              style={{ marginLeft: 'auto', fontSize: 10, padding: '6px 10px' }}
              onClick={() => {
                setSearch('')
                setStatusFilter('All statuses')
                setCategoryFilter('All categories')
                setPriorityFilter('All priorities')
                setAreaFilter('All areas')
                setCurrentPage(1)
                notify('Directory filters cleared')
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* Table */}
          <div className="table-scroll">
            {loading && cases.length === 0 ? (
              <div className="empty-state">
                <Activity size={18} style={{ display: 'inline', verticalAlign: -3, marginRight: 8, color: '#f04452' }}/>
                Loading incident directory from Spring Boot backend...
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>CASE ID</th>
                    <th>CRIME TYPE</th>
                    <th>CATEGORY</th>
                    <th>DISTRICT & ADDRESS</th>
                    <th>DATE & TIME</th>
                    <th>STATUS</th>
                    <th>PRIORITY</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCases.map(c => (
                    <tr key={c.id}>
                      <td><span className="case-id">{c.id}</span></td>
                      <td><span className="crime-type"><span className="crime-type-dot"/> {c.type}</span></td>
                      <td><span style={{ fontSize: 11, color: '#9db0cb' }}>{c.category}</span></td>
                      <td>
                        <span className="location-cell"><MapPin size={13}/><strong>{c.area}</strong></span>
                        <span style={{ display: 'block', fontSize: 9, color: '#7a889f', marginTop: 2, paddingLeft: 18 }}>{c.address}</span>
                      </td>
                      <td>
                        <span className="date-cell">{c.date}</span>
                        <span className="time-cell">{c.time}</span>
                      </td>
                      <td><span className={`status status-${c.status.toLowerCase().replaceAll(' ', '-')}`}><i/>{c.status}</span></td>
                      <td><span className={`priority priority-${c.level.toLowerCase()}`}>{c.level}</span></td>
                      <td>
                        <button className="row-action" onClick={() => setSelectedCase(c)} aria-label={`View dossier for ${c.id}`}>
                          <Eye size={16}/>
                        </button>
                        <button
                                                  className="row-action delete-action"
                                                  onClick={() => handleDeleteIncident(c.id)}
                                                  aria-label={`Delete incident ${c.id}`}
                                                  title="Delete incident"
                                                >
                                                  <Trash2 size={16}/>
                                                </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && filteredCases.length === 0 && (
              <div className="empty-state">
                No incidents found matching these criteria.
                <div style={{ marginTop: 10 }}>
                  <button className="button secondary compact" onClick={handleResetView}>Reset All Filters</button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="table-footer">
            <span>
              Showing <strong>{filteredCases.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filteredCases.length)}</strong> of <strong>{filteredCases.length}</strong> reports
            </span>
            <div className="pagination">
              <button disabled={currentPage <= 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                <ChevronLeft size={13}/> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'page-number' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                Next <ChevronRight size={13}/>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 3. Hotspot Analysis View
  function renderHotspotView() {
    return (
      <section>
        {/* District Risk Cards */}
        <div className="hotspot-cards-grid">
          {districtData.map(d => (
            <div key={d.district} className={`hotspot-card risk-${d.risk === 'High' ? 'high' : d.risk === 'Medium' ? 'med' : 'low'}`}>
              <div className="hotspot-card-top">
                <span className="hotspot-district">{d.district}</span>
                <span className={`risk-tag ${d.risk.toLowerCase()}`}>{d.risk} Risk</span>
              </div>
              <div className="hotspot-metric">{d.reported} <span style={{ fontSize: 13, color: '#7e8c9f', fontWeight: 500 }}>cases</span></div>
              <div className="hotspot-footer">
                <span>Resolved: {d.resolved}</span>
                <span style={{ color: d.trend.startsWith('+') ? '#ff6672' : '#38c995', fontWeight: 600 }}>{d.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Hotspot Comparison Chart & Zones */}
        <div className="hotspot-detail-grid">
          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">SECTOR INCIDENT DENSITY</div>
                <h2>District Comparison: Reported vs. Resolved</h2>
                <p>Cross-district incident distribution and resolution efficacy.</p>
              </div>
            </div>
            <div style={{ height: 260, width: '100%', marginTop: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} margin={{ top: 12, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid stroke="#232d40" strokeDasharray="3 5" vertical={false}/>
                  <XAxis dataKey="code" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <Tooltip contentStyle={{ background: '#11192b', border: '1px solid #2b354a', borderRadius: 8, color: '#eef2fa', fontSize: 12 }}/>
                  <Bar dataKey="reported" name="Reported Incidents" fill="#f04452" radius={[4, 4, 0, 0]}/>
                  <Bar dataKey="resolved" name="Resolved Cases" fill="#38c995" radius={[4, 4, 0, 0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-footer">
              <span><span className="footer-pulse"/> High risk correlation in Central & East zones</span>
              <span>Updated continuous feed</span>
            </div>
          </article>

          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">TACTICAL SURVEILLANCE</div>
                <h2>High-Frequency Zones</h2>
                <p>Concentrated incident clusters and peak time frames.</p>
              </div>
            </div>
            <div className="zone-list">
              <div className="zone-item">
                <div className="zone-info">
                  <strong>Central Commercial Strip</strong>
                  <span>Peak Hours: 11:00 PM – 04:00 AM • Forced entry / Burglary</span>
                </div>
                <span className="zone-badge">Reinforced</span>
              </div>
              <div className="zone-item">
                <div className="zone-info">
                  <strong>East Entertainment Corridor</strong>
                  <span>Peak Hours: 10:00 PM – 03:00 AM • Assault / Disorderly</span>
                </div>
                <span className="zone-badge">Mobile Patrol</span>
              </div>
              <div className="zone-item">
                <div className="zone-info">
                  <strong>North Tech / Campus Perimeter</strong>
                  <span>Peak Hours: 12:00 PM – 06:00 PM • Bike & Vehicle theft</span>
                </div>
                <span className="zone-badge" style={{ color: '#f6bd60', background: 'rgba(246,189,96,0.12)' }}>Monitored</span>
              </div>
              <div className="zone-item">
                <div className="zone-info">
                  <strong>South Freight Transit Yards</strong>
                  <span>Peak Hours: 01:00 AM – 05:00 AM • Logistics trespass</span>
                </div>
                <span className="zone-badge" style={{ color: '#38c995', background: 'rgba(56,201,149,0.12)' }}>Stable</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    )
  }

  // 4. Trends & Insights View
  function renderTrendsView() {
    return (
      <section>
        {/* Tactical Takeaway Cards */}
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-icon-box green"><TrendingUp size={18}/></div>
              <div>
                <h4>Clearance Efficiency Surge</h4>
                <span className="insight-tag">METRIC IMPROVEMENT</span>
              </div>
            </div>
            <p>Overall case clearance reached <strong>76.6%</strong> this quarter, driven by rapid forensic imaging and transit CCTV deployment.</p>
            <div style={{ fontSize: 11, color: '#38c995', fontWeight: 600 }}>+4.2% clearance gain year-over-year</div>
          </div>

          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-icon-box"><AlertCircle size={18}/></div>
              <div>
                <h4>Weekend Incident Density</h4>
                <span className="insight-tag">PATTERN ALERT</span>
              </div>
            </div>
            <p>Friday and Saturday account for <strong>41.3%</strong> of total weekly incident calls, heavily centered in the East Entertainment Quarter.</p>
            <div style={{ fontSize: 11, color: '#f04452', fontWeight: 600 }}>Recommend staggered weekend shift scheduling</div>
          </div>

          <div className="insight-card">
            <div className="insight-card-header">
              <div className="insight-icon-box blue"><Clock3 size={18}/></div>
              <div>
                <h4>Response Turnaround</h4>
                <span className="insight-tag">DISPATCH SPEED</span>
              </div>
            </div>
            <p>Emergency dispatch arrival dropped to an average of <strong>6.8 minutes</strong> across all Priority 1 and High-level distress reports.</p>
            <div style={{ fontSize: 11, color: '#7c83fd', fontWeight: 600 }}>-1.4 minutes faster than municipal target</div>
          </div>
        </div>

        {/* Longitudinal Clearance Trend & Day of Week Charts */}
        <div className="charts-grid">
          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">MONTHLY RESOLUTION RATE</div>
                <h2>Case Clearance Trend (%)</h2>
                <p>Percentage of reported cases closed per month.</p>
              </div>
            </div>
            <div style={{ height: 230, width: '100%', marginTop: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clearanceRateData} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38c995" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#38c995" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#232d40" strokeDasharray="3 5" vertical={false}/>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <YAxis domain={[50, 90]} axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <Tooltip contentStyle={{ background: '#11192b', border: '1px solid #2b354a', borderRadius: 8, color: '#eef2fa', fontSize: 12 }} formatter={val => [`${val}%`, 'Clearance Rate']}/>
                  <Area type="monotone" dataKey="rate" stroke="#38c995" strokeWidth={2.5} fill="url(#rateFill)" activeDot={{ r: 4 }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-footer">
              <span><span className="footer-pulse" style={{ background: '#38c995' }}/> Peak clearance achieved in October (76%)</span>
              <span>Annual Benchmark: 70%</span>
            </div>
          </article>

          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading">
              <div>
                <div className="panel-kicker">WEEKDAY ANALYSIS</div>
                <h2>Weekly Incident Distribution</h2>
                <p>Daily volume of calls and logged offenses.</p>
              </div>
            </div>
            <div style={{ height: 230, width: '100%', marginTop: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#232d40" strokeDasharray="3 5" vertical={false}/>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8ba2', fontSize: 11 }}/>
                  <Tooltip contentStyle={{ background: '#11192b', border: '1px solid #2b354a', borderRadius: 8, color: '#eef2fa', fontSize: 12 }}/>
                  <Bar dataKey="incidents" name="Incidents" radius={[4, 4, 0, 0]}>
                    {dayOfWeekData.map(entry => (
                      <Cell key={entry.day} fill={entry.day === 'Fri' || entry.day === 'Sat' ? '#f04452' : '#2b3954'}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-footer">
              <span>Saturday peaks at 44 incidents</span>
              <span>Weekend surge: +48%</span>
            </div>
          </article>
        </div>
      </section>
    )
  }

  // 5. Community View
  function renderCommunityView() {
    return (
      <section>
        <div className="community-grid">
          {/* Active Advisories and Alerts */}
          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading" style={{ marginBottom: 16 }}>
              <div>
                <div className="panel-kicker">PUBLIC SAFETY NOTICES</div>
                <h2>Community Advisories & Watch Alerts</h2>
                <p>Real-time citizen advisories, safety alerts, and community reports.</p>
              </div>
              <button className="button secondary compact" onClick={() => notify('Public bulletins broadcast through municipal siren & SMS network')}>
                <Radio size={14}/> Broadcast
              </button>
            </div>

            <div>
              {communityAdvisories.map(a => (
                <div key={a.id} className="advisory-item">
                  <div className={`advisory-icon ${a.type}`}>
                    {a.type === 'alert' ? <AlertTriangle size={18}/> : a.type === 'info' ? <Info size={18}/> : <CheckCircle2 size={18}/>}
                  </div>
                  <div className="advisory-content">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <h4>{a.title}</h4>
                      <span className={`risk-tag ${a.type === 'alert' ? 'high' : a.type === 'info' ? 'medium' : 'low'}`}>{a.badge}</span>
                    </div>
                    <p>{a.desc}</p>
                    <div className="advisory-meta">
                      <span><MapPin size={11} style={{ display: 'inline', verticalAlign: -1 }}/> {a.area}</span>
                      <span><Clock3 size={11} style={{ display: 'inline', verticalAlign: -1 }}/> {a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Anonymous Tip Submission Form */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #232c3f' }}>
              <div className="panel-kicker">CITIZEN COLLABORATION</div>
              <h3 style={{ font: '600 15px "Space Grotesk"', margin: '0 0 6px', color: '#edf2fa' }}>Submit Anonymous Safety Tip</h3>
              <p style={{ fontSize: 11, color: '#8b97ac', margin: '0 0 14px' }}>Community inputs are logged into the local demonstration database for academic review.</p>
              <form onSubmit={handleSubmitTip}>
                <div className="form-grid" style={{ marginBottom: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Sector / District</label>
                    <select className="form-select" value={tipArea} onChange={e => setTipArea(e.target.value)} disabled={submittingTip}>
                      <option>Central District</option>
                      <option>East Borough</option>
                      <option>North Quarter</option>
                      <option>South Industrial</option>
                      <option>West End</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Concern Category</label>
                    <select className="form-select" value={tipCategory} onChange={e => setTipCategory(e.target.value)} disabled={submittingTip}>
                      <option>Suspicious Activity</option>
                      <option>Vandalism / Property</option>
                      <option>Vehicle Concern</option>
                      <option>Lighting & Hazard</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Tip Observations</label>
                    <textarea
                      className="form-textarea"
                      value={tipDesc}
                      onChange={e => setTipDesc(e.target.value)}
                      placeholder="Describe location details, vehicle plates, or observed behavior..."
                      disabled={submittingTip}
                    />
                  </div>
                </div>
                <button type="submit" className="button primary compact" disabled={submittingTip}>
                  <Send size={14}/> {submittingTip ? 'Submitting Tip...' : 'Submit Tip'}
                </button>
              </form>
            </div>
          </article>

          {/* Sector Safety Scorecard */}
          <article className="panel" style={{ padding: 20 }}>
            <div className="panel-heading" style={{ marginBottom: 16 }}>
              <div>
                <div className="panel-kicker">SECTOR SECURITY RATING</div>
                <h2>Neighborhood Safety Index</h2>
                <p>Calculated index based on incident frequency and resolution speed.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {safetyScores.map(s => (
                <div key={s.area} style={{ background: '#131b2a', border: '1px solid #232d3f', borderRadius: 8, padding: 12 }}>
                  <div className="safety-meter-wrap">
                    <strong style={{ fontSize: 12, color: '#eef2fa' }}>{s.area}</strong>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.score} / 100</span>
                  </div>
                  <div className="safety-bar">
                    <div className="safety-bar-fill" style={{ width: `${s.score}%`, background: s.color }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7a879d' }}>
                    <span>{s.status}</span>
                    <span>Confidence: 94%</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: 14, background: '#101725', border: '1px solid #202b3d', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Shield size={16} style={{ color: '#38c995' }}/>
                <strong style={{ fontSize: 11, color: '#eef2fa' }}>Community Policing Hotlines</strong>
              </div>
              <p style={{ fontSize: 11, color: '#8795ab', margin: 0 }}>
                Emergency: <span style={{ color: '#ff6672', fontWeight: 600 }}>911</span> • Non-emergency: <span style={{ color: '#c4d0e2' }}>311</span> • Crime Stoppers: <span style={{ color: '#c4d0e2' }}>1-800-222-TIPS</span>
              </p>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldAlert size={22}/></div>
          <div>
            <div className="brand-name">CRIME<span>WATCH</span></div>
            <div className="brand-caption">INTELLIGENCE PLATFORM</div>
          </div>
          <button className="close-nav icon-button" onClick={() => setMobileNav(false)}>
            <X size={18}/>
          </button>
        </div>

        <div className="workspace">
          <div className="workspace-dot"/>
          <div>
            <div className="workspace-title">City Operations</div>
            <div className="workspace-sub">Analytics workspace</div>
          </div>
          <ChevronDown size={15} className="workspace-chevron"/>
        </div>

        <div className="nav-heading">WORKSPACE</div>
        <nav className="main-nav">
          {nav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActiveNav(label)
                setMobileNav(false)
              }}
              className={`nav-link ${activeNav === label ? 'active' : ''}`}
            >
              <Icon size={18}/>
              <span>{label}</span>
              {label === 'Crime Reports' && <span className="nav-count">{cases.length}</span>}
            </button>
          ))}
        </nav>

        <div className="nav-heading tools-heading">TOOLS</div>
        <button className="nav-link" onClick={() => { setActiveNav('Hotspot Analysis'); notify('Navigated to Hotspot Sector Map analysis'); }}>
          <MapPin size={18}/>
          <span>Incident Map</span>
          <span className="soon" style={{ color: '#38c995' }}>ACTIVE</span>
        </button>
        <button className="nav-link" onClick={() => notify('User settings: Theme locked to Dark Navy, notifications enabled.')}>
          <Settings size={18}/>
          <span>Settings</span>
        </button>

        <div className="sidebar-bottom">
          <div className="secure-badge">
            <div className="secure-icon"><Shield size={17}/></div>
            <div>
              <strong>Secure workspace</strong>
              <span>Verified session</span>
            </div>
            <span className="secure-dot"/>
          </div>
          <div className="profile">
            <div className="avatar">AO</div>
            <div className="profile-info">
              <strong>Admin Officer</strong>
              <span>Analyst account</span>
            </div>
            <MoreHorizontal size={18} className="profile-more"/>
          </div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-overlay" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}

      <main className="main-content">
        {/* Top Header */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-button icon-button" onClick={() => setMobileNav(true)} aria-label="Open menu">
              <Menu size={20}/>
            </button>
            <div className="breadcrumb">
              Workspace <span>/</span> <strong>{activeNav}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="live-indicator">
              <span style={{ background: loading ? '#f6bd60' : apiError ? '#f04452' : '#38c995' }}/>
              {loading ? 'SYNCING API...' : apiError ? 'API OFFLINE' : 'API CONNECTED'}
            </div>
            <button className="icon-button notification-button" onClick={() => notify('3 new community watch tips logged in the last 24h')} aria-label="Notifications">
              <Bell size={18}/><i/>
            </button>
            <div className="top-avatar">AO</div>
          </div>
        </header>

        <div className="page-wrap">
          {/* Page Heading & Reset View Action */}
          <section className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line"/> CITY-WIDE INTELLIGENCE <span className="eyebrow-date"><Clock3 size={12}/> UPDATED JUST NOW</span>
              </div>
              <h1>Crime <span>{activeNav}</span></h1>
              <p className="page-subtitle">A clearer picture of incidents, patterns, and public safety.</p>
            </div>
            <div className="heading-actions">
              <button className="button secondary" onClick={handleResetView}>
                <SlidersHorizontal size={16}/> Reset view
              </button>
              <button className="button primary" onClick={exportCases}>
                <Download size={16}/> Export report
              </button>
            </div>
          </section>

          {/* Render Active Nav View */}
          {renderView()}

          <footer className="page-footer">
            <span>© 2026 CrimeWatch Analytics <span className="footer-separator">•</span> Intelligence Platform</span>
            <span><Shield size={12}/> Prototype · Not for operational use</span>
          </footer>
        </div>
      </main>

      {/* Incident Dossier Detail Modal */}
      {selectedCase && (
        <div className="modal-backdrop" onClick={() => setSelectedCase(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <FileText size={18} style={{ color: '#f04452' }}/>
                Incident Dossier: {selectedCase.id}
              </h3>
              <button className="icon-button" onClick={() => setSelectedCase(null)} aria-label="Close dossier">
                <X size={18}/>
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Crime Classification</div>
                  <div className="detail-val">{selectedCase.type} ({selectedCase.category})</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Assigned Status</div>
                  <span className={`status status-${selectedCase.status.toLowerCase().replaceAll(' ', '-')}`}>
                    <i/>{selectedCase.status}
                  </span>
                </div>
                <div className="detail-item">
                  <div className="detail-label"><MapPin size={12}/> Sector / Area</div>
                  <div className="detail-val">{selectedCase.area}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Priority Severity</div>
                  <span className={`priority priority-${selectedCase.level.toLowerCase()}`}>{selectedCase.level} Priority</span>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Reported Timestamp</div>
                  <div className="detail-val">{selectedCase.date} at {selectedCase.time}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Responding Officer</div>
                  <div className="detail-val">{selectedCase.officer || 'Patrol Unit On-Duty'}</div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Specific Location</h4>
                <p>{selectedCase.address || selectedCase.area}</p>
              </div>

              <div className="detail-section">
                <h4>Incident Narrative & Summary</h4>
                <p>{selectedCase.description || 'No initial field narrative logged for this incident.'}</p>
              </div>

              <div className="detail-section">
                <h4>Recovered Evidence & Investigation Progress</h4>
                <p>{selectedCase.evidence || 'Field investigation pending evidence submission.'}</p>
              </div>

              <div className="detail-section">
                <h4>Update Investigation Status</h4>
                <div className="status-pill-group" style={{ marginTop: 8 }}>
                  {['Under review', 'Investigating', 'Resolved'].map(st => (
                    <button
                      key={st}
                      className={`status-btn ${selectedCase.status === st ? 'active' : ''}`}
                      onClick={() => handleUpdateStatus(selectedCase.id, st)}
                    >
                      {selectedCase.status === st && <Check size={12} style={{ display: 'inline', marginRight: 4 }}/>}
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="button secondary compact" onClick={() => setSelectedCase(null)}>
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log New Incident Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Plus size={18} style={{ color: '#f04452' }}/>
                Log New Crime Incident
              </h3>
              <button className="icon-button" onClick={() => setShowAddModal(false)} aria-label="Close modal">
                <X size={18}/>
              </button>
            </div>

            <form onSubmit={handleAddIncident}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Crime Offense Type</label>
                    <input
                      className="form-input"
                      value={newCaseType}
                      onChange={e => setNewCaseType(e.target.value)}
                      placeholder="e.g. Commercial Burglary, Vehicle theft"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={newCaseCategory}
                      onChange={e => setNewCaseCategory(e.target.value)}
                    >
                      <option>Theft</option>
                      <option>Assault</option>
                      <option>Burglary</option>
                      <option>Fraud</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">District Sector</label>
                    <select
                      className="form-select"
                      value={newCaseArea}
                      onChange={e => setNewCaseArea(e.target.value)}
                    >
                      <option>Central District</option>
                      <option>East Borough</option>
                      <option>North Quarter</option>
                      <option>South Industrial</option>
                      <option>West End</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority Level</label>
                    <select
                      className="form-select"
                      value={newCasePriority}
                      onChange={e => setNewCasePriority(e.target.value)}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div className="form-group full">
                    <label className="form-label">Precise Address / Location</label>
                    <input
                      className="form-input"
                      value={newCaseAddress}
                      onChange={e => setNewCaseAddress(e.target.value)}
                      placeholder="e.g. 520 Harbor Blvd, Suite 101"
                      required
                    />
                  </div>

                  <div className="form-group full">
                    <label className="form-label">Incident Narrative Description</label>
                    <textarea
                      className="form-textarea"
                      value={newCaseDesc}
                      onChange={e => setNewCaseDesc(e.target.value)}
                      placeholder="Detailed observations, caller information, involved parties..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="button secondary compact" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button primary compact">
                  Save Incident Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast */}
      {toast && (
        <div className="toast">
          <span className="toast-check">✓</span>
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
