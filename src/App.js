import React, { useState } from 'react';

function App() {

    const roughSecondsPerDay = 100000;

    const roughDaysPerMonth = 30;

    const bytesPer = 1000;

    const [dau, setDau] = useState(0);

    const [aveRead, setAveRead] = useState(0);
    const [aveWrite, setAveWrite] = useState(0);

    const [dataRetention, setDataRetention] = useState(0);
    const [readDataSize, setReadDataSize] = useState(0);
    const [writeDataSize, setWriteDataSize] = useState(0);

    const [results, setResults] = useState(false);

    const [readPerSec, setReadPerSec] = useState(0);
    const [writePerSec, setWritePerSec] = useState(0);

    const [readBandwidthPerSec, setReadBandwidthPerSec] = useState(0);
    const [readBandwidthPerSecSuffix, setReadBandwidthPerSecSuffix] = useState('KB');

    const [writeBandwidthPerSec, setWriteBandwidthPerSec] = useState(0);
    const [writeBandwidthPerSecSuffix, setWriteBandwidthPerSecSuffix] = useState('KB');

    const [newStoragePerDay, setNewStoragePerDay] = useState(0);
    const [newStoragePerMonth, setNewStoragePerMonth] = useState(0);
    const [totalStorage, setTotalStorage] = useState(0);

    const [newStoragePerDaySuffix, setNewStoragePerDaySuffix] = useState('KB');
    const [newStoragePerMonthSuffix, setNewStoragePerMonthSuffix] = useState('KB');
    const [totalStorageSuffix, setTotalStorageSuffix] = useState('KB');

    const suffix = count => {
        switch (count) {
            case 0:
                return "KB";
            case 1:
                return "MB";
            case 2:
                return "GB";
            case 3:
                return "TB";
            case 4:
                return "PB";
            case 5:
                return "EB";
            case 6:
                return "ZB";
        }
    }

    const calculate = event => {
        setResults(true);

        // Calculate read requests per second
        setReadPerSec((dau * aveRead) / roughSecondsPerDay);
        setWritePerSec((dau * aveWrite) / roughSecondsPerDay);

        let readBandwidthPerSec = ((dau * aveRead) / roughSecondsPerDay) * readDataSize;
        let rbsCount = 0;

        while (readBandwidthPerSec > bytesPer && rbsCount <= 6) {
            readBandwidthPerSec = readBandwidthPerSec / bytesPer;
            rbsCount = rbsCount + 1;
        }

        setReadBandwidthPerSec(readBandwidthPerSec);
        setReadBandwidthPerSecSuffix(suffix(rbsCount));

        let writeBandwidthPerSec = ((dau * aveWrite) / roughSecondsPerDay) * writeDataSize;
        let wbsCount = 0;

        while (writeBandwidthPerSec > bytesPer && wbsCount <= 6) {
            writeBandwidthPerSec = writeBandwidthPerSec / bytesPer;
            wbsCount = wbsCount + 1;
        }

        setWriteBandwidthPerSec(writeBandwidthPerSec);
        setWriteBandwidthPerSecSuffix(suffix(wbsCount));

        let dayStorage = dau * aveWrite * writeDataSize;
        let dsCount = 0;

        while (dayStorage > bytesPer && dsCount <= 6) {
            dayStorage = dayStorage / bytesPer;
            dsCount = dsCount + 1;
        }

        setNewStoragePerDay(dayStorage);
        setNewStoragePerDaySuffix(suffix(dsCount));

        let monthStorage = dau * aveWrite * writeDataSize * roughDaysPerMonth;
        let msCount = 0;

        while (monthStorage > bytesPer && msCount <= 6) {
            monthStorage = monthStorage / bytesPer;
            msCount = msCount + 1;
        }

        setNewStoragePerMonth(monthStorage);
        setNewStoragePerMonthSuffix(suffix(msCount));

        let total = dau * aveWrite * writeDataSize * roughDaysPerMonth * dataRetention
        let tsCount = 0;

        while (total > bytesPer && tsCount <= 6) {
            total = total / bytesPer;
            tsCount = tsCount + 1;
        }

        setTotalStorage(total);
        setTotalStorageSuffix(suffix(tsCount));
    }

    const clear = event => {
        setResults(false);

        setDau(0);
        setAveRead(0);
        setAveWrite(0);
        setDataRetention(0);
        setReadDataSize(0);
        setWriteDataSize(0);

        setReadPerSec(0);
        setWritePerSec(0);

        setReadBandwidthPerSec(0);
        setWriteBandwidthPerSec(0);

        setReadBandwidthPerSecSuffix('');
        setWriteBandwidthPerSecSuffix('');

        setNewStoragePerDay(0);
        setNewStoragePerMonth(0);
        setTotalStorage(0);

        setNewStoragePerDaySuffix('');
        setNewStoragePerMonthSuffix('');
        setTotalStorageSuffix('');
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
                       <span className={"column-one"}>Data per read request (KB)</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setReadDataSize(e.target.value)}
                           value={readDataSize}
                       />
                       <div className={"column-end-space"}/>
                   </div>
                   <div className={"row"}>
                       <div className={"column-start-space"}/>
                       <span className={"column-one"}>Data per write request (KB)</span>
                       <div className={"column-spacer"}/>
                       <input
                           className={"column-two"}
                           type="number"
                           onChange={e => setWriteDataSize(e.target.value)}
                           value={writeDataSize}
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
                           <span className={"column-one"}>Read Requests per Second (RPS) / Bandwidth</span>
                           <div className={"column-spacer"}/>
                           <span
                               className={"column-two"}>{readPerSec} / {readBandwidthPerSec} ({readBandwidthPerSecSuffix})</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Write Requests per Second (RPS) / Bandwidth</span>
                           <div className={"column-spacer"}/>
                           <span
                               className={"column-two"}>{writePerSec} / {writeBandwidthPerSec} ({writeBandwidthPerSecSuffix})</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <h3 className={"sub-header"}>Storage</h3>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Data generated per day ({newStoragePerDaySuffix})</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{newStoragePerDay}</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Data generated per month ({newStoragePerMonthSuffix})</span>
                           <div className={"column-spacer"}/>
                           <span className={"column-two"}>{newStoragePerMonth}</span>
                           <div className={"column-end-space"}/>
                       </div>
                       <div className={"row"}>
                           <div className={"column-start-space"}/>
                           <span className={"column-one"}>Total Storage required ({totalStorageSuffix})</span>
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