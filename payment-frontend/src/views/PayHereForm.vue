<template>
  <div class="payment-form">
    <h2>PayHere Sandbox Payment</h2>
    <form @submit.prevent="submitPayment">
      <div>
        <label>Amount:</label>
        <input type="number" v-model="amount" required />
      </div>
      <div>
        <label>Card Number:</label>
        <input type="text" v-model="cardNumber" required />
      </div>
      <div>
        <label>Expiry (MM/YY):</label>
        <input type="text" v-model="expiry" placeholder="MM/YY" required />
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" v-model="cvv" required />
      </div>
      <button type="submit">Pay</button>
    </form>

    <div v-if="response" class="response">
      <h3>Payment Status:</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PayHereForm",
  data() {
    return {
      amount: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      response: null,
    };
  },
  methods: {
    async submitPayment() {
      try {
        const res = await axios.post("http://localhost:5000/api/payment/pay", {
          amount: this.amount,
          cardNumber: this.cardNumber,
          expiry: this.expiry,
          cvv: this.cvv,
        });

        this.response = res.data;
      } catch (err) {
        this.response = {
          status: "ERROR",
          message: err.response?.data?.message || err.message,
        };
      }
    },
  },
};
</script>

<style scoped>
.payment-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.payment-form h2 {
  text-align: center;
}

.payment-form div {
  margin-bottom: 15px;
}

.payment-form label {
  display: block;
  margin-bottom: 5px;
}

.payment-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.payment-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.payment-form button:hover {
  background-color: #0056b3;
}

.response {
  margin-top: 20px;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 5px;
}
</style>