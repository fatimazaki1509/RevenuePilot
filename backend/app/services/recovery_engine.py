def calculate_recovery_score(event):

    score = 50

    # Failure Reason Analysis
    if event.failure_reason == "UPI Timeout":
        score += 25

    elif event.failure_reason == "Card Declined":
        score += 15

    # Amount Analysis
    if event.amount < 5000:
        score += 15

    elif event.amount < 20000:
        score += 10

    # Status Analysis
    if event.status == "pending":
        score += 10

    return min(score, 100)


def recommend_channel(event):

    if event.failure_reason == "UPI Timeout":
        return "WhatsApp"

    if event.failure_reason == "Card Declined":
        return "Email"

    if event.amount > 20000:
        return "Voice Call"

    return "WhatsApp"


def root_cause_analysis(event):

    if event.failure_reason == "UPI Timeout":
        return {
            "root_cause":
            "Bank response timeout",

            "impact":
            "Customer likely abandoned payment during checkout",

            "action":
            "Send WhatsApp retry link immediately"
        }

    if event.failure_reason == "Card Declined":
        return {
            "root_cause":
            "Card authorization failure",

            "impact":
            "Payment could not be processed by issuing bank",

            "action":
            "Send Email recovery link"
        }

    return {
        "root_cause":
        "Unknown payment failure",

        "impact":
        "Revenue remains at risk",

        "action":
        "Escalate for manual intervention"
    }