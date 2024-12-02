import React from 'react'
import { Badge } from '../ui/badge';

const badgeClasses = {
  pending: "bg-yellow-400",
  confirmed: "bg-green-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-teal-500",
  delivered: "bg-purple-600",
  rejected: "bg-red-500",
};


const StatusBadge = ({orderStatus}) => {
  return (
    <Badge className={`flex justify-center items-center px-2 py-1 text-xs font-medium w-20 text-center text-white rounded ${badgeClasses[orderStatus]}`}>
    {orderStatus}
  </Badge>
  )
}

export default StatusBadge