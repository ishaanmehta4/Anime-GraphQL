import React, { useState, useEffect } from 'react';
import './index.scss';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import JSONPretty from 'react-json-pretty';
import './react-json-pretty-custom.css';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

function QueryResultBox({ queryString }) {
  let [state, setState] = useState({
    loading: false,
    data: '',
  });

  useEffect(() => {
    execQuery()
  }, []);

  async function execQuery() {
   setState({
      data: {},
      loading: true,
    });

    try {
      client
        .query({
          query: gql`
            ${queryString}
          `,
        })
        .then(result => {
          setState({
            data: result.data,
            loading: false,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div id="query-result-box">
      <div id="query-result-box__play-button" color="primary">
        <Fab onClick={execQuery} color="primary" aria-label="add">
          <PlayArrowRoundedIcon />
        </Fab>
      </div>
      {state.loading && (
        <div id="query-result-box__loader__wrapper">
          <CircularProgress color="secondary" />
        </div>
      )}
      {(state.data.anime || state.data.character) && (
        <div class="query-result-box__result-wrapper">
          <JSONPretty id="json-pretty" data={state.data || {}}></JSONPretty>
        </div>
      )}
    </div>
  );
}

export default QueryResultBox;
