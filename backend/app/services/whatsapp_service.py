# from twilio.rest import Client

# ACCOUNT_SID = ""
# AUTH_TOKEN = ""

# client = Client(
#     ACCOUNT_SID,
#     AUTH_TOKEN
# )


# def send_recovery_message(
#     phone,
#     amount,
#     recovery_link
# ):

#     message = client.messages.create(
#         from_="whatsapp:+14155238886",
#         body=f"""
# RevenuePilot Alert

# Failed Payment Detected

# Amount: ₹{amount}

# Complete Payment:
# {recovery_link}

# Thank you.
# """,
#         to=f"whatsapp:{phone}"
#     )

#     return message.sid

def send_recovery_message(
    phone,
    amount,
    recovery_link
):

    print("\n========== WHATSAPP RECOVERY ==========")
    print("PHONE:", phone)
    print("AMOUNT:", amount)
    print("LINK:", recovery_link)
    print("======================================\n")

    return "DEMO_SUCCESS"