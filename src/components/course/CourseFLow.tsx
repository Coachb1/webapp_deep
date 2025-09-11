'use client'

import React, { useState, useEffect } from 'react'
import { Button, Div } from '../ui/moving-border'
import ModuleFlow from "./moduleFlow";

interface Section {
  id: string
  expanded: boolean
}

interface VideoSection {
  id: string
  expanded: boolean
}

export interface Module {
  id: number
  created: string
  updated: string
  deleted: boolean
  uid: string
  module_name: string
  CHAPTER_TYPE_CHOICES: string
  title: string
  description: string
  video_url: string | null
  embed_link: string | null
  test: any
  course: number
}

interface Course {
  id: number
  uid: string
  title: string
  sub_title: string
  client: string | null
  modules: Module[]
}

interface ApiResponse {
  course?: Course
  courses?: Course[]
}

const CommunicationCourse = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: 'section1', expanded: false },
    { id: 'section2', expanded: false },
    { id: 'section3', expanded: false },
    { id: 'section4', expanded: false },
    { id: 'section5', expanded: false }
  ])

  const [videoSections, setVideoSections] = useState<VideoSection[]>([
    { id: 'video1', expanded: false },
    { id: 'video2', expanded: false }
  ])

  const [emailData, setEmailData] = useState({
    email: '',
    name: ''
  })

  const [showEmailModal, setShowEmailModal] = useState(true)
  const [pageContent, setPageContent] = useState(false)
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showMainContent, setShowMainContent] = useState(true);
  
  // New states for sequential progression
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  const fetchCourseData = async (clientName?: string, courseUid?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (clientName) params.append('client_name', clientName)
      if (courseUid) params.append('course_uid', courseUid)
      
      const response = await fetch(`http://127.0.0.1:8001/api/v1/courses/fetch-courses?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      if (data.course) {
        setCourseData(data.course)
        // Sort modules by creation date or ID to ensure proper order
        const sortedModules = [...data.course.modules].sort((a, b) => a.id - b.id)
        setCourseData(prev => prev ? { ...prev, modules: sortedModules } : null)
      } else if (data.courses && data.courses.length > 0) {
        const course = data.courses[0]
        const sortedModules = [...course.modules].sort((a, b) => a.id - b.id)
        setCourseData({ ...course, modules: sortedModules })
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course data')
      console.error('Error fetching course data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    const storedName = localStorage.getItem('userName')
    
    if (storedEmail && storedName) {
      setShowEmailModal(false)
      setPageContent(true)
      setEmailData({ email: storedEmail, name: storedName })
      fetchCourseData('First-Demo', '5f63a894-98fb-4229-bbd3-48916edb3508')
    }
  }, [])

  // Load completed modules from localStorage
  useEffect(() => {
    if (courseData) {
      const savedCompleted = localStorage.getItem(`completed_modules_${courseData.id}`)
      if (savedCompleted) {
        setCompletedModules(new Set(JSON.parse(savedCompleted)))
      }
    }
  }, [courseData])

  // Save completed modules to localStorage
  const saveCompletedModules = (completed: Set<number>) => {
    if (courseData) {
      localStorage.setItem(`completed_modules_${courseData.id}`, JSON.stringify(Array.from(completed)))
    }
  }

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    )
  }

  const toggleVideo = (videoId: string) => {
    setVideoSections(prev =>
      prev.map(video =>
        video.id === videoId
          ? { ...video, expanded: !video.expanded }
          : video
      )
    )
  }

  const handleEmailSubmit = async () => {
    if (validateEmail(emailData.email) && emailData.name.trim() !== '' && emailData.name !== emailData.email) {
      localStorage.setItem('userEmail', emailData.email)
      localStorage.setItem('userName', emailData.name)
      setShowEmailModal(false)
      setPageContent(true)
      await fetchCourseData('First-Demo', '5f63a894-98fb-4229-bbd3-48916edb3508')
    } else {
      alert('Please enter a valid email address.')
    }
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Enhanced function to start sequential module flow
  const handleStartModule = (sectionId: string) => {
    if (!courseData?.modules || courseData.modules.length === 0) {
      alert('No modules available in this course.')
      return
    }

    // Start with the first module (index 0)
    setCurrentModuleIndex(0)
    setActiveModule(courseData.modules[0])
    setActiveSection(sectionId)
    setShowMainContent(false)
  }

  // Enhanced function to handle module completion and progression
  const handleModuleComplete = () => {
    if (!courseData?.modules || !activeModule) return

    const currentModule = activeModule
    const newCompleted = new Set(completedModules)
    newCompleted.add(currentModule.id)
    setCompletedModules(newCompleted)
    saveCompletedModules(newCompleted)

    // Check if there are more modules
    const nextIndex = currentModuleIndex + 1
    if (nextIndex < courseData.modules.length) {
      // Move to next module
      setCurrentModuleIndex(nextIndex)
      setActiveModule(courseData.modules[nextIndex])
    } else {
      // Course completed
      alert('Congratulations! You have completed all modules in this course.')
      setActiveModule(null)
      setActiveSection(null)
      setShowMainContent(true)
      setCurrentModuleIndex(0)
    }
  }

  // Function to go back to main content without completing current module
  const handleBackToMain = () => {
    setActiveModule(null)
    setActiveSection(null)
    setShowMainContent(true)
  }

  // Function to get progress information
  const getProgressInfo = () => {
    if (!courseData?.modules) return { current: 0, total: 0, percentage: 0 }
    
    const total = courseData.modules.length
    const current = currentModuleIndex + 1
    const percentage = Math.round((completedModules.size / total) * 100)
    
    return { current, total, percentage }
  }

  // If activeModule exists and we're not showing main content, render only the ModuleFlow
  if (activeModule && !showMainContent) {
    const progress = getProgressInfo()
    
    return (
      <div className="bg-white rounded-2xl  p-8 mt-8 max-w-6xl mx-auto w-full">
        {/* Progress Header */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">Course Progress</h2>
            <button
              onClick={handleBackToMain}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Course Overview
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Module {progress.current} of {progress.total}</span>
            <span>{progress.percentage}% Complete</span>
          </div>
        </div>

        {/* Module Content */}
        <ModuleFlow
          module={activeModule}
          onComplete={handleModuleComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-roboto leading-relaxed text-gray-800 pb-12">
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-sm w-full mx-4">
            <h2 className="text-gray-800 mb-8 text-2xl font-semibold">Enter Your Email & Name To Continue</h2>
            <input
              type="email"
              placeholder="Enter your email..."
              value={emailData.email}
              onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-4 mb-5 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-100"
              required
            />
            <input
              type="text"
              placeholder="Enter your name..."
              value={emailData.name}
              onChange={(e) => setEmailData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-4 mb-5 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-100"
              required
            />
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              className="bg-emerald-500 text-white border-none p-4 rounded-lg text-base font-semibold cursor-pointer transition-all w-full hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-300"
            >
              {loading ? 'Loading...' : 'Enter'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center py-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="h-11 w-32 ml-5">
            <img className="h-11 w-32" src="./Untitled-2.png" alt="Logo" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-5">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">Communication for Managers MasterClass</h1>
        <p className="text-base text-gray-600 text-center mb-10">Deep dive into Communications for Managers</p>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {loading && <p className="text-gray-500 text-center mb-6">Fetching data...</p>}

        {/* Course Progress Summary */}
        {/* {courseData?.modules && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completedModules.size / courseData.modules.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {completedModules.size} of {courseData.modules.length} modules completed 
              ({Math.round((completedModules.size / courseData.modules.length) * 100)}%)
            </p>
          </div>
        )} */}

        <div className="flex justify-center my-8">
          <video
            width="900"
            controls
            className="rounded-lg shadow-lg border border-gray-300"
          >
            <source src="https://storage.googleapis.com/publicvid/observation2/E-Learning%20Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="flex justify-center">
          <div className="bg-emerald-500 text-white px-4 py-2 mt-6 mb-1 rounded-md text-sm font-medium z-10 relative w-42 text-center">
            Course Samples
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <Div
            id="user-demos"
            className="bg-white border border-gray-300 rounded-md p-4 shadow-sm"
          >
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <button 
                className="bg-white border border-gray-300 rounded-3xl px-5 py-1.5 text-sm font-medium cursor-pointer relative hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection('section1')}
              >
                <span className="text-black">{courseData?.title || (loading ? 'Loading course...' : 'No course found')}</span>
                <span className="absolute -top-4 right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">Section#1</span>
              </button>
              <button 
                className="bg-white border border-gray-300 rounded-3xl px-5 py-1.5 text-sm font-medium cursor-pointer relative hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection('section2')}
              >
                <span className="text-black">Roleplay Observation for Communication</span>
                <span className="absolute -top-4 right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">Section#2</span>
              </button>
              <button 
                className="bg-white border border-gray-300 rounded-3xl px-5 py-1.5 text-sm font-medium cursor-pointer relative hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection('section3')}
              >
                <span className="text-black">Communication Simulation</span>
                <span className="absolute -top-4 right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">Section#3</span>
              </button>
              <button 
                className="bg-white border border-gray-300 rounded-3xl px-5 py-1.5 text-sm font-medium cursor-pointer relative hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection('section4')}
              >
                <span className="text-black">Communications for Manager - Assessment</span>
                <span className="absolute -top-4 right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">Section#4</span>
              </button>
              <button 
                className="bg-white border border-gray-300 rounded-3xl px-5 py-1.5 text-sm font-medium cursor-pointer relative hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection('section5')}
              >
                <span className="text-black">Course CoachBot</span>
                <span className="absolute -top-4 right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">Section#5</span>
              </button>
            </div>
          </Div>
        </div>
      </main>

      {/* Section 1 */}
      <div className="max-w-4xl mx-auto p-5" id="section1">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-8 bg-emerald-500 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-50 m-0">{courseData?.title || (loading ? 'Loading course...' : 'No course found')}</h1>
          </div>

          <div className="border-b border-gray-200">
            <div 
              className="flex justify-between items-center py-5 px-8 cursor-pointer transition-colors hover:bg-gray-50 rounded-md select-none"
              onClick={() => toggleSection('section1')}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="font-semibold text-gray-800 text-sm">Sample</span>
                <span className="text-gray-600 font-normal">-</span>
                <span className="text-gray-600 text-sm font-normal">{courseData?.sub_title}</span>
              </div>
              <div className="text-gray-600 transition-transform flex items-center justify-center w-6 h-6">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  className={`transition-transform ${sections.find(s => s.id === 'section1')?.expanded ? 'rotate-180' : ''}`}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div 
              className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                sections.find(s => s.id === 'section1')?.expanded ? 'max-h-screen py-6 px-8' : 'max-h-0'
              }`}
            >
              <div 
                className="border-2 border-emerald-600 rounded-lg p-3 cursor-pointer transition-colors select-none flex justify-between items-center"
                onClick={() => toggleVideo('video1')}
              >
                <span className="text-emerald-600 ml-5 flex relative font-medium">AI Coach Lesson or Additional Context (Expand to play)</span>
                <div className="text-emerald-600 transition-transform flex items-center justify-center w-5 h-5">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className={`transition-transform ${videoSections.find(v => v.id === 'video1')?.expanded ? 'rotate-180' : ''}`}
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-300 mt-3 ${
                videoSections.find(v => v.id === 'video1')?.expanded ? 'max-h-screen' : 'max-h-0'
              }`}>
                <iframe 
                  src="https://storage.googleapis.com/publicvid/observation2/E-Learning.mp4"
                  className="w-full h-96 border-none rounded-lg"
                  allowFullScreen
                />
              </div>

              <div className="mt-4">
                <h3 className="text-base font-semibold text-gray-800 mb-4">The Foundation: Active Listening & Empathetic Understanding:</h3>
                <div className="list-none p-0 text-sm text-gray-600 space-y-3">
                  <p>💼 Core Communication Masterclass: From Listening to Leading Across Cultures 🌍🎧💻</p>
                  <p>In today's fast-paced, interconnected world, exceptional communication isn't just a skill—it's your competitive edge. This comprehensive masterclass brings together three transformative lessons with your AI Coaches, Jay and Maya, to help you lead with clarity, empathy, and impact in any environment.</p>
                  <div className="pl-5 mb-3 text-sm text-gray-600 leading-6">
                    <div className="relative pl-5 mb-3">🎯 Active Listening & Empathetic Understanding</div>
                    <p className="mb-3">Master the art of being fully present, shifting from reacting to understanding, paraphrasing for clarity, and empathizing to build trust. Explore real-world success stories like Google's Project Aristotle and manager Priya's leadership transformation.</p>
                    
                    <div className="relative pl-5 mb-3">💻 Digital Dexterity for the Virtual Workplace</div>
                    <p className="mb-3">Sharpen your skills for today's digital-first environment—craft clear, actionable emails, excel in asynchronous tools like Slack and Teams, and lead engaging, fatigue-free virtual meetings that keep teams aligned and energized.</p>

                    <div className="relative pl-5 mb-3">🌍 Cross-Cultural Communication Mastery</div>
                    <p className="mb-3">Navigate global differences in directness, hierarchy, time perception, and non-verbal cues with confidence. Gain strategies to build trust, avoid misunderstandings, and leverage diversity for stronger collaboration, illustrated by real-world global partnership successes.</p>
                  </div>
                  <button
                    className="bg-emerald-500 text-white border-none rounded-md py-3 px-6 text-sm font-semibold cursor-pointer transition-all mt-4 mb-4 ml-auto block hover:bg-emerald-600"
                    onClick={() => handleStartModule('section1')}
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-4xl mx-auto p-5" id="section2">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-8 bg-emerald-500 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-50 m-0">
              Observation Roleplay Observation for Communication
            </h1>
          </div>

          <div className="border-b border-gray-200">
            <div
              className="flex justify-between items-center py-5 px-8 cursor-pointer transition-colors hover:bg-gray-50 rounded-md select-none"
              onClick={() => toggleSection("section2")}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="font-semibold text-gray-800 text-sm">Role Play</span>
                <span className="text-gray-600 font-normal">-</span>
                <span className="text-gray-600 text-sm font-normal">
                  Cross-cultural communication
                </span>
              </div>
              <div className="text-gray-600 transition-transform flex items-center justify-center w-6 h-6">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform ${
                    sections.find((s) => s.id === "section2")?.expanded
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                sections.find((s) => s.id === "section2")?.expanded
                  ? "max-h-screen py-6 px-8"
                  : "max-h-0"
              }`}
            >
              <div
                className="border-2 border-emerald-600 rounded-lg p-3 cursor-pointer transition-colors select-none flex justify-between items-center"
                onClick={() => toggleVideo("video2")}
              >
                <span className="text-emerald-600 ml-5 flex relative font-medium">
                  AI Coach Lesson or Additional Context (Expand to play)
                </span>
                <div className="text-emerald-600 transition-transform flex items-center justify-center w-5 h-5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-transform ${
                      videoSections.find((v) => v.id === "video2")?.expanded
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 mt-3 ${
                  videoSections.find((v) => v.id === "video2")?.expanded
                    ? "max-h-screen"
                    : "max-h-0"
                }`}
              >
                <iframe
                  src="https://storage.googleapis.com/publicvid/observation2/QG8XLFO.mp4"
                  className="w-full h-96 border-none rounded-lg"
                  allowFullScreen
                />
              </div>

              <div className="mt-4">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  Cross-cultural communication:
                </h3>
                <div className="list-none p-0">
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">
                    - Idioms and jargon can create confusion and misunderstanding
                    in cross-cultural communication.
                  </div>
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">
                    - Simplified, clear language bridges cultural gaps and
                    enhances comprehension.
                  </div>
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">
                    - Effective cross-cultural communication prioritizes
                    directness and avoids ambiguity.
                  </div>
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">
                    - Cultural sensitivity includes recognizing that familiar
                    phrases may not translate well.
                  </div>
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">
                    - Striving for clarity over complexity fosters stronger
                    connections and mutual understanding.
                  </div>
                </div>

                <button
                  className="bg-emerald-500 text-white border-none rounded-md py-3 px-6 text-sm font-semibold cursor-pointer transition-all mt-4 ml-auto block hover:bg-emerald-600"
                  onClick={() => handleStartModule('section2')}
                >
                  Start Sequential Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Section 3 */}
      <div className="max-w-4xl mx-auto p-5" id="section3">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-8 bg-emerald-500 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-50 m-0">Simulation Communication Simulation</h1>
          </div>

          <div className="border-b border-gray-200">
            <div 
              className="flex justify-between items-center py-5 px-8 cursor-pointer transition-colors hover:bg-gray-50 rounded-md select-none"
              onClick={() => toggleSection('section3')}
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="font-semibold text-gray-800 text-sm">Simulation Code</span>
                <span className="text-gray-600 font-normal">-</span>
                <span className="text-gray-600 text-sm font-normal">Coachbot Practice</span>
              </div>
              <div className="text-gray-600 transition-transform flex items-center justify-center w-6 h-6">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  className={`transition-transform ${sections.find(s => s.id === 'section3')?.expanded ? 'rotate-180' : ''}`}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div 
              className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                sections.find(s => s.id === 'section3')?.expanded ? 'max-h-screen py-6 px-8' : 'max-h-0'
              }`}
            >
              <div className="mt-4">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Below you can find the the relevant simulation titles and their interaction codes:</h3>
                <div className="list-none p-0">
                  <div className="relative pl-5 mb-3 text-sm text-gray-600 leading-6">-Effective Communication → Layoff Aftermath Navigation (High-Level Skills: Communication, Leadership) ( Code: Q4BK2ST)</div>
                </div>
                <button 
                  className="bg-emerald-500 text-white border-none rounded-md py-3 px-6 text-sm font-semibold cursor-pointer transition-all mt-4 ml-auto block hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-300"
                  onClick={handleStartInteraction}
                >
                  Start Intercation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="max-w-4xl mx-auto p-5" id="section4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-8 bg-emerald-500 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-50 m-0">Communications for Manager - Asssessment</h1>
          </div>
          <div className="p-0">
            <iframe 
              src="https://go.meiro.cc/4178596" 
              className="w-full border-none h-96"
            />
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="max-w-4xl mx-auto p-5" id="section5">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="text-center py-3 px-8 bg-emerald-500 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-50 m-0">Course Coachbot</h1>
          </div>
          <div className="p-0">
            <div className="w-full">
              <iframe  
                src="https://dashboard.tinytalk.ai/bots/c96a0a89-2442-43b0-873b-f14b60eda2be/chat"  
                className="w-full h-96 border-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Render Active Module */}
      {activeModule && (
        <div className="max-w-4xl mx-auto p-5">
          <ModuleFlow
            module={activeModule}
            onComplete={() => setActiveModule(null)}
          />
        </div>
      )}
    </div>
  )
}

export default CommunicationCourse

export const handleStartInteraction = async () => {
    if (typeof window !== 'undefined') {
      // Open the chat container if available
      if (typeof (window as any).openChatContainer2 === 'function') {
        (window as any).openChatContainer2();
      }

      // ✅ wait until chat element + shadowRoot + text-input exists
      const waitForChatReady = async (): Promise<ShadowRoot | null> => {
        return new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 50;
          const interval = setInterval(() => {
            const chatElement = document.getElementById('chat-element2') as HTMLElement | null;
            if (chatElement && (chatElement as any).shadowRoot) {
              const shadow = (chatElement as any).shadowRoot;
              const textInput = shadow.getElementById('text-input') as HTMLInputElement | null;
              if (textInput) {
                clearInterval(interval);
                resolve(shadow);
              }
            }
            if (++attempts > maxAttempts) {
              clearInterval(interval);
              resolve(null);
            }
          }, 300);
        });
      };

      const fillAndSubmitTextInput = async (value: string, label: string) => {
        return new Promise<void>((resolve) => {
          let attempts = 0;
          const maxAttempts = 30;
          const interval = setInterval(() => {
            const chatElement = document.getElementById('chat-element2') as HTMLElement | null;
            if (chatElement && (chatElement as any).shadowRoot) {
              const shadow = (chatElement as any).shadowRoot;
              const textInput = shadow.getElementById('text-input') as HTMLInputElement | HTMLTextAreaElement | null;

              if (textInput) {
                textInput.focus();
                textInput.value = value;

                textInput.dispatchEvent(new Event('input', { bubbles: true }));
                textInput.dispatchEvent(new Event('change', { bubbles: true }));

                // simulate Enter key
                ['keydown', 'keypress', 'keyup'].forEach(type => {
                  const event = new KeyboardEvent(type, {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true
                  });
                  textInput.dispatchEvent(event);
                });

                console.log(`Submitted ${label}:`, value);
                clearInterval(interval);
                resolve();
              }
            }
            if (++attempts > maxAttempts) {
              console.log(`Failed to submit ${label}`);
              clearInterval(interval);
              resolve();
            }
          }, 200);
        });
      };

      const waitForInputToClear = async (label: string) => {
        return new Promise<boolean>((resolve) => {
          let attempts = 0;
          const maxAttempts = 30;
          const interval = setInterval(() => {
            const chatElement = document.getElementById('chat-element2') as HTMLElement | null;
            if (chatElement && (chatElement as any).shadowRoot) {
              const shadow = (chatElement as any).shadowRoot;
              const textInput = shadow.getElementById('text-input') as HTMLInputElement | HTMLTextAreaElement | null;
              if (textInput) {
                const currentVal = textInput.value;
                if (currentVal.trim() === '') {
                  console.log(`Input cleared for next step: ${label}`);
                  clearInterval(interval);
                  resolve(true);
                }
              }
            }
            if (++attempts > maxAttempts) {
              console.log(`Timeout waiting for input to clear for ${label}`);
              clearInterval(interval);
              resolve(false);
            }
          }, 200);
        });
      };

      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      // ✅ wait for chat widget ready
      const shadow = await waitForChatReady();
      if (!shadow) {
        console.warn("Chat widget not ready");
        return;
      }

      // Auto-fill flow
      const email = localStorage.getItem('userEmail') || '';
      const name = localStorage.getItem('userName') || '';
      const testCode = 'Q4BK2ST';
      console.log('Auto-filling interaction with:', { email, name, testCode });
      if (email) {
        await fillAndSubmitTextInput(email, 'email');
      }

      if (name && name !== email) {
        await fillAndSubmitTextInput(name, 'name');
        await waitForInputToClear('name');
      }

      if (testCode) {
        await delay(2000);
        await fillAndSubmitTextInput(testCode, 'testCode');
        await waitForInputToClear('testCode');
      }
    }
  };