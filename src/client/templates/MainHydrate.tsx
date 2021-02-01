import * as React from 'react';
import {hydrate} from 'react-dom';
import Index from '../pages/Index';

hydrate(<Index/>, document.getElementById('root'));