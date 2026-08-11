import React from 'react';
import PageBanner from '../_components/PageBanner';
import { getTechnicians } from '../_actions/getTechnicians';
import Technicians from '../_components/Technicians';
import { getReviews } from '../_actions/getReviews';
import Testimonial from '../_components/Testimonials';

const TechniciansPage = async () => {
    const technicians = await getTechnicians()
    const reviews = await getReviews()
    return (
      <div>
        <PageBanner title="Technicians" />
        <Technicians technicians={technicians} className="py-20 lg:py-24" />
        <Testimonial reviews={reviews} className='pb-20 lg:pb-24' />
      </div>
    );
};

export default TechniciansPage;