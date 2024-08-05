import React, { useState } from 'react';

function App() {

    const roughSecondsPerDay = 100000;

    const roughDaysPerMonth = 30;

    const [dau, setDau] = useState(0);

    const [aveRead, setAveRead] = useState(0);
    const [aveWrite, setAveWrite] = useState(0);

    const [dataRetention, setDataRetention] = useState(0);
    const [dataSize, setDataSize] = useState(0);

    const [results, setResults] = useState(false);

    const [readPerSec, setReadPerSec] = useState(0);
    const [writePerSec, setWritePerSec] = useState(0);

    const [newStoragePerMonth, setNewStoragePerMonth] = useState(0);
    const [totalStorage, setTotalStorage] = useState(0);

    const calculate = event => {
        setResults(true);

        // Calculate read requests per second
        setReadPerSec((dau * aveRead) / roughSecondsPerDay);
        setWritePerSec((dau * aveWrite) / roughSecondsPerDay);

        setNewStoragePerMonth(dau * aveWrite * dataSize * roughDaysPerMonth);
        setTotalStorage(dau * aveWrite * dataSize * roughDaysPerMonth * dataRetention);
    }

    const clear = event => {
        setResults(false);

        setDau(0);
        setAveRead(0);
        setAveWrite(0);
        setDataRetention(0);
        setDataSize(0);

        setReadPerSec(0);
        setWritePerSec(0);
        setNewStoragePerMonth(0);
        setTotalStorage(0);
    }

    return (
       <div>
           <main>
               <div>
               <h2>Inputs</h2>
               <div>
                <span>
                   Daily Active Users (DAU)
               </span>
                   <input
                       type="number"
                       onChange={e => setDau(e.target.value)}
                       value={dau}
                   />
               </div>
               <hr/>
               <div>
               <span>
                   Average Number of Read Requests per User
               </span>
                   <input
                       type="number"
                       onChange={e => setAveRead(e.target.value)}
                       value={aveRead}
                   />
               </div>
               <div>
               <span>
                   Average Number of Write Requests per User
               </span>
                   <input
                       type="number"
                       onChange={e => setAveWrite(e.target.value)}
                       value={aveWrite}
                   />
               </div>
               <hr/>
               <div>
               <span>
                   Data Retention time (months)
               </span>
                   <input
                       type="number"
                       onChange={e => setDataRetention(e.target.value)}
                       value={dataRetention}
                   />
               </div>
               <div>
               <span>
                   Data per write request (kB)
               </span>
                   <input
                       type="number"
                       onChange={e => setDataSize(e.target.value)}
                       value={dataSize}
                   />
               </div>
                   <div>
                       <button onClick={calculate}>Calculate Resource</button>
                       <button onClick={clear}>Clear</button>
                   </div>
               </div>
               {(results) ? (
               <div>
               <h2>Results</h2>
               <h3>Network</h3>
               <div>
                   <span>
                       Read Requests per Second (RPS)
                   </span>
                   <span>{readPerSec}</span>
               </div>
                   <div>
                   <span>
                       Write Requests per Second (RPS)
                   </span>
                       <span>{writePerSec}</span>
                   </div>
                   <h3>Storage</h3>
               <div>
                   <span>
                       Data generated per month (kB)
                   </span>
                   <span>{newStoragePerMonth}</span>
               </div>
               <div>
                   <span>
                       Total Storage required (kB)
                   </span>
                   <span>{totalStorage}</span>
               </div>
               </div>
                   ) : ('')}
           </main>
       </div>
    );
}

export default App;