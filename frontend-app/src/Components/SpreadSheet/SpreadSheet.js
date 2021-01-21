import React, { useReducer, useEffect } from 'react';
import { recordsReducer, initialState } from './SpreadSheetReducer';
import { TYPES } from './Types';
import {
  ERROR_FETCHING_RECORDS_MESSAGE,
  LOADING_NEW_RECORDS_MESSAGE,
  DEFAULT_PAGE_SIZE,
  SPREADSHEET_HEIGHT,
} from '../../Constants';
import { Grid } from './Grid';
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

  return (
    <div className='spreadsheet' style={{ height: SPREADSHEET_HEIGHT }}>
      {results.length && <Grid rows={results} />}
      {isFetching && <div className='spreadsheet-message'>{LOADING_NEW_RECORDS_MESSAGE}</div>}
      {error && <div className='spreadsheet-message'>{ERROR_FETCHING_RECORDS_MESSAGE}</div>}
    </div>
  );
};

SpreadSheet.propTypes = {
  getPageRecords: PropTypes.func.isRequired,
};
