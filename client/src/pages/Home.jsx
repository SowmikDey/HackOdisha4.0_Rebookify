import { useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/Home.css';

export default function Home() {
  const navigate = useNavigate();
 


  const handleGetStarted = () => {
    navigate('/Registration'); // Replace '/Registration' with the route you want to navigate to
  };

  return (
    <div className="Intro">

      <Link to='/login' className='login-link'>Already have an account?Login</Link>
      <video autoPlay loop muted playsInline className='back-video'>
        <source src='./171942-846113545_small.mp4' type='video/mp4' />
      </video>
      <h1 className="project-name">
        WELCOME TO <br />
        ReBookify
      </h1>
      <p>Where used books find new homes.</p>
      <button onClick={handleGetStarted} className='started-button'>
        Get Started
      </button>
    </div>
  );
}
