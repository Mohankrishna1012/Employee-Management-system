import React, { useState, useEffect } from 'react';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

interface AddEmployeeProps {
  addOrUpdateEmployee: (employee: Employee) => void;
  editEmployee: Employee | null;
  cancelEdit: () => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({
  addOrUpdateEmployee,
  editEmployee,
  cancelEdit,
}) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setDepartment(editEmployee.department);
      setPosition(editEmployee.position);
    }
  }, [editEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !department || !position) {
      alert('All fields are required!');
      return;
    }

    const newEmployee: Employee = {
      id: editEmployee ? editEmployee.id : Date.now(),
      name,
      department,
      position,
    };

    addOrUpdateEmployee(newEmployee);
    setName('');
    setDepartment('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
      <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
      <button type="submit">{editEmployee ? 'Save Changes' : 'Add Employee'}</button>
      {editEmployee && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default AddEmployee;
