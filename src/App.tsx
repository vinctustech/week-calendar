import { FC, useState } from 'react'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

const App: FC = () => {
  // Default to current week
  const [value, setValue] = useState<Dayjs>(dayjs())

  const onChange = (date: Dayjs | null) => {
    if (date) {
      setValue(date)

      // You can get the week start and end dates here if needed
      console.log(
        'Selected week:',
        date.startOf('week').format('YYYY-MM-DD'),
        'to',
        date.endOf('week').format('YYYY-MM-DD'),
      )
    }
  }

  return <DatePicker picker="week" value={value} onChange={onChange} allowClear={false} />
}

export default App
