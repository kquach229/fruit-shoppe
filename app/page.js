import Stripe from 'stripe';
import ProductCard from './ProductCard';

const getStripeProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27',
  });

  const res = await stripe.prices.list({
    expand: ['data.product'],
  });

  const prices = res.data;

  return prices;
};

export default async function Home() {
  const products = await getStripeProducts();
  return (
    <main className='p-4 flex flex-col'>
      <div className='max-w-[1000px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </main>
  );
}
