import React, { useReducer, useEffect } from 'react';
import { recordsReducer, initialState } from './SpreadSheetReducer';
import { TYPES } from './Types';
import {
  ERROR_FETCHING_RECORDS_MESSAGE,
  LOADING_NEW_RECORDS_MESSAGE,
  DEFAULT_PAGE_SIZE,
} from '../../Constants';
import PropTypes from 'prop-types';
import './spreadSheet.scss';

export const SpreadSheet = ({ getPageRecords }) => {
  const [{ results, isFetching, error, pageNo }, recordsDispatch] = useReducer(
    recordsReducer,
    initialState
  );

  const fetchNextSetOfRecords = () => {
    recordsDispatch({ type: TYPES.FETCH_RECORDS });
    getPageRecords(pageNo, DEFAULT_PAGE_SIZE)
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

  const getRowCells = record =>
    Object.entries(record).map(([_, value]) => (
      <div className='spreadsheet-row-cell' key={value}>
        {value}
      </div>
    ));

  const getRowData = () =>
    results.map(record => (
      <div className='spreadsheet-row' key={record.id}>
        {getRowCells(record)}
      </div>
    ));

  return (
    <div className='spreadsheet' onScroll={onContainerScroll}>
      {getRowData()}
      {isFetching && <div className='spreadsheet-message'>{LOADING_NEW_RECORDS_MESSAGE}</div>}
      {error && <div className='spreadsheet-message'>{ERROR_FETCHING_RECORDS_MESSAGE}</div>}
    </div>
  );
};

SpreadSheet.prototype = {
  getPageRecords: PropTypes.func.isRequired,
};
