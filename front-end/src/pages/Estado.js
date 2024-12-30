import React, { useState, useEffect, useRef } from 'react';
const Estado = () => {

    
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Estado, comparisonFn);