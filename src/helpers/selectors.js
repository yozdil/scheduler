export default function getAppointmentsForDay(state, day) {
  const app = [];

  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appId) => {
        app.push(state.appointments[appId]);
      });
    }
  });

  return app;
}
