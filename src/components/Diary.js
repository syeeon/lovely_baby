import React, { useState } from 'react';
// import Button from '@mui/material/Button';



function Diary() {
var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var dairyDate = year + '년 ' + month + '월'


    return(
      <div>
        <h1>{dairyDate}</h1>
      </div>
    )

}

export default Diary;