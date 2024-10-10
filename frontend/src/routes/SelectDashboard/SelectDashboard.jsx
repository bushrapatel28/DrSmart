const SelectDashboard = (props) => {

  return (
    <>
      <div className="dashboards">
        <div>
          <button 
            className="patients"
            onClick={() => props.dashboardOnClick('patients')}
          >
            <h1>Patients Dashboard</h1>
          </button>
        </div>

        <div>
          <button 
            className="doctors"
            onClick={() => props.dashboardOnClick('doctors')}
          >
            <h1>Doctors Dashboard</h1>
          </button>
        </div>
      </div>
    </>
  )

}

export default SelectDashboard;