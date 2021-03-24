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

  const remSpots = (increment) => {
    let dayIndex;
    const day = {
      ...state.days.find((value, index) => {
        dayIndex = index;
        return (value.name = state.day);
      }),
    };

    increment ? day.spots++ : day.spots--;

    const days = [...state.days];
    days[dayIndex] = day;
    return days;
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
        days: remSpots(false),
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
        days: remSpots(true),
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview, remSpots };
}
