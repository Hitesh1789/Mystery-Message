interface EmailTemplateProps {
    username: string;
    otp:string
}

export default function VerificationEmail({
    username, otp
} : EmailTemplateProps ) {
    return (
        <div>
            <h1>Welcome, {username}</h1>
            <br/>
            <h2>Your Verify Code: {otp}</h2>
        </div> 
    );
}