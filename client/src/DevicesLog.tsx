import React, { useState, useEffect } from 'react';

// Device Log Interface
interface Device {
  _id?: string;
  user: string;
  type: string;
  date: string;
  startTime?: string;
  endTime?: string;
}

const DevicesLog = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [user, setUser] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch devices from backend
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('https://resource-9wq8.onrender.com/api/devices');
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const addDevice = async () => {
    if (!user || !type || !date) {
      setError('Please fill all mandatory fields: User Name, Device Type, and Date.');
      return;
    }

    const newDevice: Device = { user, type, date, startTime, endTime };

    try {
      const response = await fetch('https://resource-9wq8.onrender.com/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevice),
      });
      if (response.ok) {
        const savedDevice = await response.json();
        setDevices([...devices, savedDevice]);
        clearForm();
      }
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      await fetch(`https://resource-9wq8.onrender.com/api/devices/${id}`, {
        method: 'DELETE',
      });
      setDevices(devices.filter(device => device._id !== id));
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const editDevice = (index: number) => {
    const device = devices[index];
    setUser(device.user);
    setType(device.type);
    setDate(device.date);
    setStartTime(device.startTime || '');
    setEndTime(device.endTime || '');
    setEditIndex(index);
  };

  const clearForm = () => {
    setUser('');
    setType('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Logged Devices</h1>

      {/* Form */}
      <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add or Edit Device</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col gap-4">
          <input
            className="border p-2 rounded-md"
            type="text"
            placeholder="User Name (mandatory)"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" disabled>Select Device Type (mandatory)</option>
            <option value="Projector">Projector</option>
            <option value="Smart Board">Smart Board</option>
            <option value="Lab">Lab</option>
            <option value="Lab">Seminar Hall</option>
            
          </select>
          <input
            className="border p-2 rounded-md"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Start Time (optional)"
          />
          <input
            className="border p-2 rounded-md"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="End Time (optional)"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={addDevice}
          >
            {editIndex !== null ? 'Update Device' : 'Add Device'}
          </button>
        </div>
      </div>

      {/* Table of Devices */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Device Log</h2>
        <table className="min-w-full bg-gray-50 border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Device Type</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">No devices logged</td>
              </tr>
            ) : (
              devices.map((device, index) => (
                <tr key={device._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{device.user}</td>
                  <td className="border px-4 py-2">{device.type}</td>
                  <td className="border px-4 py-2">{device.date}</td>
                  <td className="border px-4 py-2">{device.startTime || 'N/A'}</td>
                  <td className="border px-4 py-2">{device.endTime || 'N/A'}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => editDevice(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteDevice(device._id as string)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevicesLog;
