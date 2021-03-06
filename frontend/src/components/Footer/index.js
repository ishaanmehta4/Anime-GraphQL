import React from 'react';
import './index.scss';

const API_BASE_URL = 'https://anime-gql.herokuapp.com' || 'http://localhost:5000';

function Footer() {
  return (
    <div id="footer">
      <div>
        <h3>API endpoints</h3>
        <div>
          GRAPHQL: <a className="no-decoration">{`${API_BASE_URL}/graphql`}</a>
        </div>
        <div>
          REST: GET <a className="no-decoration">{`${API_BASE_URL}/rest/character/:character_name`}</a>
        </div>
        <div className="no-bullet">
          Example: <a className="no-decoration" href={`${API_BASE_URL}/rest/character/all+might`} target='_blank'>{`${API_BASE_URL}/rest/character/all+might`}</a>
        </div>
        <div>
          REST: GET <a className="no-decoration">{`${API_BASE_URL}/rest/anime/:anime_name`}</a>
        </div>
        <div className="no-bullet">
          Example: <a className="no-decoration" href={`${API_BASE_URL}/rest/anime/my+hero+academia`} target='_blank'>{`${API_BASE_URL}/rest/anime/my+hero+academia`}</a>
        </div>
      </div>
      <div>
        <div>
          All data fetched from <a href="http://www.animecharactersdatabase.com">www.animecharactersdatabase.com</a>.
        </div>
        <div>
            Developed by <a href="https://www.linkedin.com/in/ishaanmehta4/" target="_blank">Ishaan Mehta</a>.
        </div>
      </div>
    </div>
  );
}

export default Footer;
