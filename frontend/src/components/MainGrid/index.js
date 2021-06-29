import React, { useState } from 'react';
import './index.scss';

import FieldList from "../FieldList";
import QueryStringBox from "../QueryStringBox";
import QueryResultBox from "../QueryResultBox";

const DEFAULT_QUERY = {
  anime: 
 `{
    anime(name: "My hero academia") {
        name
        plot
        image
        characters {
          name
          bio
          image
        }
    }
}`,
  character:
 `{
    character(name: "All might") {
      name
      bio
      birthday
      image
      height
      anime {
        name
        plot
        image
      }
      voicedby
      tags
    }
}`,
};

function MainGrid() {
  let [rootState, setRootState] = useState({
    queryType: 'character',
    queryString: DEFAULT_QUERY.character,
  });

  return (
    <div id="main-grid">
      {/* COLUMN 1 */}
      <div>
        <div className="section__header">Choose query</div>
        <div
          onClick={() => {
            setRootState({ ...rootState, queryType: 'character' , queryString: DEFAULT_QUERY.character});
          }}
          className={`section1__option ${rootState.queryType == 'character' && 'section1__option--active'}`}
        >
          Character
        </div>
        <div
          onClick={() => {
            setRootState({ ...rootState, queryType: 'anime', queryString: DEFAULT_QUERY.anime });
          }}
          className={`section1__option ${rootState.queryType == 'anime' && 'section1__option--active'}`}
        >
          Anime
        </div>
      </div>

      {/* COLUMN 2 */}
      <div>
        <div className="section__header">Available fields</div>
        <FieldList queryType={rootState.queryType} />
      </div>

      {/* COLUMN 3 */}
      <div>
        <div className="section__header">GraphQL query string</div>
        <QueryStringBox rootState={rootState} setRootState={setRootState}/>
      </div>

      {/* COLUMN 4 */}
      <div>
        <div className="section__header">Query results</div>
        <QueryResultBox queryString={rootState.queryString} />
      </div>
    </div>
  );
}

export default MainGrid;
