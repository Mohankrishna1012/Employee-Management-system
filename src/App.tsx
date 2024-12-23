
import React, { useState } from 'react';
import AddEmployee from './components/AddEmployee';
import EmployeeTable from './components/EmployeeTable';
import './App.css';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  // Add or Update Employee
  const addOrUpdateEmployee = (employee: Employee) => {
    if (editEmployee) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
      // Add new employee
      setEmployees([...employees, employee]);
    }
    setEditEmployee(null); // Clear edit mode
  };

  // Delete Employee
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Edit Employee
  const handleEdit = (id: number) => {
    const emp = employees.find((emp) => emp.id === id);
    if (emp) setEditEmployee(emp);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditEmployee(null);
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <AddEmployee
        addOrUpdateEmployee={addOrUpdateEmployee}
        editEmployee={editEmployee}
        cancelEdit={cancelEdit}
      />
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeManagement;
