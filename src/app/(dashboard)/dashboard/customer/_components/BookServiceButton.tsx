import Link from 'next/link';
import React from 'react';

const BookServiceButton = ({serviceId}: {serviceId: string}) => {
    return (
      <Link
        href={`/services/${serviceId}`}
        className="bg-(--success) text-white px-2 py-1 rounded"
      >Book Service</Link>
    );
};

export default BookServiceButton;