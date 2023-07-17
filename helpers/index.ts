export const handleOpenChange = (open: boolean, onChange: () => void) => {
  if (!open) {
    onChange();
  }
};
