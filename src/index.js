import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function ErrorBox({ children }) {
  return (
  <div className='alert alert-danger error-box'> {/* alert and alert-danger are 
  BootStrap specific classes */}
      <span className='icon'>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </span>
      {children}
    </div>
  );
}

function FirstChildOnly({ children }) {
  let firstChild = React.Children.toArray(children).slice(0, 1); /* converts
    children into an array (just in case there's only one). If you know for
    certain there's more than one child, you can simply call children[0] */
  return (
    <div className='first-child'>
      The first child's name is {firstChild}.
    </div>
  );
}

function LastChildOnly({ children }) {
  let lastIndex = React.Children.count(children) -1;
  let lastChild = children[lastIndex];
  return (
    <div className='last-child'>The last child's name is {lastChild}.</div>
  )
}

function Tail({ children, number }) {
// Return last N children:
  let childArr = React.Children.toArray(children)
  let nChildren = '';
  let plural = number > 1;
  for (let i = childArr.length - number; i < childArr.length; i++) {
    // final child:
    if (i === childArr.length - 1) {
      // if multiple children, concat 'and' before the final child: 
      nChildren = nChildren + (plural ? ' and ' : '') + childArr[i];
    // all other children:
    } else { 
      // skip comma if exactly two children:
      nChildren = nChildren + childArr[i] + (number === 2 ? ' ' : ', ');
    }
    
  }
  return (
    <div className='last-n-children'>
      The last{' '} 
        {plural ? number: ''}{' '}
        {plural ? 'children': 'child'}{' '}
        {plural ? 'are': 'is'}{' '}
        {nChildren}.
    </div>
  );
}

let childOne = 'Mary';
let childTwo = 'Potato';
let childThree = 'John';
let childFour = 'Edward';
let childFive = 'Jacob';

function RenderAll() {
  return (
    <div>
      <ErrorBox>
        Something catastrophic occurred!
      </ErrorBox>
      <br/><br/>
      <FirstChildOnly>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </FirstChildOnly>
      <br/>
      <LastChildOnly>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </LastChildOnly>
      <br/>
      <Tail number={3}>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </Tail>
    </div>
  );
}

ReactDOM.render(<RenderAll/>, document.querySelector('#root')
);