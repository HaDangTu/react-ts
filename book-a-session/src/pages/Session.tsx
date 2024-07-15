import { ChangeEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Button from '../components/Button.tsx';
import Modal, { type ModalAPI } from '../components/Modal.tsx';
import Input from '../components/Input.tsx';
import { useAppContext } from '../store/store.tsx';

export default function SessionPage() {
  const [form, setForm] = useState({ name: '', email: '' });
  const context = useAppContext();

  const params = useParams<{ id: string }>();
  const modalRef = useRef<ModalAPI>(null);

  const sessionId = params.id || '';
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  const bookedSessions = context.state.items.map((session) => session.id);
  const isBooked = bookedSessions.includes(sessionId);

  const openBookSessionDialog = () => {
    modalRef.current?.show();
  };

  const onFormValueChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    };

  if (!loadedSession) {
    return (
      <main id='session-page'>
        <p>No session found!</p>
      </main>
    );
  }

  const clearForm = () => {
    setForm({ name: '', email: '' });
  };

  const onBookSession = () => {
    context.bookSession({ ...form, session: loadedSession });
    clearForm();
  };

  return (
    <main id='session-page'>
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p>
              <Button onClick={openBookSessionDialog} disabled={isBooked}>
                {isBooked ? 'Booked' : 'Book Session'}
              </Button>
            </p>
          </div>
        </header>
        <p id='content'>{loadedSession.description}</p>

        <Modal
          ref={modalRef}
          title='Book Session'
          confirmText='Book Session'
          onConfirm={onBookSession}
          onCancel={() => {}}
        >
          <Input
            id='name'
            label='Your name'
            type='text'
            value={form.name}
            onChange={onFormValueChange('name')}
          />
          <Input
            id='email'
            label='Your email'
            type='text'
            value={form.email}
            onChange={onFormValueChange('email')}
          />
        </Modal>
      </article>
    </main>
  );
}
