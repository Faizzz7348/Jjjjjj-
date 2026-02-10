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
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [todayDate, setTodayDate] = useState<Date | null>(null)
  const calendarRef = useRef<any>(null)

  // Set today's date on client side only
  useEffect(() => {
    setTodayDate(new Date())
  }, [])

  const [events, setEvents] = useState<EventInput[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: new Date().toISOString().split("T")[0] + "T10:00:00",
      end: new Date().toISOString().split("T")[0] + "T11:00:00",
      backgroundColor: "#3b82f6",
      borderColor: "#3b82f6",
    },
    {
      id: "2",
      title: "Project Deadline",
      start: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      allDay: true,
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
    },
    {
      id: "3",
      title: "Lunch Break",
      start: new Date().toISOString().split("T")[0] + "T12:00:00",
      end: new Date().toISOString().split("T")[0] + "T13:00:00",
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
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-[#0a1929] hover:bg-[#0d1b2a] border border-[#1b263b]"
    },
    { 
      value: "week" as ViewMode, 
      label: "Week", 
      icon: <CalendarRange className="h-4 w-4" />,
      color: "bg-[#005f73] hover:bg-[#0a9396] border border-[#00b4d8]"
    },
    { 
      value: "day" as ViewMode, 
      label: "Day", 
      icon: <CalendarDays className="h-4 w-4" />,
      color: "bg-[#006494] hover:bg-[#0077be] border border-[#0096c7]"
    },
    { 
      value: "list" as ViewMode, 
      label: "List", 
      icon: <List className="h-4 w-4" />,
      color: "bg-[#023e8a] hover:bg-[#0353a4] border border-[#0077b6]"
    },
  ]

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
            onClick={cycleView}
            className={cn(
              currentViewOption.color,
              "text-white px-4 py-2 rounded-lg",
              "flex items-center gap-2",
              "transition-all duration-200",
              "shadow-sm hover:shadow-md",
              "active:scale-95",
              "text-sm font-medium"
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
              <h2 className="text-2xl font-bold capitalize">{monthYear}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="text-sm"
                >
                  Hari Ini
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-9 w-9"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-9 w-9"
                >
                  <ChevronRight className="h-4 w-4" />
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
                font-size: 1.5rem;
                font-weight: 700;
                color: hsl(var(--foreground));
              }
              
              .fc .fc-button {
                background: transparent;
                border: 1px solid hsl(var(--border));
                color: hsl(var(--foreground));
                text-transform: capitalize;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-weight: 500;
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
                padding: 0.5rem;
                width: 2.5rem;
                min-width: 2.5rem;
              }
              
              /* Theme Standard Borders */
              .fc-theme-standard td,
              .fc-theme-standard th {
                border-color: #003d5c;
              }
              
              .fc-theme-standard .fc-scrollgrid {
                border-color: #003d5c;
              }
              
              /* Column Headers */
              .fc .fc-col-header-cell {
                background: #002b49;
                color: #90e0ef;
                font-weight: 600;
                padding: 0.75rem 0.5rem;
                border: 1px solid #003d5c;
              }
              
              .fc .fc-col-header-cell-cushion {
                color: #90e0ef;
                text-decoration: none;
                font-size: 0.875rem;
              }
              

              
              /* Today Highlighting */
              .fc .fc-daygrid-day.fc-day-today,
              .fc .fc-timegrid-col.fc-day-today {
                background-color: rgba(0, 43, 73, 0.15);
              }
              
              .fc .fc-timegrid-col.fc-day-today {
                background-color: rgba(0, 43, 73, 0.15);
              }
              
              /* Time Grid Background */
              .fc .fc-timegrid-col {
                background: hsl(var(--card));
                border-right: 1px solid #003d5c;
              }
              
              .fc .fc-timegrid-body {
                background: hsl(var(--background));
              }
              
              /* Alternate row subtle tint */
              .fc .fc-timegrid-slot {
                border-color: #003d5c;
              }
              
              .fc .fc-timegrid-slot-lane {
                border-color: #003d5c;
              }
              
              /* Day Numbers in TimeGrid */
              .fc .fc-daygrid-day-number,
              .fc .fc-timegrid-slot-label {
                color: #90e0ef;
                font-weight: 500;
                padding: 0.25rem;
              }
              
              /* Time Grid Slots */
              .fc .fc-timegrid-slot {
                height: 3rem;
              }
              
              .fc .fc-timegrid-slot-label {
                font-size: 0.75rem;
                color: #90e0ef;
              }
              
              /* Events */
              .fc-event {
                cursor: pointer;
                border-radius: 0.375rem;
                padding: 0.25rem 0.5rem;
                border-left-width: 3px;
                transition: all 0.2s ease;
              }
              
              .fc-event:hover {
                opacity: 0.9;
                transform: scale(1.02);
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              }
              
              .fc-event-title,
              .fc-event-time {
                font-size: 0.875rem;
                font-weight: 500;
                padding: 0.125rem;
              }
              
              /* List View Styling */
              .fc .fc-list {
                border-color: #003d5c;
              }
              
              .fc .fc-list-day-cushion {
                background: #002b49;
                color: #90e0ef;
                padding: 0.75rem 1rem;
                font-weight: 600;
                border: 1px solid #003d5c;
              }
              
              .fc .fc-list-event:hover td {
                background-color: rgba(0, 43, 73, 0.3);
              }
              
              .fc .fc-list-event-dot {
                border-width: 4px;
              }
              
              .fc .fc-list-event-title a,
              .fc .fc-list-event-time {
                color: #90e0ef;
                font-weight: 500;
              }
              
              .fc .fc-list-table td {
                padding: 1rem;
                border-color: #003d5c;
                background: hsl(var(--card));
              }
              
              /* All Day Slot */
              .fc .fc-timegrid-divider {
                background: #002b49;
                border-color: #003d5c;
              }
              
              .fc .fc-timegrid-axis-cushion {
                color: #90e0ef;
                font-size: 0.75rem;
              }
              
              /* Now Indicator */
              .fc .fc-timegrid-now-indicator-line {
                border-color: #90e0ef;
                border-width: 2px;
              }
              
              .fc .fc-timegrid-now-indicator-arrow {
                border-color: #90e0ef;
                border-width: 5px;
              }
              
              /* Scrollbar Styling */
              .fc-scroller::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              
              .fc-scroller::-webkit-scrollbar-track {
                background: rgba(0, 43, 73, 0.3);
                border-radius: 4px;
              }
              
              .fc-scroller::-webkit-scrollbar-thumb {
                background: rgba(0, 61, 92, 0.5);
                border-radius: 4px;
              }
              
              .fc-scroller::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 61, 92, 0.7);
              }
              
              /* Dark mode adjustments */
              .dark .fc .fc-list-day-cushion {
                background: #001a2e;
                border-color: #002b49;
              }
              
              .dark .fc .fc-col-header-cell {
                background: #001a2e;
                border-color: #002b49;
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
