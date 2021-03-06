const categories = ['Bird', 'Light', 'Dark'];
const productData = [
  {
    title: 'Barn Owl',
    image: 'barn_owl.jpg',
    categories: ['bird', 'medium'],
    price: 80.00,
  },
  {
    title: 'Hummingbird',
    image: 'hummingbird.jpg',
    categories: ['bird', 'small'],
    price: 70.00,
  },
  {
    title: 'House Sparrow',
    image: 'house_sparrow.jpg',
    categories: ['bird', 'small'],
    price: 30.00,
  },
  {
    title: 'Woodpecker',
    image: 'woodpecker.jpg',
    categories: ['bird', 'small', 'annoying'],
    price: 10.00,
  },
  {
    title: 'Wandering Albatross',
    image: 'albatross.jpg',
    categories: ['bird', 'medium'],
    price: 100.00,
  },
  {
    title: 'Columbidae',
    image: 'columbidae.jpg',
    categories: ['bird', 'small'],
    price: 10.00,
  },
  {
    title: 'Eagle',
    image: 'eagle.jpg',
    categories: ['bird', 'big'],
    price: 200.00,
  },
  {
    title: 'Cuckoo',
    image: 'cuckoo.jpg',
    categories: ['bird', 'small'],
    price: 30.00,
  },
  {
    title: 'Parrot',
    image: 'parrot.jpg',
    categories: ['bird', 'small', 'big'],
    price: 90.00,
  },
  {
    title: 'Swallow',
    image: 'swallow.jpg',
    categories: ['bird', 'small'],
    price: 110.00,
  },
  {
    title: 'Sandhill Crane',
    image: 'sandhill_crane.jpg',
    categories: ['bird', 'big'],
    price: 40.95,
  },
  {
    title: 'Peafowl',
    image: 'peafowl.jpg',
    categories: ['bird', 'big', 'fowl'],
    price: 75.00,
  },
  {
    title: 'North Cardinal',
    image: 'north_cardinal.jpg',
    categories: ['bird', 'small'],
    price: 66.00,
  },
  {
    title: 'Mallard',
    image: 'mallard.jpg',
    categories: ['bird', 'medium'],
    price: 125.00,
  },
  {
    title: 'Wild Turkey',
    image: 'wild_turkey.jpg',
    categories: ['bird', 'big', 'fowl'],
    price: 50.00,
  },
];

function Products($el, products) {
  const self = Object.create(Products);

  const createCard = ({ title, image, price }) => {
    const $card = document.createElement('div');
    const $content = document.createElement('div');
    const $image = document.createElement('img');
    const $title = document.createElement('div');
    const $price = document.createElement('div');

    $card.className = 'card';
    $content.className = 'card-content';
    $title.className = 'title';
    $price.className = 'price';
    $image.className = 'image';
    $image.src = `static/images/${image}`;
    $title.textContent = title;
    $price.textContent = `$${price}`;

    $content.appendChild($image);
    $content.appendChild($title);
    $content.appendChild($price);

    $card.appendChild($content);
    return $card;
  };

  self.render = (cb) => {
    if (typeof cb != 'function')
      cb = (x) => x;

    $el.innerHTML = '';

    cb(products).forEach((product) => {
      $card = createCard(product);
      $el.appendChild($card);
    });
  };

  self.orderByTitle = (order) => {
    self.render((products) => {
      const result = products.sort((a, b) => a.title.localeCompare(b.title));
      return (order === 'desc') ? result.reverse() : result;
    })
  };

  self.orderByPrice = (order) => {
    self.render((products) => {
      const result = products.sort((a, b) => a.price - b.price);
      return (order === 'desc') ? result.reverse() : result;
    })
  };

  self.setPriceRange = (min, max) => {
    self.render((products) => {
      return products.filter((product) => {
        return product.price >= min && product.price <= max
      });
    });
  };

  self.setCategory = (category) => {
    self.render((products) => {
      return products.filter((product) => {
        return product.categories.includes(category)
      });
    });
  };

  return self;
};


document.addEventListener('DOMContentLoaded', function(event) { 
  const byColumn = (field) => (a, b) => a[field] > b[field];
  const products = new Products(document.querySelector('.cards'), productData);
  products.render((products) => products.sort(byColumn('title')));


  const $orderBy = document.querySelector("[name='order_by']");
  const $priceRange = document.querySelector("[name='price_range']");
  const $category = document.querySelector("[name='category']");

  $orderBy.addEventListener('change', (event) => {
    $priceRange.value = '';
    $category.value = '';

    switch(event.target.value) {
      case 'desc_title': products.orderByTitle('desc'); break;
      case 'asc_price':  products.orderByPrice('asc');  break;
      case 'desc_price': products.orderByPrice('desc'); break;
      default:           products.orderByTitle('asc');  break;
    }
  });

  $priceRange.addEventListener('change', (event) => {
    $orderBy.value = '';
    $category.value = '';

    switch(event.target.value) {
      case '0_50':    products.setPriceRange(0, 50);    break;
      case '50_100':  products.setPriceRange(50, 100);  break;
      case '100_150': products.setPriceRange(100, 150); break;
      case '150_200': products.setPriceRange(150, 200); break;
      default:        products.orderByTitle('asc');     break;
    }
  });

  $category.addEventListener('change', (event) => {
    $orderBy.value = '';
    $priceRange.value = '';

    switch(event.target.value) {
      case 'bird':    products.setCategory('bird');   break;
      case 'small':   products.setCategory('small');  break;
      case 'medium':  products.setCategory('medium'); break;
      case 'big':     products.setCategory('big');    break;
      default:        products.orderByTitle('asc');   break;
    }
  });

});
