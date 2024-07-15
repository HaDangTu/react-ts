import Button from '../components/Button.tsx';
import { SESSIONS } from '../dummy-sessions.ts'; // normally, we would probably load that from a server
import { type Session as SessionProps } from '../store/store.tsx';
import { SESSIONS_PATH } from '../utils/paths.ts';

function SessionItem({ id, title, summary, image }: SessionProps) {
  return (
    <div className='session-item'>
      <img src={image} alt={title} />

      <div className='session-data'>
        <h3>{title}</h3>
        <p>{summary}</p>

        <div className='actions'>
          <Button to={`${SESSIONS_PATH}/${id}`}>Learn More</Button>
        </div>
      </div>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <main id='sessions-page'>
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      {SESSIONS.length > 0 && (
        <div id='sessions-list'>
          {SESSIONS.map((item) => (
            <SessionItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  );
}
