// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './container/Home.jsx';
import Navbar from './component/Navbar.jsx';
import VerifyEmail from './component/VerifyEmail.jsx';
import Register from './component/Register.jsx';
import SignInn from './component/SignInn';
import ForgotPassword from './component/ForgotPassword';
import ChangePassword from './component/ChangePassword.jsx';
import UserProfile from './component/UserProfile.jsx';
import Discussion from './container/Discussion.jsx';
import ContactUs from './container/ContactUs.jsx';
import DiscussionModal from './component/DiscussionModal.jsx';
import Notfound from './component/Notfound.jsx';
import ResetPassword from './component/ResetPassword.jsx';
import CommunityGuidelines from './component/CommunityGuidelines.jsx';
// import LoadPage from './component/LoadPage.jsx';



function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/VerifyEmail" element={<VerifyEmail />} />
            <Route exact path="/Register" element={<Register />} />
            <Route path="/SignInn" element={<SignInn />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path='/Discussion' element={<Discussion/>}/>
            <Route path='/ContactUs' element={<ContactUs/>}/>
            <Route path='/DiscussionModal' element={<DiscussionModal/>}/>
            <Route path='/404' element={<Notfound />} />
            <Route path='/ResetPassword' element={<ResetPassword/>} />
            <Route path='/CommunityGuidelines' element={<CommunityGuidelines />} />
          </Routes>
        </div>
        <footer className="footer bg-DGXgreen text-DGXwhite text-center">
          <p>Copyright &copy; 2022</p>
        </footer>
      </div>
    </>
  );
}

export default App;
