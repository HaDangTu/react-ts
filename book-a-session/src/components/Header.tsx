import { useLocation } from 'react-router-dom';
import Button from './Button';
import { HOME_PATH, SESSIONS_PATH } from '../utils/paths';
import { useAppContext } from '../store/store';
import Modal, { type ModalAPI } from './Modal';
import UpcomingSession from './UpcomingSession';
import { useRef } from 'react';

export default function Header() {
  const { pathname } = useLocation();
  const context = useAppContext();
  const dialogRef = useRef<ModalAPI>(null);

  const sessions = context.state.items;

  const onUpcommingClick = () => {
    dialogRef.current?.show();
  };

  const onCloseModal = () => {};

  const onCancelSession = (sessionId: string) => {
    context.cancelSession(sessionId);
  };

  return (
    <div id='main-header'>
      <h1>React Mentoring</h1>
      <nav>
        <ul>
          <li>
            <Button to='/' textOnly active={pathname === HOME_PATH}>
              Our Mission
            </Button>
          </li>
          <li>
            <Button
              to={SESSIONS_PATH}
              textOnly
              active={pathname === SESSIONS_PATH}
            >
              Browse Sessions
            </Button>
          </li>
          <li>
            <Button onClick={onUpcommingClick}>Upcomming Session</Button>
          </li>
        </ul>
      </nav>
      <Modal
        ref={dialogRef}
        title='Upcomming Sessions'
        confirmText='Close'
        onConfirm={onCloseModal}
      >
        {sessions.length === 0 ? (
          <h5>Please book a session.</h5>
        ) : (
          sessions.map((session) => (
            <UpcomingSession key={session.id} {...session} onCancelSession={onCancelSession} />
          ))
        )}
      </Modal>
    </div>
  );
}
