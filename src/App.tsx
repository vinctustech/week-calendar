import { FC, useState } from 'react'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

const App: FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs())

  console.log(value.toString())
  return <DatePicker picker="week" value={value} onChange={setValue} />
}

export default App
