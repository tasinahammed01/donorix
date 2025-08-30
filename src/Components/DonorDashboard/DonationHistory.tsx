const DonationHistory = () => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Donation History</h2>
      <table className="min-w-full bg-gray-900 border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-2 px-3 border-b">#</th>
            <th className="py-2 px-3 border-b">Date</th>
            <th className="py-2 px-3 border-b">Location</th>
            <th className="py-2 px-3 border-b">Amount</th>
            <th className="py-2 px-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-900">
            <td className="py-2 px-3 border-b">1</td>
            <td className="py-2 px-3 border-b">2025-07-10</td>
            <td className="py-2 px-3 border-b">City Blood Camp</td>
            <td className="py-2 px-3 border-b">450ml</td>
            <td className="py-2 px-3 border-b">Completed</td>
          </tr>
        </tbody>
      </table>
      <button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        Download Report
      </button>
    </div>
  );
};

export default DonationHistory;
