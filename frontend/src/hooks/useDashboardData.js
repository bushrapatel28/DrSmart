import { useState } from "react";

const useDashboardData = () => {

  const [dashboard, setDashboard] = useState('');
  const [isDashboardSelected, setIsDashboardSelected] = useState(false);

  function dashboardOnClick(selectedDash) {
    setDashboard(selectedDash);
    setIsDashboardSelected(true);
  }

  return {
    dashboard,
    setDashboard,
    isDashboardSelected,
    setIsDashboardSelected,
    dashboardOnClick
  }
}

export default useDashboardData;