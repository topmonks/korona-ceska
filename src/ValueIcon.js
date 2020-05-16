import React, { useMemo } from 'react';

const iconByType = type => require(`./icons/${type}.svg`);

export default function ValueIcon({ value, type }) {
  const icon = useMemo(() => iconByType(type), [type])
  return <img src={icon} width="64px" height="64px" alt={type} />;
}