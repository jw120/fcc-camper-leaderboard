/** @flow
 *
 * Stateless function component that renders a table with a header row that allows sorting
 *
 */

import React from 'react';
import './CamperTable.css';

type Direction = "Up" | "Down" | "Unselected" | "NonControl";

type Header = {
  label: string;
  direction: Direction;
}

type Camper = {
  username: string;
  alltime: number;
  recent: number;
}

type Props = {
  title: string;
  headers: Header[];
  campers: Camper[];
}

/**
 * Helper function to render the appropriate direction indicator for a column header item
 */
function DirectionIndicator(props: {direction: Direction}): ?React.Element<*> {
  switch (props.direction) {
    case "Up":
      return (<i className="fa fa-sort-asc fa-2x"></i>);
    case "Down":
      return (<i className="fa fa-sort-desc fa-2x"></i>);
    default:
      return null;
  }
}

/**
 * Helper function to build the head of our table with an optional title row across all the columns
 * and a row of headings
 */
function Head(props: {title: string, headers: Header[]}): React.Element<*> {

  let titleRow =
    <tr className="HeadedTable-title">
      <th colSpan={props.headers.length}>
        {props.title}
      </th>
    </tr>;

  return (
    <thead>
      {props.title && titleRow}
      <tr>
        {props.headers.map((h, i) => {
          return (
            <th
              key={i}
              className={h.direction === "NonControl" ? "NonControlHeader" : "ControlHeader"}
            >
              {h.label} <DirectionIndicator direction={h.direction} />
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

/**
 * Helper function to build a row from one camper's data and their index
 */
function CamperRow(props: {camper: Camper, index: number}): React.Element<*> {
  return (
    <tr key={props.index}>
      <td>{props.index}</td>
      <td>{props.camper.username}</td>
      <td>{props.camper.alltime}</td>
      <td>{props.camper.recent}</td>
    </tr>
  );
}

function CamperTable(props: Props): React.Element<*> {
  return (
    <table className="HeadedTable">
      <Head title={props.title} headers={props.headers} />
      <tbody>
        {props.campers.map((camper, index) => <CamperRow camper={camper} index={index + 1} key={index} />)}
      </tbody>
    </table>
  );
}

export default CamperTable;
