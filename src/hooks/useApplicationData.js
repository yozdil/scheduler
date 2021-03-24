import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`)),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function remSpots(appointments) {
    return state.days.map((day) => {
      const maxAppointments = day.appointments.length;
      const copyDay = { ...day };
      copyDay.spots = day.appointments.reduce((acc, curr) => {
        if (appointments[curr].interview) {
          return acc - 1;
        }
        return acc;
      }, maxAppointments);
      return copyDay;
    });
  }
  


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: remSpots(appointments),
      });
    });
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: remSpots(appointments),
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview, remSpots };
}
