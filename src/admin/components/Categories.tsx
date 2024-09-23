import { memo, useCallback, useState } from 'react';

import { CategoriesForm } from './CategoriesForm';
import { CategoriesList } from './CategoriesList';

export const Categories = memo(() => {
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
    return <CategoriesList onEdit={editHandler} onAdd={addHandler} />;
  }

  return <CategoriesForm onBack={backHandler} id={editId} />;
});
