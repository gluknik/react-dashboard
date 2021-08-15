import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector, useDispatch } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import ThemeAction from '../redux/actions/ThemeAction'


const chartOptions = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
}

const topCustomers = {
  head: [
    'user',
    'total revenue'
  ],
   body: [
    {
      "username": "Goldys",
      "price": "₪15,870"
  },
  {
      "username": "Frank",
      "price": "₪18,000"
  },
  {
      "username": "Loz",
      "price": "₪10,840"
  },
  {
      "username": "Stybel",
      "price": "₪9,251"
  },
  {
      "username": "Smadar",
      "price": "₪8,840"
  }
   ]
}

const newCustomers = {
  head: [
    'user'
  ],
   body: [
    {
      "username": "Stybel"
    },
    {
        "username": "Duty lemon"
    },
    {
        "username": "Loz"
    },
    {
        "username": "Segev"
    },
    {
        "username": "Ormat"
    }
   ]
}

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    {
      item.order ? (
        <td>{item.order}</td>
      ) : ''
    }
    
    <td>{item.price}</td>
  </tr>
)


const orderStatus = {
  "shipping": "primary",
  "pending": "warning",
  "paid": "success",
  "refund": "danger"
}

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
)

const Dashboard = () => {

  const themeReducer = useSelector(state => state.ThemeReducer.mode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ThemeAction.getTheme())
  })

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCards.map((item, index) => (
                <div className='col-6' key={index}>
                  <StatusCard
                    logo={item.logo}
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="row">
          <div className="col-5">
            <div className="card full-height">
            <div className="card__header">
              <h3>New customers</h3>
            </div>
              <div className="card__body">
                <Table
                  headData={newCustomers.head}
                  renderHead={(item, index) => renderCustomerHead(item, index)}
                  bodyData={newCustomers.body}
                  renderBody={(item, index) => renderCustomerBody(item, index)}
                />
              </div>
              <div className="card__footer">
              <Link to='/'>view all</Link>
            </div>
          </div>
        </div>
          <div className="col-7">
            <div className="card full-height">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>view all</Link>
            </div>
          </div>
          </div>

        </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <div className="card__header">
              <h3>Avg conversion rate</h3>
            </div>
            <div className="card__body">
              <Chart
                options={themeReducer === 'theme-node-dark' ? {
                  ...chartOptions.options,
                  theme: {mode: 'dark'}
                } : {
                  ...chartOptions.options,
                  theme: {mode: 'light'}
                }}
                series={chartOptions.series}
                type='line'
                height='100%'
              />
            </div>
            <div className="card__footer">
              <Link to='/ '>view all metrics</Link>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <div className="card__header">
              <h3>Avg conversion rate</h3>
            </div>
            <div className="card__body">
              <Chart
                options={themeReducer === 'theme-node-dark' ? {
                  ...chartOptions.options,
                  theme: {mode: 'dark'}
                } : {
                  ...chartOptions.options,
                  theme: {mode: 'light'}
                }}
                series={chartOptions.series}
                type='line'
                height='100%'
              />
            </div>
            <div className="card__footer">
              <Link to='/ '>view all metrics</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
