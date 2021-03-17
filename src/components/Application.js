import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
// Styles
import "components/Application.scss";
// Selectors
import getAppointmentsForDay from "../helpers/selectors";
// Components
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  useEffect(() => {
    axios.get(`/api/days`).then((res) => setDays(res.data));
  }, [days]);

  const appointmentList = appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  ));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} setDays={setDays} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
