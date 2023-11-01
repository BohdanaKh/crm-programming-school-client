import {LoginForm} from '../components';
import {useSearchParams} from 'react-router-dom';

const LoginPage = () => {
    const [query,] = useSearchParams();
    return (
        <div style={{backgroundColor: 'lightgreen', width: '100vw', height: '100vh', display:"flex", flexDirection:'column', alignItems:"center", justifyContent:"center"}}>
            {query.get('expSession')&&<h1>Session expired... please login again!!!</h1>}
            <LoginForm/>
        </div>
    );
};

export {LoginPage};