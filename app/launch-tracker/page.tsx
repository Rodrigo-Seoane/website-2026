'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Types
type Status = 'To Do' | 'In Progress' | 'Done'
type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
type Effort = 'XS' | 'S' | 'M' | 'L'
type Section =
  | 'Home'
  | 'Featured Work'
  | 'Cases Template'
  | 'Insights'
  | 'About Me'
  | 'Vibe Lab'
  | 'Lead Magnet'
  | 'Email Templates'
  | 'Testing & Deploy'

interface Task {
  id: string
  task: string
  section: Section
  details: string
  effort: Effort
  hours: number
  status: Status
  priority: Priority
  deadline: string
  schedule: string
}

// All 41 tasks from CSV — all start as To Do, we'll work through them one by one
const INITIAL_TASKS: Task[] = [
  { id: 'H-01', task: 'Hero Cover', section: 'Home', details: 'Update hero cover image/visual for homepage', effort: 'S', hours: 1, status: 'To Do', priority: 'High', deadline: '2026-02-17', schedule: 'Day 1' },
  { id: 'H-02', task: 'Hero Button Interactions', section: 'Home', details: 'Implement hover/click micro-interactions on hero CTA buttons', effort: 'S', hours: 1, status: 'To Do', priority: 'High', deadline: '2026-02-17', schedule: 'Day 1' },
  { id: 'H-03', task: 'Pitfalls Background Color', section: 'Home', details: 'Update background color for Pitfalls section', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Medium', deadline: '2026-02-18', schedule: 'Day 2' },
  { id: 'H-04', task: 'Pitfalls Blurbs Design', section: 'Home', details: 'Redesign blurb cards layout and content for Pitfalls section', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-02-18', schedule: 'Day 2' },
  { id: 'H-05', task: 'Pitfalls Icons Set', section: 'Home', details: 'Provide/create icons at 64px, 48px, 32px, 24px sizes for Pitfalls blurbs', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-02-19', schedule: 'Day 3' },
  { id: 'H-06', task: 'Competitive Advantage Image Banner', section: 'Home', details: 'Design and implement the competitive advantage image banner section', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-02-19', schedule: 'Day 3' },
  { id: 'H-07', task: 'Featured Work Case Icons', section: 'Home', details: 'Add/update icons for each featured case study card', effort: 'S', hours: 1, status: 'To Do', priority: 'Medium', deadline: '2026-02-20', schedule: 'Day 4' },
  { id: 'H-08', task: 'Featured Work Impact Values', section: 'Home', details: 'Provide and display impact metric values for each case study', effort: 'S', hours: 1.5, status: 'To Do', priority: 'High', deadline: '2026-02-20', schedule: 'Day 4' },
  { id: 'H-09', task: 'Pricing Background Colors', section: 'Home', details: 'Update background colors for pricing section cards/tiers', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Low', deadline: '2026-02-21', schedule: 'Day 5' },
  { id: 'H-10', task: 'Clients Logo Sizes', section: 'Home', details: 'Update client logo sizes for consistency and visual balance', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Low', deadline: '2026-02-21', schedule: 'Day 5' },
  { id: 'FW-01', task: 'Cases Grid Hero Background', section: 'Featured Work', details: 'Update background cover image/color for /work hero', effort: 'S', hours: 1, status: 'To Do', priority: 'High', deadline: '2026-02-21', schedule: 'Day 5' },
  { id: 'FW-02', task: 'Remove Grid Layout', section: 'Featured Work', details: 'Remove current grid layout from cases listing', effort: 'S', hours: 1, status: 'To Do', priority: 'High', deadline: '2026-02-22', schedule: 'Day 6' },
  { id: 'FW-03', task: 'Case Section Block Template', section: 'Featured Work', details: 'Design and implement new case section block template to replace grid cards', effort: 'L', hours: 3, status: 'To Do', priority: 'High', deadline: '2026-02-23', schedule: 'Day 6-7' },
  { id: 'CS-01', task: 'Redesign Case Hero', section: 'Cases Template', details: 'Redesign case study hero section — update content structure and layout', effort: 'L', hours: 3, status: 'To Do', priority: 'High', deadline: '2026-02-25', schedule: 'Day 8-9' },
  { id: 'CS-02', task: 'Case Hero Cover Image Ratio', section: 'Cases Template', details: 'Adapt cover image to match new size ratio for case hero', effort: 'S', hours: 1, status: 'To Do', priority: 'High', deadline: '2026-02-25', schedule: 'Day 9' },
  { id: 'CS-03', task: 'Meta Details Cards', section: 'Cases Template', details: 'Build details cards component (Role / Timeline / Tools)', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-02-26', schedule: 'Day 10' },
  { id: 'CS-04', task: 'Up Next Block Template', section: 'Cases Template', details: 'Design and build \'Next Case\' block template for case study footer', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-02-27', schedule: 'Day 11' },
  { id: 'IN-01', task: 'Insights Hero Background', section: 'Insights', details: 'Replace hero background color for Insights page', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Medium', deadline: '2026-02-27', schedule: 'Day 11' },
  { id: 'IN-02', task: 'Refine Article Cards', section: 'Insights', details: 'Polish article card design — typography, spacing, hover states', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-02-28', schedule: 'Day 12' },
  { id: 'IN-03', task: 'Add Article Filters', section: 'Insights', details: 'Implement category filter bar for articles grid', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-03-01', schedule: 'Day 13' },
  { id: 'IN-04', task: 'Bento Grid Layout', section: 'Insights', details: 'Implement bento grid layout for articles display', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-03-01', schedule: 'Day 13' },
  { id: 'AB-01', task: 'Profile Section Redesign', section: 'About Me', details: 'Redesign profile section to match new content and layout direction', effort: 'M', hours: 2, status: 'To Do', priority: 'Medium', deadline: '2026-03-02', schedule: 'Day 14' },
  { id: 'AB-02', task: 'Profile Image Sizes', section: 'About Me', details: 'Update profile image sizes for responsive display', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Low', deadline: '2026-03-02', schedule: 'Day 14' },
  { id: 'VL-01', task: 'Vibe Lab Hero Background', section: 'Vibe Lab', details: 'Update background color for Vibe Lab hero section', effort: 'XS', hours: 0.5, status: 'To Do', priority: 'Low', deadline: '2026-03-03', schedule: 'Day 15' },
  { id: 'VL-02', task: 'Review Case Card Template', section: 'Vibe Lab', details: 'Review and refine experiment case card template', effort: 'S', hours: 1, status: 'To Do', priority: 'Low', deadline: '2026-03-03', schedule: 'Day 15' },
  { id: 'VL-03', task: 'Redesign Message Block', section: 'Vibe Lab', details: 'Redesign \'Next Updates\' message block for Vibe Lab', effort: 'S', hours: 1.5, status: 'To Do', priority: 'Low', deadline: '2026-03-04', schedule: 'Day 16' },
  { id: 'LM-01', task: 'Lead Magnet Finish Dev', section: 'Lead Magnet', details: 'Complete remaining development for UX Pulse Check lead magnet', effort: 'L', hours: 4, status: 'To Do', priority: 'Critical', deadline: '2026-03-05', schedule: 'Day 16-17' },
  { id: 'LM-02', task: 'Lead Magnet Test Backend + Frontend', section: 'Lead Magnet', details: 'End-to-end testing of backend API and frontend flow', effort: 'M', hours: 2, status: 'To Do', priority: 'Critical', deadline: '2026-03-06', schedule: 'Day 18' },
  { id: 'LM-03', task: 'Lead Magnet QA', section: 'Lead Magnet', details: 'Full QA pass — edge cases, mobile, error states, email delivery', effort: 'S', hours: 1.5, status: 'To Do', priority: 'Critical', deadline: '2026-03-06', schedule: 'Day 18' },
  { id: 'EM-01', task: 'Email Sequence Content', section: 'Email Templates', details: 'Write content for all 5 emails in the UX Pulse Check nurture sequence', effort: 'L', hours: 4, status: 'To Do', priority: 'Critical', deadline: '2026-03-08', schedule: 'Day 19-20' },
  { id: 'EM-02', task: 'Email Template Design', section: 'Email Templates', details: 'Design responsive email template matching brand identity', effort: 'M', hours: 2, status: 'To Do', priority: 'Critical', deadline: '2026-03-09', schedule: 'Day 21' },
  { id: 'EM-03', task: 'Email Template Implementation', section: 'Email Templates', details: 'Code email templates in HTML — responsive, cross-client compatible', effort: 'M', hours: 3, status: 'To Do', priority: 'Critical', deadline: '2026-03-10', schedule: 'Day 22' },
  { id: 'EM-04', task: 'Email Templates QA', section: 'Email Templates', details: 'Test emails across clients (Gmail, Outlook, Apple Mail), verify automation triggers', effort: 'M', hours: 2, status: 'To Do', priority: 'Critical', deadline: '2026-03-11', schedule: 'Day 23' },
  { id: 'TD-01', task: 'Cross-Browser Testing', section: 'Testing & Deploy', details: 'Test on Chrome, Firefox, Safari, Edge (desktop + mobile)', effort: 'M', hours: 2, status: 'To Do', priority: 'Critical', deadline: '2026-03-12', schedule: 'Day 24' },
  { id: 'TD-02', task: 'Accessibility Audit', section: 'Testing & Deploy', details: 'Keyboard nav, focus states, alt text, heading hierarchy, ARIA, contrast', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-03-13', schedule: 'Day 25' },
  { id: 'TD-03', task: 'SEO Implementation', section: 'Testing & Deploy', details: 'Metadata, OG tags, structured data, sitemap, robots.txt for all pages', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-03-13', schedule: 'Day 25' },
  { id: 'TD-04', task: 'Analytics & Conversion Tracking', section: 'Testing & Deploy', details: 'GA4 events: job_inquiry, form_submission, call_booked, case_study_viewed, article_read', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-03-14', schedule: 'Day 26' },
  { id: 'TD-05', task: 'Performance Optimization', section: 'Testing & Deploy', details: 'Lighthouse ≥95, LCP <2.5s, CLS <0.1, bundle analysis, lazy loading', effort: 'M', hours: 2, status: 'To Do', priority: 'High', deadline: '2026-03-14', schedule: 'Day 26' },
  { id: 'TD-06', task: 'Vercel Deployment', section: 'Testing & Deploy', details: 'Deploy to Vercel, configure build settings, preview test', effort: 'S', hours: 1, status: 'To Do', priority: 'Critical', deadline: '2026-03-15', schedule: 'Day 27' },
  { id: 'TD-07', task: 'DNS Migration', section: 'Testing & Deploy', details: 'Migrate DNS from IONOS to Vercel, configure SSL, verify propagation', effort: 'S', hours: 1, status: 'To Do', priority: 'Critical', deadline: '2026-03-15', schedule: 'Day 27' },
  { id: 'TD-08', task: 'Launch Day Checklist', section: 'Testing & Deploy', details: 'Final verification: all links, forms, analytics, mobile, social cards, announce', effort: 'S', hours: 1.5, status: 'To Do', priority: 'Critical', deadline: '2026-03-16', schedule: 'Day 28' },
]

// Section color mapping
const SECTION_COLORS: Record<Section, string> = {
  'Home': 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
  'Featured Work': 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
  'Cases Template': 'bg-pink-500/10 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400 border-pink-500/20',
  'Insights': 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20',
  'About Me': 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
  'Vibe Lab': 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20',
  'Lead Magnet': 'bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20',
  'Email Templates': 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/20',
  'Testing & Deploy': 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20',
}

// Priority colors
const PRIORITY_COLORS: Record<Priority, string> = {
  'Critical': 'bg-red-500 text-white',
  'High': 'bg-orange-500 text-white',
  'Medium': 'bg-blue-500 text-white',
  'Low': 'bg-neutral-400 text-white dark:bg-neutral-600',
}

// Effort colors
const EFFORT_COLORS: Record<Effort, string> = {
  'XS': 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300',
  'S': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'M': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'L': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
}

export default function LaunchTrackerPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [selectedSection, setSelectedSection] = useState<Section | 'All'>('All')
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'All'>('All')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount — version check to detect data updates
  useEffect(() => {
    const STORAGE_VERSION = 'v3-reset'
    const savedVersion = localStorage.getItem('launch-tracker-version')
    if (savedVersion === STORAGE_VERSION) {
      const saved = localStorage.getItem('launch-tracker-tasks')
      if (saved) {
        try {
          setTasks(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse saved tasks', e)
        }
      }
    } else {
      // New version — reset to updated INITIAL_TASKS and clear old cache
      localStorage.setItem('launch-tracker-version', STORAGE_VERSION)
      localStorage.removeItem('launch-tracker-tasks')
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('launch-tracker-tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter(t => t.status === 'Done').length
    const inProgress = tasks.filter(t => t.status === 'In Progress').length
    const toDo = tasks.filter(t => t.status === 'To Do').length
    const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0)
    const remainingHours = tasks
      .filter(t => t.status !== 'Done')
      .reduce((sum, t) => sum + t.hours, 0)
    const progress = Math.round((done / total) * 100)

    // Days until launch (2026-03-16)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const launchDate = new Date('2026-03-16')
    const daysUntilLaunch = Math.ceil((launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return {
      total,
      done,
      inProgress,
      toDo,
      totalHours,
      remainingHours,
      progress,
      daysUntilLaunch,
    }
  }, [tasks])

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (selectedSection !== 'All' && task.section !== selectedSection) return false
      if (selectedPriority !== 'All' && task.priority !== selectedPriority) return false
      return true
    })
  }, [tasks, selectedSection, selectedPriority])

  // Group by status
  const tasksByStatus = useMemo(() => {
    return {
      'To Do': filteredTasks.filter(t => t.status === 'To Do'),
      'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
      'Done': filteredTasks.filter(t => t.status === 'Done'),
    }
  }, [filteredTasks])

  // Cycle task status
  const cycleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task

      const statusCycle: Record<Status, Status> = {
        'To Do': 'In Progress',
        'In Progress': 'Done',
        'Done': 'To Do',
      }

      return { ...task, status: statusCycle[task.status] }
    }))
  }

  // Reset all tasks to audit baseline
  const resetAllTasks = () => {
    if (confirm('Reset all tasks to audit baseline? This cannot be undone.')) {
      setTasks(INITIAL_TASKS)
      localStorage.removeItem('launch-tracker-tasks')
    }
  }

  // Get unique sections and priorities
  const sections: Section[] = Array.from(new Set(INITIAL_TASKS.map(t => t.section)))
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']

  return (
    <>
      {/* SEO: Hidden from search engines */}
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Launch Tracker - Internal</title>
      </head>

      <div className="min-h-screen bg-neutral-50 dark:bg-dark-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 font-display">
                  Launch Tracker
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Site 2026 Implementation Plan
                </p>
              </div>
              <button
                onClick={resetAllTasks}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300
                         bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border
                         rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {stats.progress}%
                </span>
              </div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-surface-primary to-accent-primary rounded-full"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
              <StatCard label="Total Tasks" value={stats.total} />
              <StatCard label="To Do" value={stats.toDo} color="text-blue-600 dark:text-blue-400" />
              <StatCard label="In Progress" value={stats.inProgress} color="text-orange-600 dark:text-accent-primary" />
              <StatCard label="Done" value={stats.done} color="text-green-600 dark:text-green-400" />
              <StatCard label="Total Hours" value={stats.totalHours} />
              <StatCard label="Hours Left" value={stats.remainingHours} color="text-red-600 dark:text-red-400" />
              <StatCard label="Days to Launch" value={stats.daysUntilLaunch} color="text-surface-primary dark:text-surface-primary" />
              <StatCard label="Launch Date" value="Mar 16" color="text-surface-primary dark:text-surface-primary" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Section Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Filter by Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value as Section | 'All')}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-surface border border-neutral-200
                           dark:border-dark-border rounded-lg text-neutral-900 dark:text-neutral-100
                           focus:outline-none focus:ring-2 focus:ring-surface-primary"
                >
                  <option value="All">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Filter by Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as Priority | 'All')}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-surface border border-neutral-200
                           dark:border-dark-border rounded-lg text-neutral-900 dark:text-neutral-100
                           focus:outline-none focus:ring-2 focus:ring-surface-primary"
                >
                  <option value="All">All Priorities</option>
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['To Do', 'In Progress', 'Done'] as const).map(status => (
              <Column
                key={status}
                status={status}
                tasks={tasksByStatus[status]}
                onTaskClick={cycleTaskStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Stat Card Component
function StatCard({
  label,
  value,
  color = 'text-neutral-900 dark:text-neutral-100'
}: {
  label: string
  value: string | number
  color?: string
}) {
  return (
    <div className="bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border
                    rounded-lg p-4">
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{label}</p>
      <p className={cn('text-2xl font-bold', color)}>{value}</p>
    </div>
  )
}

// Column Component
function Column({
  status,
  tasks,
  onTaskClick
}: {
  status: Status
  tasks: Task[]
  onTaskClick: (id: string) => void
}) {
  const statusColors = {
    'To Do': 'bg-blue-500',
    'In Progress': 'bg-orange-500',
    'Done': 'bg-green-500',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className={cn('w-3 h-3 rounded-full', statusColors[status])} />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 font-display">
            {status}
          </h2>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 400px)' }}>
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-neutral-400 dark:text-neutral-600 text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}

// Task Card Component
function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="w-full bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border
                 rounded-lg p-4 text-left hover:shadow-lg hover:border-surface-primary/50
                 transition-all duration-200 cursor-pointer group"
    >
      {/* Task ID & Priority */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          {task.id}
        </span>
        <div className={cn('w-2 h-2 rounded-full', PRIORITY_COLORS[task.priority])} />
      </div>

      {/* Task Name */}
      <h3 className="font-bold text-neutral-900 dark:text-neutral-50 mb-2 group-hover:text-surface-primary
                     transition-colors">
        {task.task}
      </h3>

      {/* Section Badge */}
      <div className="mb-3">
        <span className={cn(
          'inline-flex items-center px-2 py-1 rounded text-xs font-medium border',
          SECTION_COLORS[task.section]
        )}>
          {task.section}
        </span>
      </div>

      {/* Meta Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Priority:</span>
          <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', PRIORITY_COLORS[task.priority])}>
            {task.priority}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Effort:</span>
          <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', EFFORT_COLORS[task.effort])}>
            {task.effort}
          </span>
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
        <span>{task.hours}h</span>
        <span>{task.schedule}</span>
      </div>

      {/* Deadline */}
      <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Due: {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Details (truncated) */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2">
        {task.details}
      </p>
    </motion.button>
  )
}
