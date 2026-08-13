import React from "react";
import QuickOverviewCards from "./QuickOverviewCards";
import { Star } from "lucide-react";
import { getCustomerReviews } from "../_actions/getCustomerReviews";
import { TReview } from "@/lib/types/modules/review/review.types";

const ReviewsQuickOverview = async () => {
  const reviews: TReview[] = await getCustomerReviews();

  return (
    <QuickOverviewCards
      title="Reviews Given"
      count={reviews.length}
      icon={Star}
      subtitile="Your feedback on completed services"
    />
  );
};

export default ReviewsQuickOverview;
