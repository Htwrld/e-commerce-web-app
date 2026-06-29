export type OrderItem = {
    name: string
    qty: number
    selectedColor: string
    selectedSize: string
    price: string
}

export type OrderEmailData = {
    customerName: string
    customerEmail: string
    customerPhone: string
    customerAddress: string
    location: string
    items: OrderItem[]
    subtotal: number
    deliveryFee: number
    total: number
}

const base = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTW Email</title>
</head>
<body style="margin:0;padding:0;background:#F7F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EE;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1612;border-radius:14px 14px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;color:#C9923A;font-weight:700;text-transform:uppercase;">HTW Collection</p>
              <h1 style="margin:0;font-size:28px;font-weight:300;color:#FFFFF9;letter-spacing:0.04em;">House The Wear</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFF9;padding:40px;border-left:1px solid #E4D8C4;border-right:1px solid #E4D8C4;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1A1612;border-radius:0 0 14px 14px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#7A6E67;">© ${new Date().getFullYear()} HTW Collection. All rights reserved.</p>
              <p style="margin:0;font-size:12px;color:#7A6E67;">Lagos, Nigeria &nbsp;·&nbsp; <a href="mailto:info@htw.com" style="color:#C9923A;text-decoration:none;">info@htw.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export function orderNotificationTemplate(order: OrderEmailData): string {
    const itemRows = order.items
        .map(
            (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#FDF8F2" : "#FFFFF9"};">
        <td style="padding:12px 14px;font-size:13px;color:#1A1612;font-weight:600;">${item.name}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.qty}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.selectedColor || "—"}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.selectedSize || "—"}</td>
        <td style="padding:12px 14px;font-size:13px;color:#C94A2A;font-weight:700;text-align:right;">₦${Number(item.price.replace(/[^\d]/g, "")).toLocaleString()}</td>
      </tr>`
        )
        .join("")

    const content = `
    <div style="border-left:4px solid #C9923A;padding-left:16px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">New Order</p>
      <h2 style="margin:0;font-size:24px;font-weight:600;color:#1A1612;">Order Received</h2>
    </div>

    <p style="font-size:14px;color:#7A6E67;margin:0 0 28px;">A new order has been placed. Please review the details below and confirm via WhatsApp.</p>

    <!-- Customer Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#FDF8F2;border:1px solid #E4D8C4;border-radius:10px;padding:20px 24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Customer Details</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;width:130px;">Full Name</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerName}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Email</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerEmail}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Phone</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerPhone}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Delivery Address</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerAddress}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Location</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.location}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Order Items -->
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Order Items</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E4D8C4;border-radius:10px;overflow:hidden;margin-bottom:20px;">
      <thead>
        <tr style="background:#1A1612;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Item</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Qty</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Color</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Size</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="60%"></td>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;font-size:13px;color:#7A6E67;">Subtotal</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;text-align:right;">₦${order.subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:13px;color:#7A6E67;">Delivery</td>
              <td style="padding:5px 0;font-size:13px;color:#3B7A57;font-weight:600;text-align:right;">₦${order.deliveryFee.toLocaleString()}</td>
            </tr>
            <tr style="border-top:2px solid #E4D8C4;">
              <td style="padding:10px 0 0;font-size:15px;color:#1A1612;font-weight:700;">Total</td>
              <td style="padding:10px 0 0;font-size:16px;color:#C94A2A;font-weight:700;text-align:right;">₦${order.total.toLocaleString()}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:13px;color:#7A6E67;padding:14px 18px;background:#FDF0DC;border-radius:8px;border-left:3px solid #C9923A;">
      Reply to this email or reach out on WhatsApp to confirm this order with the customer.
    </p>
  `

    return base(content)
}

export function orderConfirmationTemplate(order: OrderEmailData): string {
    const itemRows = order.items
        .map(
            (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#FDF8F2" : "#FFFFF9"};">
        <td style="padding:12px 14px;font-size:13px;color:#1A1612;font-weight:600;">${item.name}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.qty}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.selectedColor || "—"}</td>
        <td style="padding:12px 14px;font-size:13px;color:#7A6E67;text-align:center;">${item.selectedSize || "—"}</td>
        <td style="padding:12px 14px;font-size:13px;color:#C94A2A;font-weight:700;text-align:right;">₦${Number(item.price.replace(/[^\d]/g, "")).toLocaleString()}</td>
      </tr>`
        )
        .join("")

    const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:52px;margin-bottom:12px;">🎉</div>
      <h2 style="margin:0 0 8px;font-size:26px;font-weight:600;color:#1A1612;">Thank you, ${order.customerName}!</h2>
      <p style="margin:0;font-size:15px;color:#7A6E67;">Your order has been received and is being processed.</p>
    </div>

    <!-- What's Next -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#FDF0DC;border:1px solid #E4D8C4;border-radius:10px;padding:20px 24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">What Happens Next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;vertical-align:top;width:28px;">
                <div style="width:22px;height:22px;border-radius:50%;background:#C9923A;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</div>
              </td>
              <td style="padding:6px 0;font-size:13px;color:#1A1612;">We'll review your order and payment confirmation.</td>
            </tr>
            <tr>
              <td style="padding:6px 0;vertical-align:top;">
                <div style="width:22px;height:22px;border-radius:50%;background:#C9923A;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</div>
              </td>
              <td style="padding:6px 0;font-size:13px;color:#1A1612;">Send your payment receipt to our WhatsApp for verification.</td>
            </tr>
            <tr>
              <td style="padding:6px 0;vertical-align:top;">
                <div style="width:22px;height:22px;border-radius:50%;background:#C9923A;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</div>
              </td>
              <td style="padding:6px 0;font-size:13px;color:#1A1612;">Tracking details will be sent to you within <strong>24 hours</strong>.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Delivery Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#FDF8F2;border:1px solid #E4D8C4;border-radius:10px;padding:20px 24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Delivery Details</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;font-size:12px;color:#7A6E67;width:130px;">Address</td>
              <td style="padding:4px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerAddress}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-size:12px;color:#7A6E67;">Location</td>
              <td style="padding:4px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.location}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-size:12px;color:#7A6E67;">Phone</td>
              <td style="padding:4px 0;font-size:13px;color:#1A1612;font-weight:600;">${order.customerPhone}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Order Items -->
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Your Items</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E4D8C4;border-radius:10px;overflow:hidden;margin-bottom:20px;">
      <thead>
        <tr style="background:#1A1612;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Item</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Qty</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Color</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Size</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td width="55%"></td>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;font-size:13px;color:#7A6E67;">Subtotal</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;text-align:right;">₦${order.subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:13px;color:#7A6E67;">Delivery</td>
              <td style="padding:5px 0;font-size:13px;color:#3B7A57;font-weight:600;text-align:right;">₦${order.deliveryFee.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:10px 0 0;border-top:2px solid #E4D8C4;font-size:15px;color:#1A1612;font-weight:700;">Total</td>
              <td style="padding:10px 0 0;border-top:2px solid #E4D8C4;font-size:16px;color:#C94A2A;font-weight:700;text-align:right;">₦${order.total.toLocaleString()}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0;text-align:center;font-size:13px;color:#7A6E67;">Questions? Reach us on WhatsApp — we typically respond within minutes.</p>
  `

    return base(content)
}

export type ContactEmailData = {
    senderName: string
    senderEmail: string
    subject: string
    message: string
}

export function contactFormTemplate(data: ContactEmailData): string {
    const content = `
    <div style="border-left:4px solid #C9923A;padding-left:16px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;color:#C9923A;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Contact Form</p>
      <h2 style="margin:0;font-size:24px;font-weight:600;color:#1A1612;">New Message</h2>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#FDF8F2;border:1px solid #E4D8C4;border-radius:10px;padding:20px 24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Sender</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;width:90px;">Name</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${data.senderName}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Email</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">
                <a href="mailto:${data.senderEmail}" style="color:#1C4F8A;text-decoration:none;">${data.senderEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:12px;color:#7A6E67;">Subject</td>
              <td style="padding:5px 0;font-size:13px;color:#1A1612;font-weight:600;">${data.subject}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#C9923A;text-transform:uppercase;">Message</p>
    <div style="background:#FDF8F2;border:1px solid #E4D8C4;border-radius:10px;padding:20px 24px;font-size:14px;color:#1A1612;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
  `

    return base(content)
}
