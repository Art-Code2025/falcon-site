import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Star, Award, Users, TrendingUp, Building, Package, ShoppingBag } from 'lucide-react';

interface PortfolioItem {
  id: number;
  titleKey: string;
  category: string;
  descriptionKey: string;
  image: string;
  stats: {
    clients: number;
    revenue: string;
    satisfaction: number;
    duration: string;
  };
  featuresKey: string;
  technologiesKey: string;
  resultsKey: string;
}

const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to safely get translation
  const safeTranslate = (key: string, fallback: string = '') => {
    try {
      const translation = t(key);
      return translation === key ? fallback : translation;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return fallback;
    }
  };

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      titleKey: "portfolio.items.furnitureTrading.title",
      category: "furniture",
      descriptionKey: "portfolio.items.furnitureTrading.description",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&fit=crop",
      stats: {
        clients: 150,
        revenue: "$2.5M",
        satisfaction: 98,
        duration: "2018-2024"
      },
      featuresKey: "portfolio.items.furnitureTrading.features",
      technologiesKey: "portfolio.items.furnitureTrading.technologies",
      resultsKey: "portfolio.items.furnitureTrading.results"
    },
    {
      id: 2,
      titleKey: "portfolio.items.buildingMaterials.title",
      category: "building",
      descriptionKey: "portfolio.items.buildingMaterials.description",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&fit=crop",
      stats: {
        clients: 200,
        revenue: "$4.2M",
        satisfaction: 96,
        duration: "2019-2024"
      },
      featuresKey: "portfolio.items.buildingMaterials.features",
      technologiesKey: "portfolio.items.buildingMaterials.technologies",
      resultsKey: "portfolio.items.buildingMaterials.results"
    },
    {
      id: 3,
      titleKey: "portfolio.items.cosmetics.title",
      category: "cosmetics",
      descriptionKey: "portfolio.items.cosmetics.description",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fit=crop",
      stats: {
        clients: 120,
        revenue: "$3.8M",
        satisfaction: 97,
        duration: "2020-2024"
      },
      featuresKey: "portfolio.items.cosmetics.features",
      technologiesKey: "portfolio.items.cosmetics.technologies",
      resultsKey: "portfolio.items.cosmetics.results"
    },
    {
      id: 4,
      titleKey: "portfolio.items.luxuryFurniture.title",
      category: "furniture",
      descriptionKey: "portfolio.items.luxuryFurniture.description",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&fit=crop",
      stats: {
        clients: 80,
        revenue: "$1.8M",
        satisfaction: 99,
        duration: "2021-2024"
      },
      featuresKey: "portfolio.items.luxuryFurniture.features",
      technologiesKey: "portfolio.items.luxuryFurniture.technologies",
      resultsKey: "portfolio.items.luxuryFurniture.results"
    },
    {
      id: 5,
      titleKey: "portfolio.items.industrialBuilding.title",
      category: "building",
      descriptionKey: "portfolio.items.industrialBuilding.description",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&fit=crop",
      stats: {
        clients: 75,
        revenue: "$2.1M",
        satisfaction: 95,
        duration: "2022-2024"
      },
      featuresKey: "portfolio.items.industrialBuilding.features",
      technologiesKey: "portfolio.items.industrialBuilding.technologies",
      resultsKey: "portfolio.items.industrialBuilding.results"
    },
    {
      id: 6,
      titleKey: "portfolio.items.organicBeauty.title",
      category: "cosmetics",
      descriptionKey: "portfolio.items.organicBeauty.description",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&fit=crop",
      stats: {
        clients: 95,
        revenue: "$1.5M",
        satisfaction: 98,
        duration: "2023-2024"
      },
      featuresKey: "portfolio.items.organicBeauty.features",
      technologiesKey: "portfolio.items.organicBeauty.technologies",
      resultsKey: "portfolio.items.organicBeauty.results"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'furniture':
        return <Building className="w-6 h-6" />;
      case 'building':
        return <Package className="w-6 h-6" />;
      case 'cosmetics':
        return <ShoppingBag className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white fade-in-up-obs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {safeTranslate('navigation.portfolio', 'Portfolio')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {safeTranslate('portfolio.description', 'Discover our successful trading projects and partnerships')}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">720+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">$15M+</div>
            <div className="text-sm text-gray-600">Revenue Generated</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">97%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Countries Served</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: safeTranslate('portfolio.filters.all', 'All Projects') },
            { key: 'furniture', label: safeTranslate('portfolio.filters.furniture', 'Furniture') },
            { key: 'building', label: safeTranslate('portfolio.filters.building', 'Building Materials') },
            { key: 'cosmetics', label: safeTranslate('portfolio.filters.cosmetics', 'Cosmetics') }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {getCategoryIcon(filter.key)}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  {getCategoryIcon(item.category)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {safeTranslate(item.titleKey, 'Project Title')}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {safeTranslate(item.descriptionKey, 'Project description')}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{item.stats.clients}+</div>
                    <div className="text-sm text-gray-500">{safeTranslate('portfolio.stats.clients', 'Clients')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{item.stats.revenue}</div>
                    <div className="text-sm text-gray-500">{safeTranslate('portfolio.stats.revenue', 'Revenue')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{item.stats.satisfaction}%</div>
                    <div className="text-sm text-gray-500">{safeTranslate('portfolio.stats.satisfaction', 'Satisfaction')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{item.stats.duration}</div>
                    <div className="text-sm text-gray-500">{safeTranslate('portfolio.stats.duration', 'Duration')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {safeTranslate('portfolio.cta.title', 'Ready to Start Your Project?')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {safeTranslate('portfolio.cta.description', 'Let\'s discuss how we can help you achieve your trading goals with our proven expertise and global network.')}
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300" onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              {safeTranslate('portfolio.cta.button', 'Get Started Today')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {t(selectedItem.titleKey)}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image */}
              <div className="mb-8">
                <img
                  src={selectedItem.image}
                  alt={t(selectedItem.titleKey)}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('portfolio.modal.features')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t(selectedItem.descriptionKey)}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('portfolio.modal.features')}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(t(selectedItem.featuresKey, { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('portfolio.modal.technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(t(selectedItem.technologiesKey, { returnObjects: true }) as string[]).map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('portfolio.modal.results')}
                </h3>
                <ul className="space-y-3">
                  {(t(selectedItem.resultsKey, { returnObjects: true }) as string[]).map((result: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{selectedItem.stats.clients}+</div>
                  <div className="text-sm text-gray-600">{t('portfolio.stats.clients')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{selectedItem.stats.revenue}</div>
                  <div className="text-sm text-gray-600">{t('portfolio.stats.revenue')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{selectedItem.stats.satisfaction}%</div>
                  <div className="text-sm text-gray-600">{t('portfolio.stats.satisfaction')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{selectedItem.stats.duration}</div>
                  <div className="text-sm text-gray-600">{t('portfolio.stats.duration')}</div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  {t('portfolio.modal.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio; 