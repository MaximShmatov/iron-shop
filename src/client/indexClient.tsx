import {hydrate} from 'react-dom';
import {Layout} from './Layout';
import {ClientRouter} from './ClientRouter';
import {App} from './App';

hydrate(
  <Layout>
    <ClientRouter App={<App />}/>
  </Layout>
  , document.getElementById('root'));