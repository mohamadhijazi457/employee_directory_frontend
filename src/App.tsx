import React from 'react'
import EmployeeTable from './components/employeeTable/employeeTable'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Employee Directory</h1>
        <EmployeeTable />
      </div>
    </div>
  )
}

export default App
