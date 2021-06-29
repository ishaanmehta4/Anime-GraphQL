import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './index.scss';

function QueryStringBox({rootState, setRootState}) {

  return (
    <div id="query-string-box">
      <TextareaAutosize 
        value={rootState.queryString} 
        onChange={(event) => {
            setRootState({
                ...rootState,
                queryString: event.target.value
            })
        }}
        placeholder="Enter query to execute" 
      />
    </div>
  );
}

export default QueryStringBox;
