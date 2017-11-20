import React from "react";

const StandingsTableHeader = ({ activeMonth, currentMonth }) =>
  activeMonth === currentMonth
    ? <thead>
        <tr>
          <th>
            Player
          </th>
          <th className="text-center standings__w-l-column">
            {" "}W - L
          </th>
          <th className="text-center">
            {moment().format("MMM D")}
          </th>
          <th className="text-center hidden-xs">
            {moment().subtract(1, "days").format("MMM D")}
          </th>
        </tr>
      </thead>
    : <thead>
        <tr>
          <th>
            Player
          </th>
          <th className="text-center standings__w-l-column">
            {" "}W - L
          </th>
        </tr>
      </thead>;

export default StandingsTableHeader;
