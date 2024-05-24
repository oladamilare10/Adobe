import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Footer from '../components/Footer';
import FormContainer from '../components/FormContainer';
import List from '../components/List';
import Logo from '../components/Logo';
import SubHeader from '../components/SubHeader';
import { background } from '../constants/constant';
import { useParams } from 'react-router-dom';
import Notification from '../components/Notification';

const Home = () => {
    const urlParams = useParams();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [passShow, setPassShow] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
  
    let [backRand, setBackRand] = useState(null)

    
    setTimeout(()=> {
        if (urlParams.id) {
            setUserName(urlParams.id)
        }
    },400)
    
    useEffect(()=> {
      const random = Math.floor(Math.random() * background.length);
      setBackRand(random);
    }, [])

    const handleNotification = ()=> {
        setTimeout(()=> {
            setShowNotification(false);
        }, 5000);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(()=> {
        console.log('submitted')
        setIsLoading(false);
        setShowNotification(true);
        handleNotification();
      }, 4000)
    }
  
    const checkUser = ()=> {
      setIsLoading(true);
      setTimeout(() => {
        if (username === '') {
          setError(true)
          setIsLoading(false)
          setPassShow(false)
        } else {
          setError(false)
          setIsLoading(false)
          setPassShow(true)
        }
      }, 2000);
      
    }
  
    return (
      <>
        {backRand && 
        <Background backgroundImg={background[backRand]}>
          <SubHeader />
          {showNotification &&
          <Notification title="Notification">
            Your Request has been successfully sent...
          </Notification>}
          <div className='flex w-[100%] h-[100%] justify-around'>
            <div className='w-0 xl:min-w-[610px]'>
              <Logo 
                imgSize={52} 
                mainClass='hidden xl:flex mt-[17rem] ml-[32%]'
                textClass='py-[0.3rem] ml-2 text-[28px] text-stone-200' 
              />
              <List />
            </div>
            <FormContainer error={error} handleSubmit={handleSubmit} passShow={passShow} isLoading={isLoading} checkUser={checkUser} username={username} password={password} setUserName={setUserName} setPassword={setPassword} />
          </div>
          <Footer />
        </Background>}
      </>
    )
  }

export default Home
