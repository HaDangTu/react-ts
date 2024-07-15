import { type Session as SessionProps } from '../store/store';
import Button from './Button';

type UpcomingSessionProps = {
  onCancelSession: (sessionId: string) => void;
} & SessionProps;

export default function UpcomingSession({
  id,
  title,
  summary,
  date,
  onCancelSession,
}: UpcomingSessionProps) {
  const onCancelClick = () => {
    onCancelSession(id);
  };

  return (
    <div className='upcoming-session'>
      <div>
        <h3>{title}</h3>
        <p>{summary}</p>
        <time dateTime={new Date(date).toISOString()}>
          {new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>
      </div>

      <div className='actions'>
        <Button textOnly onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
