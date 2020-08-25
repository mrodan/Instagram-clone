import React from 'react';

// param: props.match.params.parName -> parName in url
const param = (props) => {
    const { params } = props.match
    console.log(props)
    return ( 
    <h1>{params.par}</h1>
        );
}
 
export default param;