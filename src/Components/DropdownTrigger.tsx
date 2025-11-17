import React, { useRef } from 'react';

type Props = {
  querry: string;
  onQuerryChange: (querry: string) => void;
  appliedQuerry: string;
  onAppliedChange: (querry: string) => void;
};

// Dropdown

export const DropdownTrigger: React.FC<Props> = ({
  querry = '',
  appliedQuerry = '',
  onQuerryChange,
  onAppliedChange,
}: Props) => {
  const timerId = useRef(0);

  // functions

  function handleQurryChange(event: React.ChangeEvent<HTMLInputElement>) {
    onQuerryChange(event.target.value);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      if (event.target.value !== appliedQuerry) {
        onAppliedChange(event.target.value);
      }
    }, 300);
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
      />
    </div>
  );
};
