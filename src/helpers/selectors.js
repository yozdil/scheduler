export function getAppointmentsForDay(state, day) {
  const appsForDay = [];

  //... returns an array of appointments for that day
  const filteredDays = state.days.filter((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appId) => {
        appsForDay.push(state.appointments[appId]);
      });
    }
  });

  return appsForDay;
}
