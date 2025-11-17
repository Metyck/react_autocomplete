import React, { useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { DropdownTrigger } from './Components/DropdownTrigger';

type User = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

// App

export const App: React.FC = () => {
  const [querry, setQuerry] = useState<string>('');
  const [appliedQuerry, setAppliedQuerry] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  // helper functions
  const filteredUsers = useMemo(() => {
    if (selectedUser) {
      return [selectedUser.name];
    }

    return peopleFromServer.filter((user: User) =>
      user.name.includes(appliedQuerry),
    );
  }, [appliedQuerry, selectedUser]);

  const selectedUserHelper = useMemo(() => {
    return (
      <h1 className="title" data-cy="title">
        {selectedUser
          ? `${selectedUser.name} (${selectedUser.born} - ${selectedUser.died})`
          : 'No selected person'}
      </h1>
    );
  }, [selectedUser]);

  // build part

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedUserHelper}
        </h1>

        <div className="dropdown is-active">
          <DropdownTrigger
            querry={selectedUser?.name || querry}
            appliedQuerry={appliedQuerry}
            onQuerryChange={newQuerry => setQuerry(newQuerry)}
            onAppliedChange={newAppliedQuerry => {
              setAppliedQuerry(newAppliedQuerry);
              setSelectedUser(null);
            }}
          />

          {filteredUsers?.length > 0 && !selectedUser && (
            <div
              className="dropdown-menu"
              role="menu"
              data-cy="suggestions-list"
            >
              <div className="dropdown-content">
                {filteredUsers &&
                  filteredUsers.map((person: User) => (
                    <div
                      className="dropdown-item"
                      data-cy="suggestion-item"
                      key={`${person.name}-${person.born}`}
                      onClick={() => setSelectedUser(person)}
                    >
                      <p className="has-text-link">{person.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {!filteredUsers?.length && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
