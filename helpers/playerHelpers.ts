export const onPlayNextOrPrevious = (
  ids: string[],
  activeId: string | undefined,
  setId: (id: string) => void,
  direction: 'next' | 'previous'
) => {
  if (activeId === undefined || ids.length === 0) {
    return;
  }

  const currentIndex = ids.indexOf(activeId);

  if (currentIndex === -1) {
    return;
  }

  const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + ids.length) % ids.length;
  setId(ids[newIndex]);
};