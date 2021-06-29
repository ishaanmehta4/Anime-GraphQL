import React, {useState, useEffect} from 'react';
import './index.scss';
import Fab from '@material-ui/core/Fab';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function QueryResultBox({ queryString }) {
  let [state, setState] = useState({
    loading: false,
    data: ''
  })

  // useEffect(() => {
  //   setState({
  //     data: {},
  //     loading: false
  //   })

  // }, [queryString])
  async function execQuery() {
    setState({
      data: {},
      loading: true
    })
  
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
            loading: false
          })
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
      {state.loading && <div>LOADING...</div>}
      <div>{JSON.stringify(state.data)}</div>
    </div>
  );
}

export default QueryResultBox;
