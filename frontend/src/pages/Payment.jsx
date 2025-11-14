export default function Payment() {
  return (
    <div className="page payment-page">
      <div className="page-header">
        <h1>Payment</h1>
        <p>Confirm your booking and complete your payment securely.</p>
      </div>

      <div className="payment-layout">
        {/* SUMMARY */}
        <div className="card surface">
          <h2 className="card-title">Booking Summary</h2>
          <div className="summary-row">
            <span>Room</span>
            <strong>Yoga Room</strong>
          </div>
          <div className="summary-row">
            <span>Date</span>
            <strong>2025-11-15</strong>
          </div>
          <div className="summary-row">
            <span>Time</span>
            <strong>09:00 - 10:00</strong>
          </div>
          <div className="summary-row">
            <span>Trainer</span>
            <strong>—</strong>
          </div>

          <hr className="divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>฿800</strong>
          </div>
          <div className="summary-row">
            <span>Platform fee</span>
            <strong>฿40</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>฿840</strong>
          </div>
        </div>

        {/* METHOD */}
        <div className="card surface">
          <h2 className="card-title">Payment Method</h2>

          <div className="method-list">
            <label className="method-item">
              <input type="radio" name="method" defaultChecked />
              <span className="method-body">
                <span className="method-title">Credit / Debit Card</span>
                <span className="method-sub">VISA, MasterCard, AMEX</span>
              </span>
            </label>

            <label className="method-item">
              <input type="radio" name="method" />
              <span className="method-body">
                <span className="method-title">PromptPay / QR</span>
                <span className="method-sub">Scan &amp; pay with banking apps</span>
              </span>
            </label>

            <label className="method-item">
              <input type="radio" name="method" />
              <span className="method-body">
                <span className="method-title">Wallet</span>
                <span className="method-sub">Use your FitQuery wallet balance</span>
              </span>
            </label>
          </div>

          <button type="button" className="btn submit">
            Pay now
          </button>

          <p className="payment-note">
            * Demo UI only. No real payment will be processed.
          </p>
        </div>
      </div>
    </div>
  )
}
