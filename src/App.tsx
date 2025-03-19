import { FC, useState } from 'react'
import { Card, DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { CalendarEvent, WeekCalendar } from 'src/WeekCalendar'

const App: FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs())

  return (
    <Card>
      <DatePicker picker="week" value={value} onChange={setValue} style={{ marginBottom: 10 }} />
      <div style={{ height: 'calc(100vh - 90px)' }}>
        <WeekCalendar startHour={8} endHour={23} events={events} />
      </div>
    </Card>
  )
}

const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Morning Standup',
    day: 1,
    startTime: '08:00',
    endTime: '08:45',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Morning Standup',
    day: 2,
    startTime: '08:00',
    endTime: '08:45',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Morning Standup',
    day: 3,
    startTime: '08:00',
    endTime: '08:45',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Morning Standup',
    day: 4,
    startTime: '08:00',
    endTime: '08:45',
    color: 'blue',
  },
  {
    id: 5,
    title: 'Morning Standup',
    day: 5,
    startTime: '08:00',
    endTime: '08:45',
    color: 'blue',
  },
  {
    id: 6,
    title: 'Client Call',
    day: 1,
    startTime: '10:30',
    endTime: '11:15',
    color: 'green',
  },
  {
    id: 7,
    title: 'Product Discussion',
    day: 2,
    startTime: '09:15',
    endTime: '10:30',
    color: 'orange',
  },
  {
    id: 8,
    title: 'Weekly Planning',
    day: 1,
    startTime: '09:00',
    endTime: '10:00',
    color: 'orange',
  },
  {
    id: 9,
    title: 'Lunch with Team',
    day: 5,
    startTime: '12:00',
    endTime: '13:00',
    color: 'green',
  },
]

export default App
