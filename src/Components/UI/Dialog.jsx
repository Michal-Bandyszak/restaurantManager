import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function RestaurantDialog({ onClose, open, children }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      {children}
    </Dialog>
  );
}
