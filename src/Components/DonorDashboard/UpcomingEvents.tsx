const UpcomingEvents = () => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Upcoming Blood Donation Events
      </h2>
      <ul className="space-y-2">
        <li className="p-2 bg-gray-700 rounded flex justify-between">
          <span>2025-09-15 | City Hall</span>
          <button className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
            Register
          </button>
        </li>
        <li className="p-2 bg-gray-700 rounded flex justify-between">
          <span>2025-09-25 | Community Center</span>
          <button className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
            Register
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UpcomingEvents;
