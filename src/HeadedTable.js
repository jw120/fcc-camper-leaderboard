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

type Props = {
  title: string;
  headers: Header[];
  rows: (React.Element<*>[])[];
}

function TitleRow({title}: {title: string}): React.Element<*> {
  return (
    <tr>
      {title}
    </tr>
  );
}

function HeaderRow({headers}: {headers: Header[]}): React.Element<*> {
  return (
    <tr>
      {headers.map((h, i) => <th key={i}>{h.label}</th>)}
    </tr>
  );
}

function Row({elements}: {elements: React.Element<*>[]}): React.Element<*> {
  return (
    <tr>
      {elements.map((e, i) => <td key={i}>{e}</td>)}
    </tr>
  );
}

function renderName(name: string): React.Element<*> {
  return (
    <span>{name}</span>
  );
}

function renderCount(count: number): React.Element<*> {
  return (
    <span>{count}</span>
  );
}



function HeadedTable({title, headers, rows}: Props): React.Element<*> {
  return (
    <table className="HeadedTable">
      <thead>
        <TitleRow title={title} />
        <HeaderRow headers={headers} />
      </thead>
      <tbody>
        <Row elements={[renderName("Alice"), renderCount(100), renderCount(11)]} />
        <Row elements={[renderName("Bob"), renderCount(90), renderCount(8)]} />
        <Row elements={[renderName("Charlie"), renderCount(80), renderCount(9)]} />
      </tbody>
    </table>
  );
}

export default HeadedTable;
