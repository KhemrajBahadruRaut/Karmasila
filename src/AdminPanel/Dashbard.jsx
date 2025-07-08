import { useEffect, useState } from "react";
import { FaBoxes } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_parts: 0,
    active_users: 0,
    pending_orders: 0,
    revenue: 0,
    recent_activities: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost/karmashila/summary/summary.php")
    fetch("https://karmasila.com.np/karmashila/summary/summary.php")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Parts"
          value={stats.total_parts}
          change="↑ 12% from last month"
          border="border-blue-500"
          changeColor="text-green-500"
        />
        <StatCard
          label="Active Users"
          value={stats.active_users}
          change="↑ 5% from last week"
          border="border-blue-500"
          changeColor="text-green-500"
        />
        

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recent_activities.length > 0 ? (
            stats.recent_activities.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaBoxes className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New part added</p>
                  <p className="text-sm text-gray-500">{activity.message}</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">{activity.time}</div>
              </div>
            ))
          ) : (
            <p className="p-6 text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, border, changeColor }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${border}`}>
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    <p className={`text-sm ${changeColor} mt-1`}>{change}</p>
  </div>
);

export default Dashboard;
