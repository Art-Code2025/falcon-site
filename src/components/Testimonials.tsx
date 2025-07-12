import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  nameKey: string;
  positionKey: string;
  companyKey: string;
  countryKey: string;
  rating: number;
  contentKey: string;
  image: string;
  projectKey: string;
}

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      nameKey: "reviews.testimonials.ahmed.name",
      positionKey: "reviews.testimonials.ahmed.position",
      companyKey: "reviews.testimonials.ahmed.company",
      countryKey: "reviews.testimonials.ahmed.country",
      rating: 5,
      contentKey: "reviews.testimonials.ahmed.content",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.ahmed.project"
    },
    {
      id: 2,
      nameKey: "reviews.testimonials.sarah.name",
      positionKey: "reviews.testimonials.sarah.position",
      companyKey: "reviews.testimonials.sarah.company",
      countryKey: "reviews.testimonials.sarah.country",
      rating: 5,
      contentKey: "reviews.testimonials.sarah.content",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.sarah.project"
    },
    {
      id: 3,
      nameKey: "reviews.testimonials.mohammed.name",
      positionKey: "reviews.testimonials.mohammed.position",
      companyKey: "reviews.testimonials.mohammed.company",
      countryKey: "reviews.testimonials.mohammed.country",
      rating: 5,
      contentKey: "reviews.testimonials.mohammed.content",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.mohammed.project"
    },
    {
      id: 4,
      nameKey: "reviews.testimonials.lisa.name",
      positionKey: "reviews.testimonials.lisa.position",
      companyKey: "reviews.testimonials.lisa.company",
      countryKey: "reviews.testimonials.lisa.country",
      rating: 5,
      contentKey: "reviews.testimonials.lisa.content",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.lisa.project"
    },
    {
      id: 5,
      nameKey: "reviews.testimonials.rajesh.name",
      positionKey: "reviews.testimonials.rajesh.position",
      companyKey: "reviews.testimonials.rajesh.company",
      countryKey: "reviews.testimonials.rajesh.country",
      rating: 5,
      contentKey: "reviews.testimonials.rajesh.content",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.rajesh.project"
    },
    {
      id: 6,
      nameKey: "reviews.testimonials.emma.name",
      positionKey: "reviews.testimonials.emma.position",
      companyKey: "reviews.testimonials.emma.company",
      countryKey: "reviews.testimonials.emma.country",
      rating: 5,
      contentKey: "reviews.testimonials.emma.content",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fit=crop",
      projectKey: "reviews.testimonials.emma.project"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Quote className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {t('navigation.reviews')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('reviews.description')}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full translate-y-12 -translate-x-12 opacity-50" />
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-green-50 rounded-full -translate-x-8 -translate-y-8 opacity-30" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="text-center mb-8">
                <Quote className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{t(currentTestimonial.contentKey)}"
                </blockquote>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">
                    {t(currentTestimonial.nameKey)}
                  </h4>
                  <p className="text-blue-600 font-medium mb-1">
                    {t(currentTestimonial.positionKey)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t(currentTestimonial.companyKey)} • {t(currentTestimonial.countryKey)}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div className="text-center">
                <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {t('reviews.project')}: {t(currentTestimonial.projectKey)}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">5.0</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 