import { memo, useCallback, useState } from 'react';

import { UsersForm } from './UsersForm';
import { UsersList } from './UsersList';

export const Users = memo(() => {
  const [editId, setEditId] = useState<number | null | undefined>(undefined);

  const editHandler = useCallback((id: number) => {
    setEditId(id);
  }, []);

  const addHandler = useCallback(() => {
    setEditId(null);
  }, []);

  const backHandler = useCallback(() => {
    setEditId(undefined);
  }, []);

  if (editId === undefined) {
    return <UsersList onEdit={editHandler} onAdd={addHandler} />;
  }

  return <UsersForm onBack={backHandler} id={editId} />;
});
