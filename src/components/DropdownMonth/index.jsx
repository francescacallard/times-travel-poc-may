import React, { useState } from 'react'
import { Dropdown, Button, Space, Menu } from 'antd'
import { DownOutlined, CalendarOutlined  } from '@ant-design/icons'
import { DurationMenu } from 'components/DurationMenu'
import './styles.css'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export const DropdownMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState('May')

  const handleMenuClick = (event) => {
    setSelectedMonth(event.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {months.map(month => (
        <Menu.Item key={month}>{month}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className='textContainer'>
    <p className='specifyTextBox'>Specify your preferred travel month and the duration of your trip</p>
    <div className='container'>
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <Space>
        <CalendarOutlined />
        <span className='month-text'>{selectedMonth}</span>
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <DurationMenu />
    </div>
    <p className='inspireTextBox'>Select three of the options that match what you're looking for in your next adventure!</p>
    </div>
  )
};