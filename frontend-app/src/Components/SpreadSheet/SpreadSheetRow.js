import React from 'react';
import { ROW_HEIGHT } from '../../Constants';
import PropTypes from 'prop-types';

export const SpreadSheetRow = ({ rowData }) => {
  const getRowHeight = () => ROW_HEIGHT - 2 + 'px';
  const getRowCells = () =>
    Object.entries(rowData).map(([_, value]) => (
      <div className='spreadsheet-row-cell' style={{ height: getRowHeight() }} key={value}>
        {value}
      </div>
    ));
  return <div className='spreadsheet-row'>{getRowCells()}</div>;
};

SpreadSheetRow.propTypes = {
  rowData: PropTypes.object.isRequired,
};
