'use client';

import React from 'react';

interface NavbarProps {
  onStartWorkoutClick?: () => void;
  onCheckinClick?: () => void;
}

export function Navbar({ onStartWorkoutClick, onCheckinClick }: NavbarProps = {}) {
  // AppShell already renders AppHeader at the layout level
  return null;
}
