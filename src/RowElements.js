/** @flow
 *
 * Stateless function component that renders a table with a header row that allows sorting
 *
 */

import React from 'react';

type Camper = {
  username: string,
  alltime: number
}

/* Helper component */
function Index({ index }: { index: number }): React.Element<*> {
  return (
    <span>{index}</span>
  );
}

/** Helper component */
function Name({ camper }: { camper: Camper }): React.Element<*> {
  return (
    <span>{camper.username}</span>
  );
}

/** Helper component */
function AllTime({ camper }: { camper: Camper }): React.Element<*> {
  return (
    <span>{camper.alltime}</span>
  );
}

function RowElements({ camper, index } : { camper: Camper, index: number }): React.Element<*>[] {
  return ([
    <Index index={index} />,
    <Name camper={camper} />,
    <AllTime camper={camper}/>,
    <AllTime camper={camper} />
  ]);
}

export default RowElements;
