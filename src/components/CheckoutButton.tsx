'use client';

export default function CheckoutButton({ priceId }: { priceId: string }) {
  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.origin + '/canceled',
      }),
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
    >
      Subscribe Now
    </button>
  );
}
