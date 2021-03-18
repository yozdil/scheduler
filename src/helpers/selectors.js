function getAppointmentsForDay(state, day) {
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


function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];

  const interviewObj = { student, interviewer };
  return interviewObj;
}

function getInterviewersForDay(state, day) {
  const int = [];

  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((intId) => {
        int.push(state.interviewers[intId]);
      });
    }
  });

  return int;
}


export { getAppointmentsForDay, getInterview, getInterviewersForDay };
