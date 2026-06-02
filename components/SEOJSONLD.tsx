import { coffeeProducts } from '@/data/products';

export default function SEOJSONLD() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://brewcraft.shop/#organization',
    'name': 'BrewCraft',
    'url': 'https://brewcraft.shop',
    'logo': 'https://brewcraft.shop/logo.png',
    'sameAs': [
      'https://facebook.com/brewcraft',
      'https://instagram.com/brewcraft',
      'https://twitter.com/brewcraft'
    ]
  };

  const coffeeShopSchema = {
    '@context': 'https://schema.org',
    '@type': 'CoffeeShop',
    '@id': 'https://brewcraft.shop/#coffeeshop',
    'name': 'BrewCraft',
    'image': 'https://brewcraft.shop/favicon-icon.png',
    'url': 'https://brewcraft.shop',
    'telephone': '+12125550189',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Artisan Street',
      'addressLocality': 'New York',
      'addressRegion': 'NY',
      'postalCode': '10001',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 40.7128,
      'longitude': -74.0060
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        'opens': '07:00',
        'closes': '22:00'
      }
    ],
    'menu': 'https://brewcraft.shop/#menu',
    'acceptsReservations': 'false'
  };

  const productSchemas = coffeeProducts.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://brewcraft.shop/#product-${product.id}`,
    'name': product.name,
    'image': `https://brewcraft.shop${product.image}`,
    'description': product.description,
    'brand': {
      '@type': 'Brand',
      'name': 'BrewCraft'
    },
    'offers': {
      '@type': 'Offer',
      'price': product.price.replace('$', ''),
      'priceCurrency': 'USD',
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': 'https://schema.org/InStock',
      'url': 'https://brewcraft.shop/#menu'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': product.rating.toString(),
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '28'
    }
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coffeeShopSchema) }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
