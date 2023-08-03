
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import { useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { expiredToken } from '../utils/auth';
import { useSubmit,useLoaderData } from 'react-router-dom';

function RootLayout() {
  const navigation = useNavigation();

  const token=useLoaderData()
  const submit=useSubmit()


  useEffect(() => {
    if(!token){
      return
    }
    if(token==='EXPIRED'){
      submit(null,{action:'/logout',method:'post'})
      return
    }
    const tokentime=expiredToken()
    console.log(tokentime)
    setTimeout(() => {
      submit(null,{action:'/logout',method:'post'})
    },tokentime)
  },[token,submit])

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
