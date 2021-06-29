import React from 'react';
import './index.scss';

function FieldList({ queryType }) {
  let fieldList = {
    anime: ['name', 'plot', 'profileUrl', 'image', 'characters (with all fields available in character query)', 'characterNames'],
    character: ['name', 'bio', 'profileUrl', 'image', 'thumbnail', 'id', 'wealth', 'anime (with all fields available in anime query)', 'mediatype', 'voicedby', 'tags', 'birthday', 'sign', 'height', 'uploadedby'],
  };

  return (

    <ul className="field-list">
      {fieldList[queryType].map(field => (
        <li> {field} </li>
      ))}
    </ul>
  );
}

export default FieldList;
