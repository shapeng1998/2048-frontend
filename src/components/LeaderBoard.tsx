import React, { useEffect, useRef,useState } from 'react';
import io from 'socket.io-client'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import calcTime from '../utils/calcTime'


function createData(name: string, score: string) {
  return {name, score};
}


var rows = [createData('','')];

 
function LeaderBoard()
{
  const [remainingTime, setRemainingTime] = useState('')
  

  const req = axios.get("http://47.101.139.249:3000/api/players/top5")
  .then(response=> (
    rows=[
      createData(response.data[0]['nickname'],response.data[0]['score']),
      createData(response.data[1]['nickname'],response.data[1]['score']),
      createData(response.data[2]['nickname'],response.data[2]['score']),
      createData(response.data[3]['nickname'],response.data[3]['score']),
      createData(response.data[4]['nickname'],response.data[4]['score']),
    ]

  ));
  console.log(req)


  setTimeout(() => {
    if(1000) {
      const formattedTime = calcTime(1000)
      setRemainingTime(formattedTime)
    }
  }, 1000)


  console.log(rows)


  return(
    <TableContainer component={Paper}>
      <Table  size="medium">
        <TableHead >
          <TableRow>
            <TableCell align="center"  >NickName</TableCell>
            <TableCell align="center" style={{ minWidth: 100 }}>Score</TableCell>
          </TableRow>
        </TableHead>

        

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" style={{ overflow: 'hidden', minWidth: 200 , maxWidth: 250,textOverflow: 'ellipsis'}}>{row.name}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}


export default LeaderBoard;