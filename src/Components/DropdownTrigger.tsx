import React, { useRef } from 'react';

type Props = {
  delay: number;
  querry: string;
  onQuerryChange: (querry: string) => void;
  onAppliedChange: (querry: string) => void;
  onFocused: (querry: boolean) => void;
};

// Dropdown

export const DropdownTrigger: React.FC<Props> = ({
  delay = 300,
  querry = '',
  onQuerryChange,
  onAppliedChange,
  onFocused,
}: Props) => {
  const timerId = useRef(0);

  // functions

  function handleQurryChange(event: React.ChangeEvent<HTMLInputElement>) {
    onQuerryChange(event.target.value);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      const trimmed = event.target.value.trim();

      onAppliedChange(trimmed);
    }, delay);
  }

  // build part

  return (
    <div className="dropdown-trigger">
      <input
        value={querry}
        type="text"
        placeholder="Enter a part of the name"
        className="input"
        data-cy="search-input"
        onChange={event => handleQurryChange(event)}
        onFocus={() => onFocused(true)}
        onBlur={() => onFocused(false)}
      />
    </div>
  );
};
