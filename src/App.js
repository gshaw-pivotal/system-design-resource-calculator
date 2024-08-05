import React, { useState } from 'react';

function App() {

    const [dau, setDau] = useState(0);

    const [aveRead, setAveRead] = useState(0);
    const [aveWrite, setAveWrite] = useState(0);

    const [dataRetention, setDataRetention] = useState(0);
    const [dataSize, setDataSize] = useState(0);

    return (
       <div>
           <main>
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
               <h2>Results</h2>
               <h3>Network</h3>
               <div>
                   <span>
                       Read Requests per Second (RPS)
                   </span>
               </div>
               <div>
                   <span>
                       Write Requests per Second (RPS)
                   </span>
               </div>
               <h3>Storage</h3>
               <div>
                   <span>
                       Data generated per month
                   </span>
               </div>
               <div>
                   <span>
                       Total Storage required
                   </span>
               </div>
           </main>
       </div>
    );
}

export default App;