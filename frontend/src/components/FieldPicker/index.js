import React, {useState} from 'react';
import './index.scss';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function FieldPicker({ rootState, toggleParentField, setParentName }) {
    let [state, setState] = useState({
        fields: {
            id: false
        }
    })

  let fieldList = {
    anime: ['name', 'plot', 'profileUrl', 'image', 'characters', 'characterNames'],
    character: ['name', 'bio', 'profileUrl', 'image', 'thumbnail', 'id', 'wealth', 'anime', 'mediatype', 'voicedby', 'tags', 'birthday', 'sign', 'height', 'uploadedby'],
  };

  let toggleField = (event) => {
      let field = event.target.name
      toggleParentField(field)

      setState({
          fields: {
              ...state.fields,
              [field]: !state.fields[field]
          }
      })
  }

  return (
    <div className="field-picker">
      <TextField onChange={(event)=> {setParentName(event.target.value)}} id="standard-basic" label={`Name of the ` + rootState.queryType} style={{ width: '100%' }} />

      {fieldList[rootState.queryType].map(field => (
        <div>
          <FormControlLabel control={<Checkbox onClick={toggleField} checked={state.fields[field]} name={field} inputProps={{ 'aria-label': 'primary checkbox' }} />} label={field} />
        </div>
      ))}
    </div>
  );
}

export default FieldPicker;
