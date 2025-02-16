import { useEffect } from "react";
import { SignInButton, useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const {isSignedIn} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
      if (isSignedIn) {
          navigate("/home");  // Redirect after signing in
      }
  }, [isSignedIn, navigate]);
  return (
    <div >
        <header className='h-[6rem] bg-blue-300 relative'>
            <SignInButton fallbackRedirectUrl='/home' forceRedirectUrl='/home' >
                <button className="absolute right-4 rounded-lg top-4 p-4 bg-black text-white"> Sign In </button>
            </SignInButton>
        </header>
        
    </div>
  )
}

export default Dashboard