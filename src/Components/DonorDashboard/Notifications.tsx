const Notifications = () => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notifications & Alerts</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-gray-700 rounded">
          Your next donation eligibility: 2025-09-10
        </li>
        <li className="p-2 bg-gray-700 rounded">
          New blood drive at City Hall on 2025-09-15
        </li>
        <li className="p-2 bg-gray-700 rounded text-red-400">
          Emergency request for O- blood donors
        </li>
      </ul>
    </div>
  );
};

export default Notifications;
