import React from 'react';
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

let childOne = 'Mary';
let childTwo = 'Potato';
let childThree = 'John';
let childFour = 'Edward';
let childFive = 'Jacob';

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

function Head({ children, number }) {
  let nChildren = React.Children.toArray(children).slice(0, number);
  let plural = number > 1;
  return (
    <div>
      The first {plural ? `${number} children are:`: 'child is:'} {nChildren}
    </div>
  );
}

function RenderAll() {
  return (
    <div>
      <h2>Exercise #1 - Make a component to display an "error box."</h2>
      <ErrorBox>
        Something catastrophic occurred!
      </ErrorBox>
      <br/>
      <h2>Exercise #2 - Practice using the React.Children.toArray function with 
        these next few exercises.</h2>
      <div>Children list: 
        <div>(1) {childOne}</div>
        <div>(2) {childTwo}</div>
        <div>(3) {childThree}</div>
        <div>(4) {childFour}</div>
        <div>(5) {childFive}</div>
      </div>
      <br/>
      <h2>Exercise #2a - Write a component called FirstChildOnly to accept any 
        number of children but only render the first.</h2>
      <FirstChildOnly>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </FirstChildOnly>
      <br/>
      <h2>Exercise #2b - Write a component called LastChildOnly that only 
        renders its last child.</h2>
      <LastChildOnly>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </LastChildOnly>
      <br/>
      <h2>Exercise #2c - Create a component named Head that takes a number prop,
        and renders the first [number] children.</h2>
      <Head number={2}>
        <div>{childOne}</div>
        <div>{childTwo}</div>
        <div>{childThree}</div>
        <div>{childFour}</div>
        <div>{childFive}</div>
      </Head>
      <br/>
      <h2>Exercise #2d - Create a component named Tail that takes a number and 
        renders the last N children.</h2>
      <Tail number={3}>
        {childOne}{childTwo}{childThree}{childFour}{childFive}
      </Tail>
    </div>
  );
}

ReactDOM.render(<RenderAll/>, document.querySelector('#root'));