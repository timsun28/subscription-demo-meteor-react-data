import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection, Link } from '../api/links';
import { Meteor } from 'meteor/meteor';

export const Info = () => {
  const [typeSearch, setTypeSearch] = useState("");
  
  
  // Without the deps, but removes the old sub and creates the correct subscription
  const documentsLoading = useTracker(() => {
    const handle = Meteor.subscribe("links", typeSearch);
    return !handle.ready();
  });

  // As described in the docs, but does not give the wanted result.
  // const documentsLoading = useTracker(() => {
  //   const handle = Meteor.subscribe("links", typeSearch);
  //   return !handle.ready();
  // }, [typeSearch]);

  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });

  const makeLink = (link: Link) => {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <select onChange={(e) => setTypeSearch(e.currentTarget.value)}>
        <option value="">All</option>
        <option value="tutorial">Tutorial</option>
        <option value="guide">Guide</option>
        <option value="discussion">Discussion</option>
      </select>
      {documentsLoading ? <p>Loading...</p> : <ul>{links.map(makeLink)}</ul>}
    </div>
  );
};
