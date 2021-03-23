import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames/bind";

export default function DayListItem({ spots, selected, name, setDay }) {
  const formatSpots = () => {
    if (!spots) {
      return "no spots remaining";
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--full": !spots,
    "day-list__item--selected": selected,
  });

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
