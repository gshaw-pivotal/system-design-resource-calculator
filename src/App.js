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
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Daily Active Users (DAU)</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setDau(e.target.value)}
                           value={dau}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <hr/>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Average Number of Read Requests per User</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setAveRead(e.target.value)}
                           value={aveRead}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Average Number of Write Requests per User</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setAveWrite(e.target.value)}
                           value={aveWrite}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <hr/>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Data Retention time (months)</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setDataRetention(e.target.value)}
                           value={dataRetention}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Data per write request (kB)</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setDataSize(e.target.value)}
                           value={dataSize}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <div className={"column-one"}>
                           <button
                               className={"button"}
                               onClick={calculate}>Calculate Resource
                           </button>
                       </div>
                       <div className={"column-spacer"}/>
                       <div className={"column-two"}>
                           <button
                               className={"button"}
                               onClick={clear}>Clear
                           </button>
                       </div>
                       <div className={"column-end-space"}/>
                   </div>
               </div>
               {(results) ? (
                   <div>
                       <h2>Results</h2>
                       <h3 className={"sub-header"}>Network</h3>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Read Requests per Second (RPS)</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{readPerSec}</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Write Requests per Second (RPS)</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{writePerSec}</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <h3 className={"sub-header"}>Storage</h3>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Data generated per month (kB)</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{newStoragePerMonth}</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Total Storage required (kB)</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{totalStorage}</span>
                           <div className={"column-end-space"}/>
                       </div>
                   </div>
               ) : ('')}
           </main>
       </div>
    );
}

export default App;