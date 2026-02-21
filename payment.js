function payWithPaystack(amount, email, planName) {
    // 10/10 Industrial Logic: Amount is in kobo (NGN * 100)
    const handler = PaystackPop.setup({
        key: 'pk_live_YOUR_PUBLIC_KEY', // Replace with your Live Public Key
        email: email,
        amount: amount * 100,
        currency: "NGN",
        ref: 'SOV-' + Math.floor((Math.random() * 1000000000) + 1), 
        metadata: {
            custom_fields: [{ display_name: "Project", variable_name: "project", value: planName }]
        },
        callback: function(response) {
            alert('Sovereign Transaction Verified. Reference: ' + response.reference);
            // Redirect to a "Success" page or download the PDF
            window.location.href = "success.html";
        },
        onClose: function() {
            alert('Transaction Terminated by User.');
        }
    });
    handler.openIframe();
}

function payWithStripe(priceId) {
    // Redirect to Stripe Hosted Checkout for USD
    // Requires your Stripe Public Key
    const stripe = Stripe('pk_live_YOUR_STRIPE_KEY');
    stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: 'https://sovereign-hub.netlify.app/success.html',
        cancelUrl: 'https://sovereign-hub.netlify.app/cancel.html',
    });
}
