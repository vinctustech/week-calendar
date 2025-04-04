import { useMemo, CSSProperties } from 'react'
import './styles.scss'

// Types for the component
interface WeekCalendarProps<T extends WeekCalendarEvent = WeekCalendarEvent> {
  startHour: number // Integer hour (24-hour format)
  endHour: number // Integer hour (24-hour format)
  events: T[]
  firstDayOfWeek?: 0 | 1 // 0 for Sunday, 1 for Monday
  height?: string | number
  onEventClick?: (event: T) => void // Event handler with proper typing
}

export interface WeekCalendarEvent {
  id: string | number
  title: string
  day: number // 0-6 (0 = Sunday, 1 = Monday, etc.)
  startTime: string // Format: "HH:MM"
  endTime: string // Format: "HH:MM"
  color?: 'blue' | 'green' | 'orange' // Optional color theme
}

export const WeekCalendar = <T extends WeekCalendarEvent = WeekCalendarEvent>({
  startHour,
  endHour,
  events,
  firstDayOfWeek = 0,
  height = '100%',
  onEventClick,
}: WeekCalendarProps<T>) => {
  // Calculate total minutes and slots
  // const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute)
  // const totalSlots = Math.ceil(totalMinutes / 15)

  // Generate time labels
  const timeLabels = useMemo(() => {
    const labels = []
    let currentHour = startHour
    let currentMinute = 0 // Start at the beginning of the hour

    while (currentHour < endHour) {
      labels.push({
        hour: currentHour,
        minute: currentMinute,
        label: `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`,
      })

      currentMinute += 15
      if (currentMinute >= 60) {
        currentHour += 1
        currentMinute = 0
      }
    }

    return labels
  }, [startHour, endHour])

  const totalSlots = timeLabels.length

  // Generate days of week
  const daysOfWeek = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (firstDayOfWeek === 1) {
      // Start with Monday
      return [...days.slice(1), days[0]]
    }
    return days
  }, [firstDayOfWeek])

  // Calculate hourly time labels (every 4 slots)
  const hourlyTimeLabels = useMemo(() => {
    return timeLabels.filter((time) => time.minute === 0)
  }, [timeLabels])

  // Helper function to calculate slot index for a given time
  const getSlotIndex = (timeString: string): number => {
    const [hour, minute] = timeString.split(':').map(Number)
    const minutesFromStart = (hour - startHour) * 60 + minute
    return Math.floor(minutesFromStart / 15)
  }

  // Helper to calculate position and size for an event
  const calculateEventStyle = (event: WeekCalendarEvent): CSSProperties => {
    const startSlot = getSlotIndex(event.startTime)
    const endSlot = getSlotIndex(event.endTime)
    const duration = endSlot - startSlot

    // Ensure event is at least one slot tall
    const eventHeight = Math.max(1, duration) * 15

    return {
      top: `${startSlot * 15}px`,
      height: `${eventHeight}px`,
    }
  }

  // Helper to get ordinal day index (0-6) accounting for firstDayOfWeek
  const getAdjustedDayIndex = (day: number): number => {
    if (firstDayOfWeek === 1) {
      // If Monday is first day (1), then Monday(1) should be index 0
      return day === 0 ? 6 : day - 1
    }
    return day
  }

  // Generate grid lines for a day column
  const renderGridLines = () => {
    return (
      <>
        {timeLabels.map((time, index) => {
          const isHour = time.minute === 0
          const lineClass = isHour ? 'grid-line hour-line' : 'grid-line quarter-line'

          return index === 0 ? null : (
            <div
              key={`line-${time.label}`}
              className={lineClass}
              style={{ top: `${index * 15}px` }}
            />
          )
        })}
      </>
    )
  }

  return (
    <div className="week-calendar" style={{ height: height }}>
      {/* Day headers */}
      <div className="day-headers">
        <div className="day-header"></div> {/* Empty cell for time labels */}
        {daysOfWeek.map((day) => (
          <div key={`header-${day}`} className="day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-body">
        {/* Time labels on the left */}
        <div
          className="time-labels"
          style={{
            gridTemplateRows: `repeat(${totalSlots}, 15px)`,
          }}
        >
          {hourlyTimeLabels.map((time, index) => (
            <div
              key={`time-${time.label}`}
              className="time-label"
              style={{
                gridRow: `span 4`,
                gridRowStart: index * 4 + 1,
              }}
            >
              {time.label}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {daysOfWeek.map((day, dayIndex) => (
          <div
            key={`day-${day}`}
            className="day-column"
            style={{ gridTemplateRows: `repeat(${totalSlots}, 15px)` }}
          >
            {/* Grid lines */}
            {renderGridLines()}

            {/* Events for this day */}
            {events
              .filter((event) => getAdjustedDayIndex(event.day) === dayIndex)
              .map((event) => (
                <div
                  key={String(event.id)}
                  className={`event ${event.color ? `event-${event.color}` : 'event-blue'}`}
                  style={calculateEventStyle(event)}
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="event-title">{event.title}</div>
                  <div className="event-time">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
