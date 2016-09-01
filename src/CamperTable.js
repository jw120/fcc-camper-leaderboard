/** @flow
 *
 * Stateless function component that renders our table of campers
 *
 */

import React from 'react';
import './CamperTable.css';

/** States of sorting direction used for each column header */
export type Direction =
  "Up" | "Down"  // Actively sorting on this column either ascending or descending
  | "Unselected" // Column could be used for sorting, but not currenly selected
  | "NonControl"; // Cannot sort on this column

/* Table for for each camper */
export type Camper = {
  username: string;
  alltime: number;
  recent: number;
}

/** Props for our CamperTable component */
type Props = {
  headers: string[];
  directions: Direction[];
  campers: Camper[];
  onHeaderClick: (columnIndex: number) => void;
}

/**
 * Helper function to render the appropriate direction indicator for a column header item
 */
function DirectionIndicator(props: {direction: Direction}): ?React.Element<*> {
  switch (props.direction) {
    case "Up":
      return (<i className="fa fa-sort-asc"></i>);
    case "Down":
      return (<i className="fa fa-sort-desc"></i>);
    case "Unselected":
      return (<i className="fa fa-sort-asc Hidden"></i>); // Hidden arrow to keep fixed spacing
    default:
      return null;
  }
}

/**
 * Helper function to build the head of our table with an optional title row across all the columns
 * and a row of headings
 */
function Head(props: {headers: string[], directions: Direction[], onHeaderClick: (columns: number) => void}): React.Element<*> {
  return (
    <thead>
      <tr>
        {props.headers.map((h, i) => {
          return (
            <th
              key={i}
              className={
                (props.directions[i] === "NonControl" ? "NonControlHeader" : "ControlHeader") +
                (i === 1 ? " LeftAlign" : "")
              }
              onClick={() => props.onHeaderClick(i)}
            >
              {h} <DirectionIndicator direction={props.directions[i]} />
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
      <td className="LeftAlign">{props.camper.username}</td>
      <td>{props.camper.alltime}</td>
      <td>{props.camper.recent}</td>
    </tr>
  );
}

function CamperTable(props: Props): React.Element<*> {
  return (
    <table className="CamperTable">
      <Head headers={props.headers} directions={props.directions} onHeaderClick={props.onHeaderClick}/>
      <tbody>
        {props.campers.map((camper, index) => <CamperRow camper={camper} index={index + 1} key={index} />)}
      </tbody>
    </table>
  );
}

export default CamperTable;
