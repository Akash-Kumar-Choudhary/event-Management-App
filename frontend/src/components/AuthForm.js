
import { Form,Link,useSearchParams,useActionData,useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {

  const data=useActionData()

  const [searchParams] = useSearchParams()

  const isLogin=searchParams.get('mode')==='login'

  const Navigation=useNavigation()

  const submitting=Navigation.state==='submitting'
 

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((error) => {
              return <li key={error}>{error}</li>
            })}
          </ul>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>{submitting ? 'submitting.....' : 'save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
