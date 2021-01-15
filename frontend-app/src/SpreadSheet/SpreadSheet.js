import React, { useReducer, useEffect } from 'react';
import { recordsReducer, initialState, TYPES } from './SpreadSheetReducer';
import { ERROR_FETCHING_RECORDS_MESSAGE, LOADING_NEW_RECORDS_MESSAGE } from '../Constants';
import './spreadSheet.scss';

export const SpreadSheet = ({ getPageRecords }) => {
  const [{ results, isFetching, error, pageNo }, recordsDispatch] = useReducer(
    recordsReducer,
    initialState
  );

  const fetchNextSetOfRecords = () => {
    recordsDispatch({ type: TYPES.FETCH_RECORDS });
    getPageRecords(pageNo, 20)
      .then(results => recordsDispatch({ type: TYPES.FETCH_RECORDS_SUCCESS, results }))
      .catch(error => recordsDispatch({ type: TYPES.FETCH_RECORDS_ERROR, error }));
  };

  useEffect(fetchNextSetOfRecords, []);

  const onContainerScroll = e => {
    const scrollNode = e.target;
    if (scrollNode.scrollHeight - scrollNode.scrollTop === scrollNode.clientHeight) {
      fetchNextSetOfRecords();
    }
  };

  return (
    <div className='spreadsheet' onScroll={onContainerScroll}>
      {results &&
        results.map(record => (
          <div className='spreadsheet-row'>
            {Object.entries(record).map(([_, value]) => (
              <div className='spreadsheet-row-cell'>{value}</div>
            ))}
          </div>
        ))}
      {isFetching && <div className='spreadsheet-message'>{LOADING_NEW_RECORDS_MESSAGE}</div>}
      {error && <div className='spreadsheet-message'>{ERROR_FETCHING_RECORDS_MESSAGE}</div>}
    </div>
  );
};
