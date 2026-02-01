import { useState } from "react";
import { Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface Activity {
    name: string,
    slots: TimeSlot[];
}

interface Tour {
    id: string;
    name: string;
    hours: string;
    location: string;
    price: string;
    images: string[];
    activities: Activity[];
}

interface TourCardProps {
    tour: Tour;
    onBookSlot: (tourId: string, activity: string, time: string) => void;
    onCardClick: (tourId: string) => void;
}

export function TourCard({ tour, onBookSlot, onCardClick }: TourCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
    };

    const toggleExpanded = (activityName: string) => {
        setExpandedActivities((prev) => ({
            ...prev,
            [activityName]: !prev[activityName],
        }));
    };

    const getVisibleSlots = (activity: Activity) => {
        const isExpanded = expandedActivities[activity.name];
        const availableSlots = activity.slots.filter(s => s.available);

        if (availableSlots.length === 0) {
            return { slots: [], hasMore: false, showUnavailable: true };
        }

        if (isExpanded) {
            return { slots: availableSlots, hasMore: false, showUnavailable: false };
        }

        const visibleCount = 2;
        return {
            slots: availableSlots.slice(0, visibleCount),
            hasMore: availableSlots.length > visibleCount,
            showUnavailable: false,
        };
    };

    return (
        <div className="flex flex-col gap-[16px] w-[333px]">
            {/* Image Carousel */}
            <div
                className="relative h-[189px] rounded-[16px] overflow-hidden cursor-pointer"
                onClick={() => onCardClick(tour.id)}
            >
                <img
                    src={tour.images[currentImageIndex]}
                    alt={tour.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Carousel Controls */}
                <div className="absolute inset-0 flex items-end justify-between px-[16px] py-[12px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="bg-white rounded-[40px] p-[8px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.16)] hover:bg-gray-50 transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="size-[16px] text-[#131313]" />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-[4px]">
                        {tour.images.map((_, index) => (
                            <div
                                key={index}
                                className={`size-[6px] rounded-full transition-opacity ${index === currentImageIndex ? 'bg-white opacity-100' : 'bg-white opacity-40'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="bg-white rounded-[40px] p-[8px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.16)] hover:bg-gray-50 transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="size-[16px] text-[#131313]" />
                    </button>
                </div>
            </div>

            {/* Card Content */}
            <div className="bg-white flex flex-col gap-[16px]">
                {/* Tour Info */}
                <div className="flex flex-col gap-[8px]">
                    <h3 className="font-extrabold text-[20px] text-[#1b1b1b] leading-normal" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {tour.name}
                    </h3>
                    <div className="flex flex-col">
                        <div className="flex gap-[6px] items-center text-[#667085] text-[12px]">
                            <Clock className="size-[14px]" />
                            <span className="leading-[18px]">{tour.hours}</span>
                        </div>
                        <div className="flex gap-[6px] items-center text-[#667085] text-[12px]">
                            <MapPin className="size-[14px]" />
                            <span className="leading-[18px] truncate">{tour.location}</span>
                        </div>
                    </div>
                </div>

                {/* Activities */}
                {tour.activities.map((activity) => {
                    const { slots, hasMore, showUnavailable } = getVisibleSlots(activity);

                    return (
                        <div key={activity.name} className="flex flex-col gap-[10px]">
                            <div className="font-medium text-[14px] text-[#1b1b1b]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                                {activity.name}
                            </div>

                            {showUnavailable ? (
                                <div className="bg-[#fff1f3] rounded-[4px] px-[8px] py-[2px] flex items-center w-full">
                                    <p className="font-medium text-[12px] text-[#c01048] leading-[18px]">
                                        No free spots available!
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-[4px] items-center">
                                    {slots.map((slot, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onBookSlot(tour.id, activity.name, slot.time)}
                                            className="bg-[#f2f4f7] hover:bg-[#e4e7eb] transition-colors rounded-[4px] px-[8px] py-[2px] font-medium text-[12px] text-[#344054] leading-[18px]"
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                    {hasMore && (
                                        <button
                                            onClick={() => toggleExpanded(activity.name)}
                                            className="bg-[#f2f4f7] hover:bg-[#e4e7eb] transition-colors rounded-[4px] px-[8px] py-[2px] font-medium text-[12px] text-[#344054] leading-[18px]"
                                        >
                                            More
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}