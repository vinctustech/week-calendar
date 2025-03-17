import { FC, useState } from 'react'
import { Card, DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { CalendarEvent, WeekCalendar } from 'src/WeekCalendar'

const App: FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs())
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Morning Team Sync',
      day: 1, // Monday
      startTime: '09:05',
      endTime: '10:00',
      color: 'blue',
    },
    {
      id: '2',
      title: 'Client Call',
      day: 1, // Monday
      startTime: '10:35',
      endTime: '11:00',
      color: 'green',
    },
    {
      id: '3',
      title: 'Product Discussion',
      day: 2, // Tuesday
      startTime: '09:15',
      endTime: '10:30',
      color: 'orange',
    },
    {
      id: '4',
      title: 'Weekly Planning',
      day: 3, // Wednesday
      startTime: '13:00',
      endTime: '14:30',
      color: 'blue',
    },
    {
      id: '5',
      title: 'Lunch with Team',
      day: 5, // Friday
      startTime: '12:00',
      endTime: '13:00',
      color: 'green',
    },
  ]

  return (
    <Card>
      <DatePicker picker="week" value={value} onChange={setValue} style={{ marginBottom: 10 }} />
      <div>
        <WeekCalendar
          startTime="09:00"
          endTime="17:00"
          events={events}
          firstDayOfWeek={1} // Start with Monday
        />
      </div>
    </Card>
  )
}

export default App
