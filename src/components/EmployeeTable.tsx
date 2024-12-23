
import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter Employees
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort Employees
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const fieldA = a[sortField as keyof Employee] as string;
    const fieldB = b[sortField as keyof Employee] as string;
    if (sortOrder === 'asc') {
      return fieldA.localeCompare(fieldB);
    } else {
      return fieldB.localeCompare(fieldA);
    }
  });

  // Handle Sorting
  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('department')}>Department {sortField === 'department' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('position')}>Position {sortField === 'position' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <button className="edit" onClick={() => onEdit(emp.id)}>
                  Edit
                </button>
                <span> </span>
                <button className="delete" onClick={() => onDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {sortedEmployees.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
