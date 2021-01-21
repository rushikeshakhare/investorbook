import React, { useState, useRef, useCallback } from 'react';
import { ROW_HEIGHT, MINIMUM_VISIBLE_ROWS } from '../../Constants';
import { SpreadSheetRow } from './SpreadSheetRow';
import { throttle } from '../../utils';
import PropTypes from 'prop-types';

export const Grid = ({ rows }) => {
  const scrollWrapperRef = useRef();
  const [visibleRows, setVisibleRows] = useState(rows.slice(0, MINIMUM_VISIBLE_ROWS));

  const getContainerHeight = () => {
    return rows.length * ROW_HEIGHT + 'px';
  };

  const getRowData = () => {
    return visibleRows.map(record => <SpreadSheetRow key={record.id} rowData={record} />);
  };

  const onScroll = () => {
    const scrollWrapper = scrollWrapperRef.current;
    const scrollTop = Math.max(scrollWrapper.scrollTop, 0);
    const scrollerHeight = scrollWrapper.clientHeight;
    const maxRows = Math.floor(scrollerHeight / ROW_HEIGHT);
    const first = Math.floor(scrollTop / ROW_HEIGHT);
    const last = first + maxRows;
    const newVisibleRows = rows.slice(first, last);
    setVisibleRows(
      newVisibleRows.length < maxRows
        ? rows.slice(rows.length - maxRows, rows.length)
        : rows.slice(first, last)
    );
  };

  const onWrapperScroll = useCallback(throttle(onScroll, 100));

  return (
    <div className='scroll-wrapper' onScroll={onWrapperScroll} ref={scrollWrapperRef}>
      <div className='scroll-wrapper-container' style={{ height: getContainerHeight() }} />
      <div className='grid'>{getRowData()}</div>
    </div>
  );
};

Grid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
