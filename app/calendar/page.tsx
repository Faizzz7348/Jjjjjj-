"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange, List } from "lucide-react"
import { cn } from "@/lib/utils"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventInput } from "@fullcalendar/core"

type ViewMode = "month" | "week" | "day" | "list"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-02-12T00:00:00'))
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [todayDate, setTodayDate] = useState<Date | null>(null)
  const calendarRef = useRef<any>(null)

  // Set today's date on client side only
  useEffect(() => {
    setTodayDate(new Date())
    setCurrentDate(new Date())
  }, [])

  const [events, setEvents] = useState<EventInput[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: "2026-02-12T10:00:00",
      end: "2026-02-12T11:00:00",
      backgroundColor: "#3b82f6",
      borderColor: "#3b82f6",
    },
    {
      id: "2",
      title: "Project Deadline",
      start: "2026-02-15",
      allDay: true,
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
    },
    {
      id: "3",
      title: "Lunch Break",
      start: "2026-02-12T12:00:00",
      end: "2026-02-12T13:00:00",
      backgroundColor: "#22c55e",
      borderColor: "#22c55e",
    },
  ])

  const monthYear = useMemo(() => {
    return currentDate.toLocaleDateString('ms-MY', { month: 'long', year: 'numeric' })
  }, [currentDate])

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    
    return { days, firstDay, year, month }
  }, [currentDate])

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (day: number) => {
    if (!todayDate) return false
    return todayDate.getDate() === day && 
           todayDate.getMonth() === currentDate.getMonth() && 
           todayDate.getFullYear() === currentDate.getFullYear()
  }

  const daysList = useMemo(() => {
    const list = []
    const { days, firstDay } = daysInMonth
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      list.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= days; day++) {
      list.push(day)
    }
    
    return list
  }, [daysInMonth])

  const weekDays = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu']

  const viewOptions = [
    { 
      value: "month" as ViewMode, 
      label: "Month", 
      icon: <Calendar className="h-4 w-4" />
    },
    { 
      value: "week" as ViewMode, 
      label: "Week", 
      icon: <CalendarRange className="h-4 w-4" />
    },
    { 
      value: "day" as ViewMode, 
      label: "Day", 
      icon: <CalendarDays className="h-4 w-4" />
    },
    { 
      value: "list" as ViewMode, 
      label: "List", 
      icon: <List className="h-4 w-4" />
    },
  ]

  const getViewButtonStyle = (view: ViewMode): string => {
    const styles = {
      month: "bg-[#0a1929] hover:bg-[#0d1b2a] border-[#1b263b]",
      week: "bg-[#005f73] hover:bg-[#0a9396] border-[#00b4d8]",
      day: "bg-[#006494] hover:bg-[#0077be] border-[#0096c7]",
      list: "bg-[#023e8a] hover:bg-[#0353a4] border-[#0077b6]"
    }
    return styles[view]
  }

  const cycleView = () => {
    const currentIndex = viewOptions.findIndex(opt => opt.value === viewMode)
    const nextIndex = (currentIndex + 1) % viewOptions.length
    const nextView = viewOptions[nextIndex].value
    setViewMode(nextView)
    
    // Update FullCalendar view if it's active
    if (calendarRef.current && nextView !== "month") {
      const calendarApi = calendarRef.current.getApi()
      if (nextView === "week") calendarApi.changeView("timeGridWeek")
      else if (nextView === "day") calendarApi.changeView("timeGridDay")
      else if (nextView === "list") calendarApi.changeView("listWeek")
    }
  }

  const currentViewOption = viewOptions.find(opt => opt.value === viewMode) || viewOptions[0]

  return (
    <PageLayout>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="h-9 w-9" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar
            </h1>
            <p className="text-sm text-muted-foreground">Kalendar bulanan</p>
          </div>
          
          {/* Single View Mode Cycle Button */}
          <button
            key={viewMode}
            onClick={cycleView}
            className={cn(
              "text-white px-4 py-2 rounded-lg border",
              "flex items-center gap-2",
              "transition-all duration-200",
              "shadow-sm hover:shadow-md",
              "active:scale-95",
              "text-sm font-medium",
              getViewButtonStyle(viewMode)
            )}
          >
            {currentViewOption.icon}
            <span>{currentViewOption.label}</span>
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
        {viewMode === "month" ? (
          // Custom Month View
          <div className="rounded-xl border bg-card shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold capitalize">{monthYear}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="text-xs px-2.5 py-1.5 h-8"
                >
                  Hari Ini
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {daysList.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square flex items-start justify-end p-2 rounded-lg text-sm font-medium transition-all duration-200",
                      day === null && "invisible",
                      day !== null && !isToday(day) && "hover:bg-muted cursor-pointer",
                      day !== null && isToday(day) && "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // FullCalendar Views (Week, Day, List)
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <style jsx global>{`
              .fc {
                font-family: inherit;
              }
              
              .fc .fc-toolbar {
                padding: 1.5rem;
                background: transparent;
                border-bottom: 1px solid hsl(var(--border));
              }
              
              .fc .fc-toolbar-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: hsl(var(--foreground));
              }
              
              .fc .fc-button {
                background: transparent;
                border: 1px solid hsl(var(--border));
                color: hsl(var(--foreground));
                text-transform: capitalize;
                padding: 0.375rem 0.75rem;
                border-radius: 0.5rem;
                font-weight: 500;
                font-size: 0.875rem;
                box-shadow: none;
                transition: all 0.2s ease;
              }
              
              .fc .fc-button:hover:not(:disabled) {
                background: hsl(var(--accent));
                color: hsl(var(--accent-foreground));
                border-color: hsl(var(--border));
                box-shadow: none;
                transform: none;
              }
              
              .fc .fc-button:active {
                transform: scale(0.95);
              }
              
              .fc .fc-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }
              
              .fc .fc-button-active {
                background: hsl(var(--accent));
                color: hsl(var(--accent-foreground));
                border-color: hsl(var(--border));
              }
              
              .fc .fc-button-group {
                gap: 0.25rem;
              }
              
              .fc .fc-prev-button,
              .fc .fc-next-button {
                padding: 0.375rem;
                width: 2rem;
                min-width: 2rem;
              }
              
              /* Theme Standard Borders */
              .fc-theme-standard td,
              .fc-theme-standard th {
                border-color: hsl(var(--border));
              }
              
              .fc-theme-standard .fc-scrollgrid {
                border-color: hsl(var(--border));
              }
              
              /* Column Headers - Improved visibility */
              .fc .fc-col-header-cell {
                background: hsl(var(--muted));
                color: hsl(var(--foreground));
                font-weight: 700;
                padding: 0.75rem 0.5rem;
                border: 1px solid hsl(var(--border));
              }
              
              .fc .fc-col-header-cell-cushion {
                color: hsl(var(--foreground));
                text-decoration: none;
                font-size: 0.875rem;
                font-weight: 700;
              }
              

              
              /* Today Highlighting */
              .fc .fc-daygrid-day.fc-day-today,
              .fc .fc-timegrid-col.fc-day-today {
                background-color: hsl(var(--accent) / 0.15);
              }
              
              .fc .fc-timegrid-col.fc-day-today {
                background-color: hsl(var(--accent) / 0.15);
              }
              
              /* Time Grid Background */
              .fc .fc-timegrid-col {
                background: hsl(var(--card));
                border-right: 1px solid hsl(var(--border));
              }
              
              .fc .fc-timegrid-body {
                background: hsl(var(--background));
              }
              
              /* Alternate row subtle tint */
              .fc .fc-timegrid-slot {
                border-color: hsl(var(--border));
              }
              
              .fc .fc-timegrid-slot-lane {
                border-color: hsl(var(--border));
              }
              
              /* Day Numbers in TimeGrid - More visible */
              .fc .fc-daygrid-day-number,
              .fc .fc-timegrid-slot-label {
                color: hsl(var(--foreground));
                font-weight: 600;
                padding: 0.25rem;
              }
              
              /* Time Grid Slots */
              .fc .fc-timegrid-slot {
                height: 3rem;
              }
              
              /* Time labels - Much more visible */
              .fc .fc-timegrid-slot-label {
                font-size: 0.875rem;
                color: hsl(var(--foreground));
                font-weight: 600;
              }
              
              /* Events - Better visibility */
              .fc-event {
                cursor: pointer;
                border-radius: 0.375rem;
                padding: 0.25rem 0.5rem;
                border-left-width: 3px;
                transition: all 0.2s ease;
              }
              
              .fc-event:hover {
                opacity: 0.95;
                transform: scale(1.02);
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
              }
              
              .fc-event-title,
              .fc-event-time {
                font-size: 0.875rem;
                font-weight: 600;
                padding: 0.125rem;
                color: white !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
              }
              
              /* List View Styling - Much more visible */
              .fc .fc-list {
                border-color: hsl(var(--border));
              }
              
              .fc .fc-list-day-cushion {
                background: hsl(var(--muted));
                color: hsl(var(--foreground));
                padding: 0.875rem 1rem;
                font-weight: 700;
                font-size: 0.875rem;
                border: 1px solid hsl(var(--border));
              }
              
              .fc .fc-list-event:hover td {
                background-color: hsl(var(--accent));
              }
              
              .fc .fc-list-event-dot {
                border-width: 5px;
              }
              
              .fc .fc-list-event-title a,
              .fc .fc-list-event-time {
                color: hsl(var(--foreground));
                font-weight: 600;
                font-size: 0.875rem;
              }
              
              .fc .fc-list-table td {
                padding: 1rem;
                border-color: hsl(var(--border));
                background: hsl(var(--card));
              }
              
              /* All Day Slot - Better visibility */
              .fc .fc-timegrid-divider {
                background: hsl(var(--muted));
                border-color: hsl(var(--border));
              }
              
              .fc .fc-timegrid-axis-cushion {
                color: hsl(var(--foreground));
                font-size: 0.875rem;
                font-weight: 600;
              }
              
              /* Now Indicator - More prominent */
              .fc .fc-timegrid-now-indicator-line {
                border-color: hsl(var(--primary));
                border-width: 2px;
              }
              
              .fc .fc-timegrid-now-indicator-arrow {
                border-color: hsl(var(--primary));
                border-width: 5px;
              }
              
              /* Scrollbar Styling */
              .fc-scroller::-webkit-scrollbar {
                width: 10px;
                height: 10px;
              }
              
              .fc-scroller::-webkit-scrollbar-track {
                background: hsl(var(--muted) / 0.3);
                border-radius: 4px;
              }
              
              .fc-scroller::-webkit-scrollbar-thumb {
                background: hsl(var(--muted-foreground) / 0.5);
                border-radius: 4px;
              }
              
              .fc-scroller::-webkit-scrollbar-thumb:hover {
                background: hsl(var(--muted-foreground) / 0.7);
              }
              
              /* Better contrast for day header in week/day views */
              .fc .fc-day-sun,
              .fc .fc-day-sat {
                color: hsl(var(--foreground));
              }
              
              /* More visible empty state */
              .fc .fc-list-empty {
                background: hsl(var(--muted));
                color: hsl(var(--foreground));
                font-weight: 600;
                padding: 2rem;
              }
            `}</style>
            
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              initialView={
                viewMode === "week" ? "timeGridWeek" : 
                viewMode === "day" ? "timeGridDay" : 
                "listWeek"
              }
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              height="auto"
              contentHeight={700}
              slotMinTime="04:00:00"
              slotMaxTime="24:30:00"
              slotDuration="00:30:00"
              allDaySlot={true}
              nowIndicator={true}
              eventMaxStack={3}
              dayMaxEventRows={4}
              expandRows={false}
            />
          </div>
        )}
      </div>
    </PageLayout>
  )
}
