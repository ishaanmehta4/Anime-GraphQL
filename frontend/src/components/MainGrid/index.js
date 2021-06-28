import React, { useState } from 'react';
import './index.scss';

import FieldPicker from "../FieldPicker";

function MainGrid() {
  let [rootState, setRootState] = useState({
    queryType: 'anime',
    fields: [],
    name: 'fd'
  });

  let toggleField = (fieldName) => {
    let localFields = [...rootState.fields]
    console.log({localFields})

    if(localFields.includes(fieldName)) localFields = localFields.filter(f => f !== fieldName)
    else  localFields.push(fieldName)

    setRootState({
      ...rootState,
      fields: localFields
    })
  }

  let setName = (name) => {
    setRootState({
      ...rootState,
      name
    })
  }

  return (
    <div id="main-grid">
      {/* COLUMN 1 */}
      <div>
        <div className="section__header">Choose query</div>
        <div
          onClick={() => {
            setRootState({ ...rootState, queryType: 'anime' });
          }}
          className={`section1__option ${rootState.queryType == 'anime' && 'section1__option--active'}`}
        >
          Anime
        </div>
        <div
          onClick={() => {
            setRootState({ ...rootState, queryType: 'character' });
          }}
          className={`section1__option ${rootState.queryType == 'character' && 'section1__option--active'}`}
        >
          Character
        </div>
      </div>

      {/* COLUMN 2 */}
      <div>
        <div className="section__header">Select fields</div>
        <FieldPicker rootState={rootState} toggleParentField={toggleField} setParentName={setName}/>
      </div>

      {/* COLUMN 3 */}
      <div>
        <div className="section__header">GraphQL query string</div>
        {`{`}``
        <br />
        {`  Query ${rootState.queryType}(name: "${rootState.name}") {`}
          <br />
          {`  ${rootState.fields.join('\n')}`}
          <br />
          {`  }`}
        <br />
        {`}`}
      </div>

      {/* COLUMN 4 */}
      <div>
        <div className="section__header">Query results</div>
      </div>
    </div>
  );
}

export default MainGrid;
