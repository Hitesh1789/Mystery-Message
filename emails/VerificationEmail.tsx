interface EmailTemplateProps {
    username: string;
    otp: string
}

export default function VerificationEmail({
    username, otp
}: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "450px",
                margin: "0 auto",
                padding: "24px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
            }}
        >
            <h2 style={{ marginBottom: "12px", color: "#111827" }}>
                Welcome, {username}! 👋
            </h2>

            <p style={{ color: "#4b5563", marginBottom: "20px" }}>
                Thank you for signing up for <strong>Mystery Message</strong>. Use the
                verification code below to verify your email.
            </p>

            <div
                style={{
                    background: "#f3f4f6",
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        letterSpacing: "6px",
                        color: "#2563eb",
                    }}
                >
                    {otp}
                </h1>
            </div>
        </div>
    );
}