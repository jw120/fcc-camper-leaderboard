/** @flow
 *
 * Stateless function component that renders a table with a header row that allows sorting
 *
 */

import React from 'react';
import './HeadedTable.css';

type Header = {
  label: string;
  direction: "Up" | "Down" | "Unselected" | "NonControl";
}

type ElementArray = React.Element<*>[];

type Props = {
  title: string;
  headers: Header[];
  rows: ElementArray[];
}

/**
 * Helper function to build the head of our table with an optional title row across all the columns
 * and a row of heading
 */
function Head({title, headers}: {title: string, headers: Header[]}): React.Element<*> {

  let titleRow =
    <tr className="HeadedTable-title">
      <th colSpan={headers.length}>
        {title}
      </th>
    </tr>;

  return (
    <thead>
      {title ? titleRow : ""}
      <tr>
        {headers.map((h, i) => <th key={i}>{h.label}</th>)}
      </tr>
    </thead>
  );
}

function Row({ elements }: {elements: React.Element<*>[]}): React.Element<*> {
  return (
    <tr>
      {elements.map((e, i) => <td key={i}>{e}</td>)}
    </tr>
  );
}

function HeadedTable({title, headers, rows}: Props): React.Element<*> {
  return (
    <table className="HeadedTable">
      <Head title={title} headers={headers} />
      <tbody>
        <Row elements={rows[0]} index={1} />
        <Row elements={rows[1]} index={2} />
        <Row elements={rows[2]} index={3} />
      </tbody>
    </table>
  );
}

export default HeadedTable;
