import React from 'react';
import './index.scss';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

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
        <div>
          Example: <a className="no-decoration">{`${API_BASE_URL}/rest/character/all+might`}</a>
        </div>
        <div>
          REST: GET <a className="no-decoration">{`${API_BASE_URL}/rest/anime/:anime_name`}</a>
        </div>
        <div>
          Example: <a className="no-decoration">{`${API_BASE_URL}/rest/anime/my+hero+academia`}</a>
        </div>
      </div>
      <div>
        <div>
          All data fetched from <a href="http://www.animecharactersdatabase.com">www.animecharactersdatabase.com</a>
        </div>
        <div>
            Developed and maintained by <a>Ishaan Mehta</a>. <a>Get in touch.</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
